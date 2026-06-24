'use client'

import Image from 'next/image'

type CarouselItem =
  | { type: 'image'; src: string; alt: string }
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
    <section style={{ background: 'rgb(14, 19, 33)', overflow: 'hidden', padding: '48px 0' }}>
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
          background: 'linear-gradient(to right, rgb(14,19,33), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to left, rgb(14,19,33), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          gap: 64,
          width: 'max-content',
          animation: `ptc-scroll ${speed}s linear infinite`,
        }}>
          {track.map((item, i) => (
            <div key={i} style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}>
              {'src' in item ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={160}
                  height={100}
                  style={{ objectFit: 'contain', maxHeight: 100 }}
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
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ptc-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
