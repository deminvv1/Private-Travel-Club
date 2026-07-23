'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { countries, Country } from '@/data/countries'

import { getT } from '@/lib/i18n'

const LOCALE_COUNTRY: Record<string, string> = {
  ru: 'RU',
  de: 'DE',
  en: 'US',
}

function getDefaultCountry(locale: string): Country {
  const code = LOCALE_COUNTRY[locale] ?? 'US'
  return countries.find(c => c.code === code) ?? countries[0]
}


export default function ContactForm({ locale = 'en', submitLabel }: { locale?: string; submitLabel?: string }) {
  const t = getT(locale).form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [direction, setDirection] = useState('')
  const [phone, setPhone] = useState('')
  const [selected, setSelected] = useState<Country>(() => getDefaultCountry(locale))
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
    else setSearch('')
  }, [open])

  const filtered = search
    ? countries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.native.toLowerCase().includes(search.toLowerCase()) ||
        c.dial.includes(search)
      )
    : countries

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 5) {
      setPhoneError(true)
      return
    }
    setPhoneError(false)
    setStatus('loading')
    try {
      let utm: Record<string, string> = {}
      try { utm = JSON.parse(sessionStorage.getItem('ptc_utm') ?? '{}') } catch { /* ignore */ }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, direction,
          phone: selected.dial + ' ' + phone,
          country: selected.name,
          page: window.location.pathname,
          referrer: document.referrer,
          utm,
          _honey: '',
        }),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ padding: '48px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 18, color: '#fff', marginBottom: 8 }}>
          {t.success}
        </p>
        <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          {t.successSub}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot — скрыто от людей, заполняется ботами */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

      {/* Name */}
      <label htmlFor="contact-name" style={labelStyle}>
        {t.nameLabel}
      </label>
      <input
        id="contact-name"
        type="text" value={name} onChange={e => setName(e.target.value)}
        placeholder={t.namePlaceholder}
        style={{ ...inputStyle, marginBottom: 32 }}
        onFocus={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
        onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
      />

      {/* Email */}
      <label htmlFor="contact-email" style={labelStyle}>
        {t.emailLabel}
      </label>
      <input
        id="contact-email"
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder={t.emailPlaceholder}
        style={{ ...inputStyle, marginBottom: 32 }}
        onFocus={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
        onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
      />

      {/* Direction */}
      <label htmlFor="contact-direction" style={labelStyle}>
        {t.directionLabel}
      </label>
      <input
        id="contact-direction"
        type="text" value={direction} onChange={e => setDirection(e.target.value)}
        placeholder={t.directionPlaceholder}
        style={{ ...inputStyle, marginBottom: 32 }}
        onFocus={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
        onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
      />

      {/* Phone */}
      <label htmlFor="contact-phone" style={{ ...labelStyle, marginTop: 24 }}>
        {t.phoneLabel}
        <span style={{ color: '#e8b000', marginLeft: 3 }}>*</span>
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center',
        borderBottom: `1px solid ${phoneError ? '#ff6b6b' : 'rgba(255,255,255,0.3)'}`, paddingBottom: 8, marginBottom: phoneError ? 8 : 32 }}>

        {/* Country trigger */}
        <button type="button" onClick={() => setOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px 0 0',
            color: '#fff', fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13,
            whiteSpace: 'nowrap', flexShrink: 0 }}>
          <Image
            src={`https://flagcdn.com/w20/${selected.code.toLowerCase()}.png`}
            width={20} height={14}
            alt={selected.code}
            style={{ display: 'block', objectFit: 'cover', borderRadius: 2 }}
          />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>▼</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', marginLeft: 2 }}>{selected.dial}</span>
        </button>

        <input
          id="contact-phone"
          type="tel" value={phone} onChange={e => { setPhone(e.target.value); setPhoneError(false) }}
          placeholder="(000) 000-00-00" required
          style={{ background: 'none', border: 'none', outline: 'none',
            color: 'rgba(255,255,255,0.5)', fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 14, flex: 1 }}
          onFocus={e => {
            e.target.style.color = '#fff'
            const parent = e.target.parentElement!
            parent.style.borderBottomColor = 'rgba(255,255,255,0.9)'
          }}
          onBlur={e => {
            e.target.style.color = 'rgba(255,255,255,0.5)'
            const parent = e.target.parentElement!
            parent.style.borderBottomColor = 'rgba(255,255,255,0.3)'
          }}
        />

        {/* Dropdown */}
        {open && (
          <div ref={dropdownRef} style={{
            position: 'absolute', top: '100%', left: 0, zIndex: 999,
            width: 340, maxHeight: 280, overflowY: 'auto',
            background: 'rgba(10,20,60,0.98)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            {/* Search */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <input
                ref={searchRef}
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search country..."
                style={{ width: '100%', background: 'none', border: 'none', outline: 'none',
                  color: '#fff', fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13 }}
              />
            </div>

            {/* List */}
            {filtered.map(c => (
              <button key={c.code + c.dial} type="button"
                onClick={() => { setSelected(c); setOpen(false) }}
                className="ptc-country-item"
                style={{
                  width: '100%', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  padding: '8px 12px', textAlign: 'left',
                  background: selected.code === c.code ? 'rgba(255,255,255,0.08)' : 'transparent',
                } as React.CSSProperties}>
                <Image
                  src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                  width={20} height={14}
                  alt={c.code}
                  style={{ display: 'block', objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                />
                <span style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13, color: '#fff',
                  flex: 1, marginLeft: 10, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {c.name}
                  {c.native !== c.name && (
                    <span style={{ color: 'rgba(255,255,255,0.45)', marginLeft: 4 }}>({c.native})</span>
                  )}
                </span>
                <span style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13,
                  color: 'rgba(255,255,255,0.55)', marginLeft: 12, flexShrink: 0, width: 40, textAlign: 'right' }}>
                  {c.dial}
                </span>
              </button>
            ))}

            {filtered.length === 0 && (
              <p style={{ padding: '12px', fontFamily: 'PTCSans, Arial, sans-serif',
                fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                Not found
              </p>
            )}
          </div>
        )}
      </div>

      {phoneError && (
        <p style={{ marginBottom: 24, fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 12, color: '#ff6b6b' }}>
          {t.phoneError}
        </p>
      )}

      {/* Submit */}
      <button type="submit" disabled={status === 'loading'}
        style={{
          background: '#e8b000', border: 'none', color: '#fff',
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
          padding: '15px 32px', cursor: 'pointer', width: '100%',
          opacity: status === 'loading' ? 0.7 : 1, transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (status !== 'loading') (e.currentTarget.style.background = '#d4a000') }}
        onMouseLeave={e => (e.currentTarget.style.background = '#e8b000')}
      >
        {status === 'loading' ? t.sending : (submitLabel ?? t.submit)}
      </button>

      <p style={{ marginTop: 10, fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: '1.5' }}>
        {t.privacyConsentPre}
        <a href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer"
          style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}>
          {t.privacyConsentLink}
        </a>
        {t.privacyConsentPost}
      </p>

      {status === 'error' && (
        <p style={{ marginTop: 12, fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 13, color: '#ff6b6b', textAlign: 'center' }}>
          {t.error}
        </p>
      )}

      <style>{`
        .ptc-country-item:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'PTCSans, Arial, sans-serif',
  fontSize: 12, fontWeight: 500,
  color: 'rgba(255,255,255,0.55)',
  letterSpacing: '0.5px', marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent',
  border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)',
  color: '#fff', fontFamily: 'PTCSans, Arial, sans-serif',
  fontSize: 14, padding: '6px 0 10px',
  outline: 'none', marginBottom: 0, display: 'block',
  transition: 'border-color 0.2s',
}
