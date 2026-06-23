'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { icon: '/images/tild3364-6330-4262-a132-636137613838__call.svg', label: 'Call', href: 'tel:+4915140365107' },
  { icon: '/images/tild6530-3739-4066-b261-376433386235__whatsapp-logo.svg', label: 'WhatsApp', href: 'https://wa.me/4915140365107' },
  { icon: '/images/tild3734-6262-4535-b331-303738623866__instagram-logo.svg', label: 'Instagram', href: 'https://www.instagram.com/private_travel_club_' },
  { icon: '/images/tild3163-6165-4130-a565-666331336339__email-mail-sent-whit.svg', label: 'Email', href: 'mailto:contact@private-travel-club.com' },
]

export default function MobileFooter() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const locale = pathname.startsWith('/ru') ? 'ru' : pathname.startsWith('/de') ? 'de' : 'en'
  const isHome = pathname === `/${locale}` || pathname === '/'
  const aboutLabel = locale === 'ru' ? 'О нас' : locale === 'de' ? 'Über uns' : 'About'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAbout = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 8500,
        // background: 'rgba(31,75,133,0.98)',
        backdropFilter: 'blur(1000px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.4s, transform 0.4s',
        pointerEvents: scrolled ? 'auto' : 'none',
      }} className="ptc-mobile-footer">
        {links.map((link, i) => (
          <a key={i} href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="ptc-mob-link"
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 4, flex: 1, padding: '10px 4px 14px',
              color: '#fff',
            }}
          >
            <Image src={link.icon} alt={link.label} width={24} height={24} />
            <span style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.5px',
            }}>
              {link.label}
            </span>
          </a>
        ))}

        {/* About link */}
        <a
          href={isHome ? '#about' : `/${locale}#about`}
          onClick={handleAbout}
          className="ptc-mob-link"
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 4, flex: 1, padding: '10px 4px 14px',
            color: '#fff',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span style={{
            fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.5px',
          }}>
            {aboutLabel}
          </span>
        </a>
      </nav>

      <style>{`
        .ptc-mob-link { opacity: 0.85; transition: opacity 0.2s; }
        .ptc-mob-link:hover { opacity: 1; }
        @media (max-width: 900px) {
          .ptc-mobile-footer { display: flex !important; }
        }
      `}</style>
    </>
  )
}
