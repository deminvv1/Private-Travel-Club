'use client'

import Image from 'next/image'

type CarouselItem =
  | { type: 'image'; src: string; alt: string; imgStyle?: React.CSSProperties; imgWidth?: number; imgHeight?: number }
  | { type: 'text'; name: string }

interface ClientsCarouselProps {
  label?: string
  items: CarouselItem[]
  speed?: number
}

export default function ClientsCarousel({
  label = 'OUR PARTNERS',
  items,
  speed = 30,
}: ClientsCarouselProps) {
  const track = [...items, ...items]

  return (
    <section style={{ background: 'linear-gradient(to bottom, rgb(31,75,133) 0%, rgb(27,60,110) 10%, rgb(20,42,80) 20%, rgb(16,28,55) 30%, rgb(14,19,33) 42%, rgb(14,19,33) 58%, rgb(16,28,55) 70%, rgb(20,42,80) 80%, rgb(27,60,110) 90%, rgb(31,75,133) 100%)', overflow: 'hidden', padding: '10px 0 80px 0px',  }}>
      {label && (
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-hanken)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgb(232,176,0)',
          marginBottom: 36,
        }}>
          {label}
        </p>
      )}

      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          gap: 64,
          width: 'max-content',
          animation: `ptc-scroll ${speed}s linear infinite`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}>
          {track.map((item, i) => {
            const w = 'imgWidth' in item && item.imgWidth ? item.imgWidth : 280
            const h = 'imgHeight' in item && item.imgHeight ? item.imgHeight : 180
            return (
              <div key={i} style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 180,
              }}>
                {'src' in item ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={w}
                    height={h}
                    style={{ objectFit: 'contain', ...item.imgStyle }}
                  />
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-hanken)',
                    fontSize: 15,
                    fontWeight: 400,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.name}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes ptc-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  )
}
