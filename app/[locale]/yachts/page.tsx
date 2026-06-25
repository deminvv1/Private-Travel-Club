import type { Metadata } from 'next'
import Header from '@/components/Header'
import BackToTop from '@/components/BackToTop'
import MobileFooter from '@/components/MobileFooter'
import PlanTripSection from '@/components/PlanTripSection'
import Link from 'next/link'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'
import WhyUsSection from '@/components/WhyUsSection'
import YachtFleetSection from '@/components/YachtFleetSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)
  return {
    title: t.yachtsPage.title,
    description: t.yachtsPage.metaDescription,
    alternates: buildAlternates(lang, '/yachts'),
  }
}

const OVERLAY = 'rgba(31,75,133,0.8)'

export default async function YachtsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const translations = getT(lang)
  const t = translations.yachtsPage

  return (
    <>
      <Header locale={lang} />
      <main>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/yachts-page.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(120px,14vw,160px) clamp(24px,6vw,100px) 80px', maxWidth: 900, width: '100%', margin: '0 auto', textAlign: 'center' }}>
            <p className="stitch-label" style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>{t.tagline}</p>
            <h1 className="stitch-display" style={{ color: '#fff', marginBottom: 24 }}>{t.title}</h1>
            <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>{t.subtitle}</p>
            <a href="#contact" className="ptc-cta-btn">{t.cta}</a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, rgb(31,75,133))' }} />
          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, animation: 'ptc-bounce 2s ease-in-out infinite' }}>
              <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ── THE CURATED FLEET ── */}
        <YachtFleetSection locale={lang} />

        {/* ── CONTACT ── */}
        <div id="contact" style={{ background: 'rgb(31,75,133)' }}>
          <PlanTripSection
            locale={lang}
            label={lang === 'ru' ? 'Премиальные Яхты ' : lang === 'de' ? 'Luxusyachten' : 'Luxury Yachts'}
            title={lang === 'ru' ? 'За горизонтом.' : lang === 'de' ? 'Jenseits des Horizonts.' : 'Beyond the Horizon.'}
            sub={
              lang === 'ru'
                ? 'Поделитесь деталями — мы создадим уникальный опыт на борту: от приватных причалов до шеф-поваров со звёздами Мишлен.'
                : lang === 'de'
                ? 'Teilen Sie uns Ihre Details mit — wir gestalten ein exklusives Erlebnis an Bord: von privaten Docks bis zu Michelin-Sterneköchen.'
                : 'Share your details and we\'ll curate a bespoke on-board experience — from private docks to Michelin-star chefs aboard.'
            }
            submitLabel={lang === 'ru' ? 'Создать мой круиз' : lang === 'de' ? 'Kreuzfahrt gestalten' : 'Tailor My Cruise'}
          />
        </div>

        {/* ── BACK ── */}
        <div style={{ background: '#1f4b85', textAlign: 'center', padding: '32px 24px', borderBottom: '2px solid #1f4b85' }}>
          <Link href={`/${lang}`} className="ptc-back-link" style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            {getT(lang).nav.back}
          </Link>
        </div>

        <WhyUsSection
          title={translations.whyus.title}
          body={translations.whyus.body}
          col1={translations.whyus.col1}
          col2={translations.whyus.col2}
          contactsTitle={translations.whyus.contactsTitle}
          email={translations.whyus.email}
          phone={translations.whyus.phone}
          phoneTel={translations.whyus.phoneTel}
          whatsapp={translations.whyus.whatsapp}
          whatsappLink={translations.whyus.whatsappLink}
          instagram={translations.whyus.instagram}
          instagramLink={translations.whyus.instagramLink}
          locale={lang}
          nav={translations.nav}
        />

      </main>
      <MobileFooter />
      <BackToTop />
      <style>{`
        .ptc-cta-btn { display: inline-block; background: #e8b000; color: #fff; font-family: PTCSans, Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; text-decoration: none; transition: background 0.2s; }
        .ptc-cta-btn:hover { background: #d4a000; }
        @keyframes ptc-bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(5px); } }
        @media (max-width: 1199px) { .ptc-page-bg { background-attachment: scroll !important; } }
        .ptc-back-link:hover { color: #fff !important; }
      `}</style>
    </>
  )
}
