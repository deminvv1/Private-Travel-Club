'use client'

import Link from 'next/link'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1428 0%, #1f4b85 50%, #0a1428 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '40px 24px',
    }}>
      <p style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 13, fontWeight: 500,
        letterSpacing: '4px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', marginBottom: 16,
      }}>
        Error 500
      </p>

      <h1 style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 'clamp(32px,5vw,64px)',
        fontWeight: 700, color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.1, marginBottom: 16,
      }}>
        Something went wrong
      </h1>

      <p style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 300,
        color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
        maxWidth: 480, marginBottom: 48,
      }}>
        An unexpected error occurred. Please try again.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={reset} style={{
          background: '#e8b000', color: '#fff', border: 'none',
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 13, fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '16px 40px', cursor: 'pointer', borderRadius: 10,
        }}>
          Try Again
        </button>

        <Link href="/" style={{
          display: 'inline-block',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 13, fontWeight: 500,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '16px 40px', textDecoration: 'none', borderRadius: 10,
        }}>
          Back to Home
        </Link>
      </div>
    </main>
  )
}