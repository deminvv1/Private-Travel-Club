import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import IntroSection from '@/components/IntroSection'
import ServiceSection from '@/components/ServiceSection'
import GalleryStrip from '@/components/GalleryStrip'
import WhyUsSection from '@/components/WhyUsSection'
import ServiceCardsSection from '@/components/ServiceCardsSection'
import PlanTripSection from '@/components/PlanTripSection'
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

const servicePhotos = {
  villas: [
    { src: '/images/tild3165-3461-4733-b936-333464396562__chalet-zermatt-peak-.jpg', alt: 'Luxury chalet in Zermatt — Private Travel Club villa rental' },
    { src: '/images/chalet-evening-lit.webp', alt: 'Evening illuminated luxury chalet — exclusive villa rental' },
    { src: '/images/tild6564-6463-4534-b638-303337306364__luxusvilla-stokovci-.jpg', alt: 'Luxury villa with pool — Private Travel Club' },
    { src: '/images/tild6262-6533-4037-b434-383334356336__213934894.jpg', alt: 'Exclusive luxury villa exterior — bespoke travel accommodation' },
  ],
  yachts: [
    { src: '/images/tild6262-6533-4037-b434-383334356336__213934894.jpg', alt: 'Private yacht charter — luxury sea travel' },
    { src: '/images/Luxury-yacht.webp', alt: 'Luxury-yacht on the open sea — Private Travel Club charter' },
    { src: '/images/tild6533-3237-4136-b130-303762323166__private_jet_charter_.jpg', alt: 'Private jet charter — exclusive air travel service' },
    { src: '/images/interior-of-a-luxury.webp', alt: 'Interior of a luxury yacht — premium onboard experience' },
  ],
  transfers: [
    { src: '/images/tild3937-3437-4931-b239-313666356132__screenshot_19.png', alt: 'Premium car transfer service — Private Travel Club' },
    { src: '/images/vertolet-v-polete.webp', alt: 'Luxury car transfer — exclusive ground transportation' },
    { src: '/images/tild6439-6665-4164-b666-643462666432__b2a1d48840da35631578.jpg', alt: 'Premium transfer vehicle — Private Travel Club' },
    { src: '/images/Helicopter-transfer.webp', alt: 'Helicopter transfer — luxury air transport service' },
  ],
  concierge: [
    { src: '/images/premium-tur.webp', alt: 'Personal concierge service — Private Travel Club' },
    { src: '/images/glov.webp', alt: 'White glove concierge service — premium travel assistance' },
    { src: '/images/kubok-pobeditelya-splava-katun.webp', alt: 'Dedicated concierge assistance — exclusive client service' },
    { src: '/images/horse-and-car.webp', alt: 'Exclusive concierge experience — luxury lifestyle management' },
  ],
}

const serviceBgs = {
  villas: '/images/Premium-villas.webp',
  yachts: '/images/Premium-yacht.webp',
  transfers: '/images/Premium-concierge.webp',
  concierge: '/images/tild6638-6537-4132-a666-383131626462__istock-964566894.webp',
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)

  const services = [
    { ...t.services.villas, bgImage: serviceBgs.villas, photos: servicePhotos.villas },
    { ...t.services.yachts, bgImage: serviceBgs.yachts, photos: servicePhotos.yachts },
    { ...t.services.transfers, bgImage: serviceBgs.transfers, photos: servicePhotos.transfers },
    { ...t.services.concierge, bgImage: serviceBgs.concierge, photos: servicePhotos.concierge },
  ]

  return (
    <>
      <Header locale={lang} />
      <main>
        <Hero locale={lang} />
        <ServiceCardsSection locale={lang} />
        <PlanTripSection locale={lang} />
        <IntroSection
          title={t.intro.title}
          body={t.intro.body}
          items={t.intro.items}
          locale={lang}
        />
        <GalleryStrip title={t.gallery.title} body={t.gallery.body} />
        {services.map((service, i) => (
          <ServiceSection key={i} {...service} />
        ))}
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
