import Image from 'next/image'

interface RegionCardProps {
  name: string
  body: string
  image: string
  imageAlt: string
  whatsappNumber: string
  ctaLabel: string
}

export function RegionCard({ name, body, image, imageAlt, whatsappNumber, ctaLabel }: RegionCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

  return (
    <div className="group">
      <div className="relative h-64 overflow-hidden mb-6">
        <Image
          src={image} alt={imageAlt} fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: 'clamp(18px,1.6vw,22px)',
        fontWeight: 400, color: '#fff',
        lineHeight: 1.3, marginBottom: 12,
      }}>
        {name}
      </h3>
      <p style={{
        fontFamily: 'var(--font-hanken)',
        fontSize: 'clamp(12px,1.1vw,15px)',
        fontWeight: 300, color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.7, marginBottom: 20,
      }}>
        {body}
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.5)',
          paddingBottom: 2, textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        {ctaLabel}
      </a>
    </div>
  )
}
