'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'

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
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const offsetRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let halfWidth = track.scrollWidth / 2 + 32 // 32 = gap/2 (gap is 64px)
    let lastTime: number | null = null

    const animate = (time: number) => {
      if (lastTime !== null) {
        const pxPerMs = halfWidth / (speed * 1000)
        offsetRef.current += pxPerMs * (time - lastTime)
        if (offsetRef.current >= halfWidth) {
          offsetRef.current -= halfWidth
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`
      }
      lastTime = time
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed])

  const doubled = [...items, ...items]

  return (
    <section style={{ background: 'linear-gradient(to bottom, rgb(31,75,133) 0%, rgb(27,60,110) 10%, rgb(20,42,80) 20%, rgb(16,28,55) 30%, rgb(14,19,33) 42%, rgb(14,19,33) 58%, rgb(16,28,55) 70%, rgb(20,42,80) 80%, rgb(27,60,110) 90%, rgb(31,75,133) 100%)', overflow: 'hidden', padding: '10px 0 80px 0px' }}>
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

        <div ref={trackRef} style={{
          display: 'flex',
          gap: 64,
          width: 'max-content',
          willChange: 'transform',
        }}>
          {doubled.map((item, i) => {
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
    </section>
  )
}
