import type { Metadata } from 'next'
import Preloader from '@/components/Preloader'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ServiceCardsSection from '@/components/ServiceCardsSection'
import PlanTripSection from '@/components/PlanTripSection'
import AboutSection from '@/components/AboutSection'
import WhyUsSection from '@/components/WhyUsSection'
import ClientsCarousel from '@/components/ClientsCarousel'
import MobileFooter from '@/components/MobileFooter'
import BackToTop from '@/components/BackToTop'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'

const CLIENT_LOGOS = [
  { type: 'image' as const, src: '/images/clients/Anantara.webp', alt: 'Anantara' },
  { type: 'image' as const, src: '/images/clients/dorchester-collection-vector-logo.svg', alt: 'Dorchester' },
  { type: 'image' as const, src: '/images/clients/Atlantis.webp', alt: 'Atlantis' },
  { type: 'image' as const, src: '/images/clients/Cheval-Blanc.svg', alt: 'Cheval-Blanc' },
  { type: 'image' as const, src: '/images/clients/Belmond.webp', alt: 'Belmond' },
  { type: 'image' as const, src: '/images/clients/Le-Reserve.svg', alt: 'Le-Reserve' },
  { type: 'image' as const, src: '/images/clients/Bvlgari.svg', alt: 'Bvlgari' },
  { type: 'image' as const, src: '/images/clients/Rocco-Forte-Hotels.svg', alt: 'Rocco-Forte-Hotels' },
  { type: 'image' as const, src: '/images/clients/Four-Seasons.webp', alt: 'Four Seasons' },
  { type: 'image' as const, src: '/images/clients/Joali.svg', alt: 'Joali' },
  { type: 'image' as const, src: '/images/clients/Jumeirah.webp', alt: 'Jumeirah' },
  { type: 'image' as const, src: '/images/clients/Banyan-Tree.svg', alt: 'Banyan-Tree' },
  { type: 'image' as const, src: '/images/clients/Mandarin-Oriental.webp', alt: 'Mandarin Oriental' },
  { type: 'image' as const, src: '/images/clients/Six-Senses.svg', alt: 'Six-Senses' },
  { type: 'image' as const, src: '/images/clients/Maxx-Royal.webp', alt: 'Maxx Royal' },
  { type: 'image' as const, src: '/images/clients/Rosewood.svg', alt: 'Rosewood' },
  { type: 'image' as const, src: '/images/clients/Oetker-Collection.webp', alt: 'Oetker Collection' },
  { type: 'image' as const, src: '/images/clients/Peninsula.svg', alt: 'Peninsula' },
  { type: 'image' as const, src: '/images/clients/One-Only.webp', alt: 'One&Only' },
  { type: 'image' as const, src: '/images/clients/St-Regis.webp', alt: 'St. Regis' },
  { type: 'image' as const, src: '/images/clients/The-Leading-Hotels.webp', alt: 'The Leading Hotels' },
  { type: 'image' as const, src: '/images/clients/The-Ritz.webp', alt: 'The Ritz' },
  { type: 'image' as const, src: '/images/clients/V-Man.webp', alt: 'V-Man' },
  { type: 'image' as const, src: '/images/clients/Waldorf-Astoria.webp', alt: 'Waldorf Astoria' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  return {
    title: 'PRIVATE TRAVEL CLUB ❖ Worldwide Travel & Concierge Services',
    alternates: buildAlternates(lang),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)

  return (
    <>
      <Preloader />
      <Header locale={lang} />
      <main>
        <Hero locale={lang} />
        <ServiceCardsSection locale={lang} />
        <PlanTripSection
          locale={lang}
          submitLabel={lang === 'ru' ? 'Запланировать поездку' : lang === 'de' ? 'Reise planen' : 'Plan My Trip'}
        />
        <AboutSection locale={lang} />
        <ClientsCarousel items={CLIENT_LOGOS} speed={80} />
        <WhyUsSection
          title={t.whyus.title}
          body={t.whyus.body}
          col1={t.whyus.col1}
          col2={t.whyus.col2}
          contactsTitle={t.whyus.contactsTitle}
          email={t.whyus.email}
          phone={t.whyus.phone}
          phoneTel={t.whyus.phoneTel}
          whatsapp={t.whyus.whatsapp}
          whatsappLink={t.whyus.whatsappLink}
          instagram={t.whyus.instagram}
          instagramLink={t.whyus.instagramLink}
          locale={lang}
          nav={t.nav}
        />
      </main>
      <MobileFooter />
      <BackToTop />
    </>
  )
}
