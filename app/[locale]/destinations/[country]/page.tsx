import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/i18n'
import { destinationMetadata } from '@/lib/destinationMetadata'
import { faqSchema, breadcrumbSchema } from '@/lib/jsonLd'
import Header from '@/components/Header'
import MobileFooter from '@/components/MobileFooter'
import BackToTop from '@/components/BackToTop'
import { HeroSection } from '@/components/HeroSection'
import { WhyUsBlock } from '@/components/WhyUsBlock'
import { ExperienceCard } from '@/components/ExperienceCard'
import { RegionCard } from '@/components/RegionCard'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQSection } from '@/components/FAQSection'
import { CTAFooter } from '@/components/CTAFooter'
import type { DestinationData } from '@/lib/types'

const WHATSAPP = '+49 151 40365107'
const EMAIL = 'office@private-travel-club.com'

const SLUGS = [
  'maldives', 'seychelles', 'greece', 'italy',
  'french-riviera', 'switzerland', 'dubai', 'cappadocia',
]

const cta = {
  plan:    { en: 'Plan your trip',          ru: 'Запланировать поездку',  de: 'Reise planen' },
  request: { en: 'Request this experience', ru: 'Запросить этот вариант', de: 'Anfragen' },
  enquire: { en: 'Enquire',                 ru: 'Узнать подробнее',       de: 'Mehr erfahren' },
  start:   { en: 'Start planning',          ru: 'Начать планирование',    de: 'Jetzt planen' },
  exp:     { en: 'Experiences',             ru: 'Опыт и впечатления',     de: 'Erlebnisse' },
  reg:     { en: 'Regions',                 ru: 'Регионы',                de: 'Regionen' },
  svc:     { en: 'Our Services',            ru: 'Наши услуги',            de: 'Unsere Leistungen' },
} as const

type CtaLocale = keyof (typeof cta)['plan']

async function getDestination(slug: string, locale: string): Promise<DestinationData | null> {
  const lang = locale === 'ru' ? 'ru' : locale === 'de' ? 'de' : 'en'
  try {
    const data = await import(`@/data/${slug}.${lang}.json`)
    return data.default as DestinationData
  } catch {
    return null
  }
}

export function generateStaticParams() {
  return SLUGS.map(country => ({ country }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; country: string }> }
): Promise<Metadata> {
  const { locale, country } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const data = await getDestination(country, lang)
  if (!data) return {}
  return destinationMetadata(data, lang)
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>
}) {
  const { locale, country } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const data = await getDestination(country, lang)
  if (!data) notFound()

  const l = (lang in cta.plan ? lang : 'en') as CtaLocale
  const breadcrumbLang = lang === 'ru' ? 'ru' : lang === 'de' ? 'de' : 'en'

  return (
    <>
      <Header locale={lang} />
      <main className="bg-white text-stone-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(data.faqs)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(data.name, breadcrumbLang, data.slug)),
          }}
        />

        <HeroSection
          heading={data.heroHeading}
          subheading={data.heroSubheading}
          image={data.heroImage}
          imageAlt={data.heroImageAlt}
          ctaLabel={cta.plan[l]}
          whatsappNumber={WHATSAPP}
        />

        <WhyUsBlock heading={data.whyUsHeading} body={data.whyUsBody} />

        <section className="py-4">
          <div className="max-w-5xl mx-auto px-6 mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3 block">
              {cta.exp[l]}
            </span>
            <h2 className="text-3xl font-light text-stone-900">
              {data.experiencesHeading}
            </h2>
          </div>
          <div className="divide-y divide-stone-100">
            {data.experiences.map((exp, i) => (
              <ExperienceCard
                key={i}
                index={i}
                title={exp.title}
                body={exp.body}
                image={exp.image}
                imageAlt={exp.imageAlt}
                ctaLabel={cta.request[l]}
                whatsappNumber={WHATSAPP}
              />
            ))}
          </div>
        </section>

        <section className="bg-stone-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3 block">
              {cta.reg[l]}
            </span>
            <h2 className="text-3xl font-light text-stone-900 mb-12">
              {data.regionsHeading}
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {data.regions.map((region, i) => (
                <RegionCard
                  key={i}
                  name={region.name}
                  body={region.body}
                  image={region.image}
                  imageAlt={region.imageAlt}
                  whatsappNumber={WHATSAPP}
                  ctaLabel={cta.enquire[l]}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
          <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3 block">
            {cta.svc[l]}
          </span>
          <h2 className="text-3xl font-light text-stone-900 mb-12">
            {data.servicesHeading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-200">
            {data.services.map((svc, i) => (
              <ServiceCard key={i} title={svc.title} body={svc.body} icon={svc.icon} />
            ))}
          </div>
        </section>

        <FAQSection heading={data.faqsHeading} faqs={data.faqs} />

        <CTAFooter
          heading={data.ctaHeading}
          subtext={data.ctaSubtext}
          whatsappNumber={WHATSAPP}
          email={EMAIL}
          ctaLabel={cta.start[l]}
        />
      </main>
      <MobileFooter />
      <BackToTop />
    </>
  )
}
