interface GalleryStripProps {
  title: string
  body: string
}

import Image from 'next/image'

const photos = [
  { src: '/images/premium-tur.webp', alt: 'Luxury travel experience — Private Travel Club' },
  { src: '/images/Cappadocia.webp', alt: 'Cappadocia — exclusive travel destination' },
  { src: '/images/tild6262-6533-4037-b434-383334356336__213934894.jpg', alt: 'Luxury yacht — premium sea travel' },
  { src: '/images/glov.webp', alt: 'White glove service — Private Travel Club concierge' },
]

export default function GalleryStrip({ title, body }: GalleryStripProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(60px,8vw,100px) 0' }}>
      <div className="ptc-gallery-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: "url('/images/bora-bora-french-pol.webp')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 50%, rgba(31,75,133,1) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: '0 clamp(24px,4vw,60px)',
      }}>
        <h2 style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 'clamp(22px,2.8vw,38px)',
          fontWeight: 700, color: '#fff',
          textAlign: 'center', marginBottom: 16,
        }}>
          {title}
        </h2>
        <p style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 20,
          fontWeight: 300, color: 'rgba(255,255,255,0.8)',
          textAlign: 'center', lineHeight: 1.7,
          maxWidth: 720, margin: '0 auto 48px',
        }}>
          {body}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }} className="ptc-gallery-grid">
          {photos.map((photo, i) => (
            <div key={i} style={{
              position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden',
              borderRadius: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}>
              <Image
                src={photo.src} alt={photo.alt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, 25vw"
                className="ptc-gallery-img"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ptc-gallery-img { transition: transform 0.5s ease; }
        .ptc-gallery-img:hover { transform: scale(1.05); }
        @media (max-width: 1199px) {
          .ptc-gallery-bg { background-attachment: scroll !important; }
        }
      `}</style>
    </section>
  )
}
