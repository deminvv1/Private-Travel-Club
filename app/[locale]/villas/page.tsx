import type { Metadata } from 'next'
import Header from '@/components/Header'
import BackToTop from '@/components/BackToTop'
import MobileFooter from '@/components/MobileFooter'
import PlanTripSection from '@/components/PlanTripSection'
import Link from 'next/link'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'
import WhyUsSection from '@/components/WhyUsSection'
import VillasHeroSlider from '@/components/VillasHeroSlider'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)
  return {
    title: t.villasPage.title,
    description: t.villasPage.metaDescription,
    alternates: buildAlternates(lang, '/villas'),
  }
}

export default async function VillasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const translations = getT(lang)
  const t = translations.villasPage

  const bullets = t.features.slice(0, 3)

  return (
    <>
      <Header locale={lang} />
      <main>

        {/* ── HERO SPLIT SCREEN ── */}
        <section className="ptc-villa-hero" style={{ display: 'flex', minHeight: '100vh' }}>

          {/* Left 60% — image slider */}
          <div className="ptc-villa-hero-img" style={{ flex: '0 0 60%', position: 'relative', overflow: 'hidden' }}>
            <VillasHeroSlider />
          </div>

          {/* Right 40% — solid panel */}
          <div className="ptc-villa-hero-panel" style={{
            flex: '0 0 40%',
            background: '#1f4b85',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(100px,10vw,140px) clamp(40px,5vw,80px) clamp(60px,6vw,80px)',
          }}>
            <div style={{ maxWidth: 420 }}>
              <p className="stitch-label" style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>{t.tagline}</p>
              <h1 className="stitch-headline-lg" style={{ color: '#fff', marginBottom: 24 }}>{t.title}</h1>
              <div style={{ color: '#ffce5a', fontSize: 22, marginBottom: 28 }}>❖</div>
              <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 40 }}>{t.subtitle}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {bullets.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="11" cy="11" r="11" fill="rgba(255,255,255,0.18)" />
                      <path d="M7 11l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="stitch-body-md" style={{ color: 'rgba(255,255,255,0.75)' }}>{f.title}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="ptc-villa-cta">{t.cta}</a>
            </div>
          </div>

        </section>

        {/* ── CONTACT ── */}
        <div id="contact">
          <PlanTripSection
            locale={lang}
            label={lang === 'ru' ? 'Виллы и резиденции' : lang === 'de' ? 'Villen & Residenzen' : 'Private Residences & Villas'}
            title={lang === 'ru' ? 'Запрос на размещение.' : lang === 'de' ? 'Anfrage für Residenz.' : 'Inquiry For Residency.'}
            sub={
              lang === 'ru'
                ? 'Наша команда подберёт объекты под ваш профиль и пожелания. Поделитесь деталями — мы позаботимся об остальном.'
                : lang === 'de'
                ? 'Unser Team stellt Ihnen eine Auswahl an Residenzen zusammen, die auf Ihr Profil und Ihre Anforderungen zugeschnitten sind.'
                : 'Our team will curate a selection of residences tailored to your specific travel profile and requirements. Share your details and we\'ll handle the rest.'
            }
            submitLabel={lang === 'ru' ? 'Запланировать моё размещение' : lang === 'de' ? 'Villa anfragen' : 'Curate My Stay'}
          />
        </div>

        {/* ── BACK ── */}
        <div style={{ background: '#1f4b85', textAlign: 'center', padding: '32px 24px' }}>
          <Link href={`/${lang}`} className="ptc-back-link" style={{ fontFamily: 'var(--font-hanken)', fontSize: 13, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
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
        .ptc-villa-cta {
          display: inline-block;
          background: #e8b000;
          color: #fff;
          font-family: var(--font-hanken);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 40px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ptc-villa-cta:hover { background: #d4a000; }
        .ptc-back-link:hover { color: #fff !important; }
        @media (max-width: 768px) {
          .ptc-villa-hero { flex-direction: column !important; min-height: auto !important; }
          .ptc-villa-hero-img { flex: none !important; height: 442px !important; }
          .ptc-villa-hero-panel { flex: none !important; }
        }
      `}</style>
    </>
  )
}
