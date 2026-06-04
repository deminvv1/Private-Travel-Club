import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Private Travel Club',
}

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1428 0%, #1f4b85 50%, #0a1428 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '40px 24px',
    }}>
      <Link href="/" style={{ display: 'flex', marginBottom: 40 }}>
        <Image
          src="/images/tild3365-6239-4430-b236-336235393466__ptc_logo_vector_whit.svg"
          alt="Private Travel Club"
          width={80}
          height={80}
          priority
        />
      </Link>

      <p style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 13, fontWeight: 500,
        letterSpacing: '4px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 16,
      }}>
        Error 404
      </p>

      <h1 style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 'clamp(36px,6vw,80px)',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.1,
        marginBottom: 16,
      }}>
        Page not found
      </h1>

      <p style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 'clamp(14px,1.5vw,18px)',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.7,
        maxWidth: 480,
        marginBottom: 48,
      }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link href="/" style={{
        display: 'inline-block',
        background: '#e8b000',
        color: '#fff',
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 13, fontWeight: 700,
        letterSpacing: '2px', textTransform: 'uppercase',
        padding: '16px 40px',
        textDecoration: 'none',
        borderRadius: 10,
        transition: 'background 0.2s',
      }}>
        Back to Home
      </Link>

      <div style={{
        display: 'flex', gap: 32, marginTop: 48,
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {[
          { label: 'Villas', href: '/villas' },
          { label: 'Yachts', href: '/yachts' },
          { label: 'Jets', href: '/jets' },
          { label: 'Concierge', href: '/concierge' },
        ].map(({ label, href }) => (
          <Link key={href} href={href} style={{
            fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 13, fontWeight: 500,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </main>
  )
}
