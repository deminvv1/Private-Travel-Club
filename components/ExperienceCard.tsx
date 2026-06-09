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
  title,
  body,
  image,
  imageAlt,
  ctaLabel,
  whatsappNumber,
  index,
}: ExperienceCardProps) {
  const isReversed = index % 2 !== 0
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

  return (
    <div
      className={`grid md:grid-cols-2 gap-0 items-stretch ${
        isReversed ? 'md:grid-flow-dense' : ''
      }`}
    >
      <div
        className={`relative h-72 md:h-auto min-h-[400px] ${
          isReversed ? 'md:col-start-2' : ''
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div
        className={`flex flex-col justify-center px-10 py-14 bg-stone-50 ${
          isReversed ? 'md:col-start-1' : ''
        }`}
      >
        <h3 className="text-2xl font-light text-stone-900 mb-5">{title}</h3>
        <p className="text-stone-600 leading-relaxed mb-8">{body}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start text-xs tracking-widest uppercase border-b border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
