'use client'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000)
    const t2 = setTimeout(() => setHidden(true), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (hidden) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#060c18',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <p className="ptc-pre-text" style={{
        fontFamily: 'var(--font-hanken, sans-serif)',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.45em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: 16,
      }}>
        Private Travel Club
      </p>
      <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div className="ptc-pre-bar" />
      </div>

      <style>{`
        .ptc-pre-text {
          animation: ptc-fadein 0.8s ease forwards;
        }
        @keyframes ptc-fadein {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ptc-pre-bar {
          height: 100%;
          background: linear-gradient(to right, transparent, #e8b000, transparent);
          width: 60%;
          animation: ptc-bar 2s ease forwards;
        }
        @keyframes ptc-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}
