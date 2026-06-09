import Image from 'next/image'

interface RegionCardProps {
  name: string
  body: string
  image: string
  imageAlt: string
  whatsappNumber: string
  ctaLabel: string
}

export function RegionCard({
  name,
  body,
  image,
  imageAlt,
  whatsappNumber,
  ctaLabel,
}: RegionCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

  return (
    <div className="group">
      <div className="relative h-64 overflow-hidden mb-6">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-xl font-light text-stone-900 mb-3">{name}</h3>
      <p className="text-stone-600 leading-relaxed text-sm mb-5">{body}</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs tracking-widest uppercase border-b border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors"
      >
        {ctaLabel}
      </a>
    </div>
  )
}
