import Image from 'next/image'

interface ExperienceCardProps {
  title: string
  body: string
  image: string
  imageAlt: string
  ctaLabel: string
  whatsappNumber: string
  index: number
}

export function ExperienceCard({
  title, body, image, imageAlt, ctaLabel, whatsappNumber, index,
}: ExperienceCardProps) {
  const isReversed = index % 2 !== 0
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

  return (
    <div className={`grid md:grid-cols-2 gap-0 items-stretch ${isReversed ? 'md:grid-flow-dense' : ''}`}>
      <div className={`relative h-72 md:h-auto min-h-[400px] ${isReversed ? 'md:col-start-2' : ''}`}>
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      <div
        className={isReversed ? 'md:col-start-1' : ''}
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(40px,6vw,56px) clamp(24px,5vw,40px)',
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(20px,2vw,28px)',
          fontWeight: 400, color: '#fff',
          lineHeight: 1.3, marginBottom: 20,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 'clamp(13px,1.2vw,17px)',
          fontWeight: 300, color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.75, marginBottom: 32,
        }}>
          {body}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-hanken)',
            fontSize: 12, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.5)',
            paddingBottom: 2, textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
