import Image from 'next/image'

interface ServiceSectionProps {
  title: string
  description: string
  bgImage: string
  photos: { src: string; alt: string }[]
}

export default function ServiceSection({ title, description, bgImage, photos }: ServiceSectionProps) {
  return (
    <section style={{
      position: 'relative', width: '100%',
      minHeight: '90vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      <div className="ptc-svc-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 50%, rgba(31,75,133,1) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1300, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 'clamp(22px,2.8vw,36px)',
          fontWeight: 700, color: '#fff',
          marginBottom: 20,
        }}>
          {title}
        </h2>

        <p style={{
          fontFamily: 'PTCSans, Arial, sans-serif',
          fontSize: 20,
          fontWeight: 300, color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.7, marginBottom: 48,
          maxWidth: 760, margin: '0 auto 48px',
        }}>
          {description}
        </p>

        {/* 4 photos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }} className="ptc-svc-grid">
          {photos.map((photo, i) => (
            <div key={i} style={{
              position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden',
              borderRadius: 8,
              boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
            }}>
              <Image
                src={photo.src} alt={photo.alt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, 25vw"
                className="ptc-svc-photo"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ptc-svc-photo { transition: transform 0.5s ease; }
        .ptc-svc-photo:hover { transform: scale(1.05); }
        @media (max-width: 1199px) {
          .ptc-svc-bg { background-attachment: scroll !important; }
        }
        @media (max-width: 640px) {
          .ptc-svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
