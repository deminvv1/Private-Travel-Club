import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const ipMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count++
  return false
}

const resend = new Resend(process.env.RESEND_API_KEY)

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'yclid', '_landing'] as const

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
  if (!res.ok) throw new Error(`Telegram API ${res.status}: ${await res.text()}`)
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported Media Type' }, { status: 415 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, direction, phone, country, page, referrer, utm, _honey } = await req.json()

    if (_honey) return NextResponse.json({ ok: true })

    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
    }

    const safeName      = (name ?? '').trim().slice(0, 100)
    const safeEmail     = (email ?? '').trim().slice(0, 100)
    const safeDirection = (direction ?? '').trim().slice(0, 200)
    const safePhone     = phone.trim().slice(0, 30)
    const safeCountry   = (country ?? '').trim().slice(0, 60)

    if (safeEmail && !EMAIL_RE.test(safeEmail)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const safePage     = typeof page === 'string' ? page.trim().slice(0, 200) : ''
    const safeReferrer = typeof referrer === 'string' ? referrer.trim().slice(0, 300) : ''
    const safeUtm: Record<string, string> = {}
    if (utm && typeof utm === 'object') {
      for (const key of UTM_KEYS) {
        const v = (utm as Record<string, unknown>)[key]
        if (typeof v === 'string' && v.trim()) safeUtm[key] = v.trim().slice(0, 200)
      }
    }

    const tgLines = [
      '📩 Новая заявка — Private Travel Club',
      '',
      `Имя: ${safeName || '—'}`,
      `Email: ${safeEmail || '—'}`,
      `Телефон: ${safePhone}`,
      `Направление: ${safeDirection || '—'}`,
      `Страна: ${safeCountry || '—'}`,
      '',
      `Страница: https://private-travel-club.com${safePage || '/'}`,
    ]
    if (safeReferrer) tgLines.push(`Источник перехода: ${safeReferrer}`)
    if (safeUtm._landing) tgLines.push(`Страница входа: ${safeUtm._landing}`)
    for (const key of UTM_KEYS) {
      if (key !== '_landing' && safeUtm[key]) tgLines.push(`${key.replace('utm_', 'UTM ')}: ${safeUtm[key]}`)
    }
    const tgPromise = sendTelegram(tgLines.join('\n')).catch((err) => {
      console.error('Telegram notify error:', err)
    })

    await resend.emails.send({
      from: 'Private Travel Club <contact@private-travel-club.com>',
      to: 'contact@private-travel-club.com',
      subject: '📩 New contact request — Private Travel Club',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
          <h2 style="margin:0 0 16px;color:#1f4b85">New contact request</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600;width:110px">Name</td>
              <td style="padding:8px 12px">${esc(safeName) || '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Email</td>
              <td style="padding:8px 12px">${safeEmail ? `<a href="mailto:${esc(safeEmail)}">${esc(safeEmail)}</a>` : '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Destination</td>
              <td style="padding:8px 12px">${esc(safeDirection) || '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Phone</td>
              <td style="padding:8px 12px">${esc(safePhone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Country</td>
              <td style="padding:8px 12px">${esc(safeCountry)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Page</td>
              <td style="padding:8px 12px">${esc(safePage) || '—'}</td>
            </tr>
            ${Object.entries(safeUtm).map(([k, v]) => `
            <tr>
              <td style="padding:8px 12px;background:#f5f7fa;font-weight:600">${esc(k)}</td>
              <td style="padding:8px 12px">${esc(v)}</td>
            </tr>`).join('')}
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#999">
            Sent: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Berlin' })} (CET)
          </p>
        </div>
      `,
    })

    await tgPromise

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
