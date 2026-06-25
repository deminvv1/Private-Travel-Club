import Image from 'next/image'
import Link from 'next/link'
import { getT } from '@/lib/i18n'

const CARDS = [
    {
    key: 'jets',
    image: '/images/jets.webp',
    href: '/jets',
    offset: false,
    desc: {
      en: 'Seamless global transit tailored to your most demanding itineraries.',
      ru: 'Безупречные перелёты по всему миру под самые требовательные маршруты.',
      de: 'Nahtlose weltweite Transfers, zugeschnitten auf Ihre anspruchsvollsten Reisepläne.',
    },
  },
  {
    key: 'yachts',
    image: '/images/yachts1.webp',
    href: '/yachts',
    offset: true,
    desc: {
      en: 'Unrestricted ocean exploration aboard the world\'s finest vessels.',
      ru: 'Безграничное морское путешествие на лучших яхтах мира.',
      de: 'Grenzenlose Meeresexploration an Bord der feinsten Yachten der Welt.',
    },
  },
  {
    key: 'villas',
    image: '/images/Premium-villas.webp',
    href: '/villas',
    offset: false,
    desc: {
      en: 'Architecturally significant estates in the world\'s most coveted locations.',
      ru: 'Архитектурно выдающиеся резиденции в самых желанных уголках мира.',
      de: 'Architektonisch bedeutende Anwesen an den begehrtesten Orten der Welt.',
    },
  },
  {
    key: 'concierge',
    image: '/images/concierge.webp',
    href: '/concierge',
    offset: true,
    desc: {
      en: '24/7 lifestyle management for the world\'s most discerning individuals.',
      ru: 'Персональный менеджмент 24/7 для самых взыскательных клиентов.',
      de: 'Lifestyle-Management rund um die Uhr für die anspruchsvollsten Persönlichkeiten.',
    },
  },
]

export default function ServiceCardsSection({ locale }: { locale: string }) {
  const t = getT(locale)
  const lang = (locale as 'en' | 'ru' | 'de') in { en: 1, ru: 1, de: 1 }
    ? (locale as 'en' | 'ru' | 'de')
    : 'en'

  const labels: Record<string, string> = {
    villas: t.nav.villas,
    yachts: t.nav.yachts,
    jets: t.nav.jets,
    concierge: t.nav.concierge,
  }

  return (
    <section style={{ background: '#1f4b85', padding: 'clamp(60px,8vw,120px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="ptc-scards-grid">
          {CARDS.map((card) => (
            <Link
              key={card.key}
              href={`/${locale}${card.href}`}
              className="ptc-scard"
              style={{ marginTop: card.offset ? 'clamp(24px,4vw,48px)' : 0 }}
            >
              <div className="ptc-scard-img-wrap">
                <Image
                  src={card.image}
                  alt={labels[card.key]}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="ptc-scard-img"
                />
              </div>
              <div className="ptc-scard-scrim">
                <h3 className="ptc-scard-label">{labels[card.key]}</h3>
                <p className="ptc-scard-desc">{card.desc[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .ptc-scards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          align-items: start;
        }
        .ptc-scard {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          display: block;
          text-decoration: none;
          cursor: pointer;
        }
        .ptc-scard-img-wrap {
          position: absolute;
          inset: 0;
        }
        .ptc-scard-img {
          transform: scale(1.06);
          transition: transform 1s ease-in-out !important;
        }
        .ptc-scard:hover .ptc-scard-img {
          transform: scale(1) !important;
        }
        .ptc-scard-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(31,75,133,0.95) 0%, rgba(31,75,133,0) 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
        }
        .ptc-scard-label {
          font-family: PTCSans, Arial, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }
        .ptc-scard-desc {
          font-family: PTCSans, Arial, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .ptc-scard:hover .ptc-scard-desc {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .ptc-scards-grid { grid-template-columns: 1fr 1fr !important; }
          .ptc-scard { margin-top: 0 !important; }
        }
        @media (max-width: 560px) {
          .ptc-scards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
