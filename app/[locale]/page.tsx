import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ServiceCardsSection from '@/components/ServiceCardsSection'
import PlanTripSection from '@/components/PlanTripSection'
import AboutSection from '@/components/AboutSection'
import WhyUsSection from '@/components/WhyUsSection'
import MobileFooter from '@/components/MobileFooter'
import BackToTop from '@/components/BackToTop'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'

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
      <Header locale={lang} />
      <main>
        <Hero locale={lang} />
        <ServiceCardsSection locale={lang} />
        <PlanTripSection
          locale={lang}
          submitLabel={lang === 'ru' ? 'Запланировать поездку' : lang === 'de' ? 'Reise planen' : 'Plan My Trip'}
        />
        <AboutSection locale={lang} />
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
