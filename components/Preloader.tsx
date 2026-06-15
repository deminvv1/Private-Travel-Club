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

      {/* Plane + track */}
      <div style={{ position: 'relative', width: 260, height: 48, marginBottom: 40 }}>
        {/* Track line */}
        <div style={{
          position: 'absolute', bottom: 8, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(to right, transparent 0%, rgba(232,176,0,0.15) 20%, rgba(232,176,0,0.35) 60%, transparent 100%)',
        }} />
        {/* Glow dot */}
        <div className="ptc-pre-glow" />
        {/* Plane */}
        <div className="ptc-pre-plane">
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
            <path d="M60 28L36 20V8a4 4 0 0 0-8 0v12L4 28v6l24-6v14l-6 4v4l10-3 10 3v-4l-6-4V28l24 6z" fill="#e8b000"/>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-hanken, sans-serif)',
          fontSize: 10, fontWeight: 600,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: 10,
        }}>
          Private Travel Club
        </p>
        {/* Progress bar */}
        <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 auto', overflow: 'hidden' }}>
          <div className="ptc-pre-bar" />
        </div>
      </div>

      <style>{`
        .ptc-pre-plane {
          position: absolute;
          bottom: 6px;
          animation: ptc-fly 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes ptc-fly {
          0%   { left: -20px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 10px); opacity: 0; }
        }
        .ptc-pre-glow {
          position: absolute;
          bottom: 4px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #e8b000;
          box-shadow: 0 0 12px 4px rgba(232,176,0,0.5);
          animation: ptc-glow-move 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes ptc-glow-move {
          0%   { left: -10px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 10px); opacity: 0; }
        }
        .ptc-pre-bar {
          height: 100%;
          background: linear-gradient(to right, transparent, #e8b000, transparent);
          width: 60%;
          animation: ptc-bar 2s ease forwards;
        }
        @keyframes ptc-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
