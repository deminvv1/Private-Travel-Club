'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getT } from '@/lib/i18n'

const LOGO_SIZE = 90

export default function Header({ locale = 'en' }: { locale?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [endLeft, setEndLeft] = useState(40)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const t = getT(locale)

  useEffect(() => {
    const calcEnd = () => {
      const w = window.innerWidth
      const containerWidth = Math.min(w, 1200)
      setEndLeft((w - containerWidth) / 2 + 40)
    }
    calcEnd()
    window.addEventListener('resize', calcEnd)

    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', calcEnd)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // центр экрана минус половина лого
  const centerLeft = `calc(50vw - ${LOGO_SIZE / 2}px)`

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
      height: scrolled ? 100 : 100,
      background: scrolled ? 'rgba(10,20,50,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'background 0.4s, backdrop-filter 0.4s, height 0.4s',
    }}>

      {/* Logo + tagline under it (column) */}
      <div className={`ptc-hdr-logo${scrolled ? ' ptc-hdr-logo--scrolled' : ''}`} style={{
        position: 'absolute',
        top: '50%',
        left: scrolled ? endLeft : centerLeft,
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: scrolled ? 'column' : 'row',
        alignItems: 'center',
        gap: scrolled ? 2 : 12,
        transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1,
      }}>
        <Link href={`/${locale}`} style={{ display: 'flex', flexShrink: 0 }}>
          <Image
            src="/images/tild3365-6239-4430-b236-336235393466__ptc_logo_vector_whit.svg"
            alt="Private Travel Club"
            width={scrolled ? 75 : LOGO_SIZE}
            height={scrolled ? 75 : LOGO_SIZE}
            priority
            style={{ transition: 'width 0.4s, height 0.4s' }}
          />
        </Link>

        <span className="ptc-hdr-tagline" style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: scrolled ? 13 : 15,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'none' : 'translateX(-8px)',
          transition: 'opacity 0.4s 0.15s, transform 0.4s 0.15s, font-size 0.4s',
          pointerEvents: 'none',
        }}>
          {t.header.tagline}
        </span>
      </div>

      {/* Center — nav links */}
      <nav className="ptc-hdr-nav" style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 20,
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 0.4s 0.1s',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}>
        {[
          { label: t.nav.jets, href: `/${locale}/jets` },
          { label: t.nav.yachts, href: `/${locale}/yachts` },
          { label: t.nav.villas, href: `/${locale}/villas` },
          { label: t.nav.concierge, href: `/${locale}/concierge` },
          { label: (t.nav as Record<string, string>).about ?? 'About', href: `/${locale}#about`, mobileHide: true },
        ].map(({ label, href, mobileHide }) => {
          const isAbout = href.includes('#about')
          const isHome = pathname === `/${locale}` || pathname === '/'
          return (
            <Link key={href} href={href}
              className={`ptc-nav-link${mobileHide ? ' ptc-nav-link--mobile-hide' : ''}`}
              onClick={isAbout && isHome ? (e) => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              } : undefined}
              style={{
                fontFamily: 'PTCSans, Arial, sans-serif',
                fontSize: 13, fontWeight: 600, letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Right — icons (hidden < 800px, visible only when scrolled) */}
      <div className="ptc-hdr-icons" style={{
        position: 'absolute',
        right: `max(120px, calc((100vw - 1200px) / 2 + 120px))`,
        top: '50%',
        transform: scrolled ? 'translateY(-50%) translateX(0px)' : 'translateY(-50%) translateX(10px)',
        display: 'flex', alignItems: 'center', gap: 10,
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 0.4s 0.1s, transform 0.4s 0.1s',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}>
        {[
          { src: '/images/tild6338-6432-4131-b064-313838333833__call.svg', href: 'tel:+4915140365107', alt: 'Call' },
          { src: '/images/tild3330-3064-4430-a236-636435613633__whatsapp-logo.svg', href: 'https://wa.me/4915140365107', alt: 'WhatsApp' },
          { src: '/images/tild3661-3734-4236-b036-643739363765__instagram-logo.svg', href: 'https://www.instagram.com/private_travel_club_', alt: 'Instagram' },
          { src: '/images/tild3163-6165-4130-a565-666331336339__email-mail-sent-whit.svg', href: 'mailto:contact@private-travel-club.com', alt: 'Email' },
        ].map((item, i) => (
          <a key={i} href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="ptc-hdr-icon">
            <Image src={item.src} alt={item.alt} width={28} height={28} />
          </a>
        ))}
      </div>

      {/* Language switcher — always visible */}
      <div ref={langRef} style={{
        position: 'absolute',
        right: `max(16px, calc((100vw - 1200px) / 2 + 40px))`,
        top: '50%', transform: 'translateY(-50%)',
      }}>
        <button onClick={() => setLangOpen(v => !v)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#fff', fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 13, fontWeight: 600,
          borderBottom: '1px solid rgba(255,255,255,0.45)',
        }}>
          {locale.toUpperCase()} ▾
        </button>
        {langOpen && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 6,
            background: 'rgba(10,20,55,0.97)',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: 72, zIndex: 100,
          }}>
            {(['en', 'ru', 'de'] as const).map(lang => {
              const bare = pathname.replace(/^\/(en|ru|de)(\/|$)/, '/').replace(/\/$/, '') || '/'
              const switchedPath = `/${lang}${bare === '/' ? '' : bare}`
              return (
                <Link key={lang} href={switchedPath}
                  onClick={() => setLangOpen(false)}
                  className="ptc-lang-item"
                  style={{
                    display: 'block', padding: '9px 16px', fontSize: 13, color: '#fff',
                    fontWeight: lang === locale ? 700 : 400,
                  }}>
                  {lang.toUpperCase()}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        .ptc-hdr-icon { opacity: 0.8; transition: opacity 0.2s; display: flex; }
        .ptc-hdr-icon:hover { opacity: 1; }
        .ptc-lang-item { transition: background 0.15s; }
        .ptc-lang-item:hover { background: rgba(255,255,255,0.1); }
        .ptc-nav-link:hover { color: #fff !important; }
        @media (max-width: 900px) {
          .ptc-hdr-icons { display: none !important; }
          .ptc-hdr-logo--scrolled { left: 5px !important; }
          .ptc-nav-link--mobile-hide { display: none !important; }
        }
        @media (max-width: 700px) {
          .ptc-hdr-tagline { display: none !important; }
          .ptc-hdr-nav { gap: 10px !important; }
          .ptc-nav-link { font-size: 11px !important; letter-spacing: 0.8px !important; }
        }
        @media (max-width: 400px) {
          .ptc-nav-link { font-size: 10px !important; letter-spacing: 0.8px !important; }
        }
        @media (max-width: 359px) {
          .ptc-hdr-logo img { width: 55px !important; height: 55px !important; }
        }
      `}</style>
    </header>
  )
}
