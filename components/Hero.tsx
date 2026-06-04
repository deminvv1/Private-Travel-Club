import { getT } from '@/lib/i18n'

export default function Hero({ locale = 'en' }: { locale?: string }) {
  const t = getT(locale).hero
  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      minHeight: 600, overflow: 'hidden', background: '#0a1428',
    }}>
      {/* Video */}
      <video
        autoPlay muted loop playsInline
        poster="/images/first-cadr.webp"
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          minWidth: '100%', minHeight: '100%',
          width: 'auto', height: 'auto',
          objectFit: 'cover', zIndex: 0,
        }}>
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg,rgba(10,18,45,0.75) 0%,rgba(10,18,45,0.65) 50%,rgba(10,18,45,0.8) 100%)',
      }} />

      {/* Centered content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>

        {/* Tagline */}
        <p style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 'clamp(10px, 1.1vw, 13px)',
          fontWeight: 500,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 14,
        }}>
          {t.tagline}
        </p>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 'clamp(34px, 5.5vw, 68px)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '1px',
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          {t.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 'clamp(13px, 1.6vw, 18px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2px',
          marginBottom: 30,
        }}>
          {t.subtitle}
        </p>

        {/* Contact icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[
            { src: '/images/tild6338-6432-4131-b064-313838333833__call.svg', href: 'tel:+4915140365107', alt: 'Call' },
            { src: '/images/tild3330-3064-4430-a236-636435613633__whatsapp-logo.svg', href: 'https://wa.me/4915140365107', alt: 'WhatsApp' },
            { src: '/images/tild3661-3734-4236-b036-643739363765__instagram-logo.svg', href: 'https://www.instagram.com/private_travel_club_', alt: 'Instagram' },
            { src: '/images/tild3163-6165-4130-a565-666331336339__email-mail-sent-whit.svg', href: 'mailto:office@private-travel-club.com', alt: 'Email' }
          ].map((item, i) => (
            <a key={i} href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="ptc-hero-icon"
            >
              <img src={item.src} alt={item.alt} width={32} height={32} style={{ opacity: 0.6 }} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          style={{ opacity: 0.4, animation: 'ptc-bounce 2s ease-in-out infinite' }}>
          <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        .ptc-hero-icon { transition: opacity 0.2s; display: flex; }
        .ptc-hero-icon:hover img { opacity: 0.9 !important; }
        @keyframes ptc-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  )
}
