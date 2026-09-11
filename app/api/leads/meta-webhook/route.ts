import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'

const GRAPH_API_VERSION = 'v21.0'

const KNOWN_FIELD_LABELS: Record<string, string> = {
  full_name: 'Имя',
  email: 'Email',
  phone_number: 'Телефон',
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_LEADS_BOT_TOKEN
  const chatId = process.env.TELEGRAM_LEADS_CHAT_ID
  if (!token || !chatId) {
    console.error('Telegram leads bot is not configured (TELEGRAM_LEADS_BOT_TOKEN / TELEGRAM_LEADS_CHAT_ID)')
    return
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, link_preview_options: { is_disabled: true } }),
  })
  if (!res.ok) throw new Error(`Telegram API ${res.status}: ${await res.text()}`)
}

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.META_APP_SECRET
  if (!appSecret) return true // secret not configured yet (dev/testing)
  if (!signatureHeader?.startsWith('sha256=')) return false
  const expected = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  const provided = signatureHeader.slice('sha256='.length)
  if (expected.length !== provided.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided))
}

type MetaFieldData = { name: string; values: string[] }
type MetaLead = { id: string; created_time?: string; field_data?: MetaFieldData[] }

async function fetchLead(leadgenId: string): Promise<MetaLead> {
  const accessToken = process.env.META_ACCESS_TOKEN
  if (!accessToken) throw new Error('META_ACCESS_TOKEN is not configured')
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${leadgenId}?fields=id,created_time,field_data&access_token=${accessToken}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Graph API ${res.status}: ${await res.text()}`)
  return res.json()
}

function humanizeKey(key: string): string {
  const cleaned = key.replace(/_/g, ' ').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function formatLeadMessage(
  lead: MetaLead,
  meta: { formId?: string; adId?: string; platform?: string }
): string {
  const fields = new Map<string, string>()
  for (const f of lead.field_data ?? []) {
    fields.set(f.name, f.values?.[0] ?? '')
  }

  const lines = ['🆕 Новый лид (Meta Ads)', '']

  for (const key of ['full_name', 'email', 'phone_number']) {
    if (fields.has(key)) {
      lines.push(`${KNOWN_FIELD_LABELS[key]}: ${fields.get(key) || '—'}`)
      fields.delete(key)
    }
  }
  for (const [key, value] of fields) {
    lines.push(`${humanizeKey(key)}: ${value || '—'}`)
  }

  if (meta.platform) lines.push('', `Платформа: ${meta.platform}`)
  if (meta.formId) lines.push(`Form ID: ${meta.formId}`)
  if (meta.adId) lines.push(`Ad ID: ${meta.adId}`)

  return lines.join('\n')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && challenge && token === process.env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  if (!verifySignature(rawBody, req.headers.get('x-hub-signature-256'))) {
    console.error('Meta webhook: invalid signature')
    return NextResponse.json({ ok: true }) // ack anyway so Meta doesn't retry-storm
  }

  let body: any
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ ok: true })
  }

  if (body.object !== 'page') return NextResponse.json({ ok: true })

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== 'leadgen') continue
      const { leadgen_id, form_id, ad_id, platform } = change.value ?? {}
      if (!leadgen_id) continue

      try {
        const lead = await fetchLead(leadgen_id)
        const text = formatLeadMessage(lead, { formId: form_id, adId: ad_id, platform })
        await sendTelegram(text)
      } catch (err) {
        console.error('Meta lead processing error:', err)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
