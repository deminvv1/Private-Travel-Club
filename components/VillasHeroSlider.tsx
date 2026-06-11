'use client'

import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  { src: '/images/tild3165-3461-4733-b936-333464396562__chalet-zermatt-peak-.jpg' },
  { src: '/images/chalet-evening-lit.webp' },
  { src: '/images/Premium-villas.webp' },
]

export default function VillasHeroSlider() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive(i => (i + 1) % SLIDES.length), [])
  const prev = useCallback(() => setActive(i => (i - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const timer = setTimeout(next, 5000)
    return () => clearTimeout(timer)
  }, [active, next])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === active ? 1 : 0,
          transition: 'opacity 0.9s ease',
          pointerEvents: i === active ? 'auto' : 'none',
        }}>
          <img
            src={slide.src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(31,75,133,0.3)' }} />

        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="ptc-vslider-arrow"
        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="ptc-vslider-arrow"
        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators — bottom right */}
      <div style={{ position: 'absolute', bottom: 56, right: 48, zIndex: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === active ? 28 : 8,
              height: 3,
              background: i === active ? '#ffce5a' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s',
              padding: 0,
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      <style>{`
        .ptc-vslider-arrow { transition: background 0.2s; }
        .ptc-vslider-arrow:hover { background: rgba(31,75,133,0.6) !important; }
      `}</style>
    </div>
  )
}
