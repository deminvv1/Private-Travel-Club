import type { Metadata } from 'next'
import Header from '@/components/Header'
import BackToTop from '@/components/BackToTop'
import MobileFooter from '@/components/MobileFooter'
import PlanTripSection from '@/components/PlanTripSection'
import Link from 'next/link'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'
import WhyUsSection from '@/components/WhyUsSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)
  return {
    title: t.jetsPage.title,
    description: t.jetsPage.metaDescription,
    alternates: buildAlternates(lang, '/jets'),
  }
}

const OVERLAY = 'rgba(31, 75, 133, 0.8)'

export default async function JetsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const translations = getT(lang)
  const t = translations.jetsPage

  return (
    <>
      <Header locale={lang} />
      <main>
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/Jets-page.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(120px,14vw,160px) clamp(24px,6vw,100px) 80px', maxWidth: 1300, width: '100%', margin: '0 auto' }}>
            <p className="stitch-label" style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>{t.tagline}</p>
            <h1 className="stitch-display" style={{ color: '#fff', marginBottom: 24, maxWidth: 700 }}>{t.title}</h1>
            <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 480 }}>{t.subtitle}</p>
            <a href="#contact" className="ptc-cta-btn">{t.cta}</a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, #0e1321)' }} />
          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, animation: 'ptc-bounce 2s ease-in-out infinite' }}>
              <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>


        {/* Technical Superiority Section */}
        <section style={{ background: 'linear-gradient(to bottom, #0e1321 0%, #0e1321 75%, #0a0e1a 100%)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <div className="ptc-jets-grid">

              {/* Left */}
              <div>
                <h2 className="stitch-headline-lg" style={{ color: '#dee1f5', marginBottom: 48, whiteSpace: 'pre-line' }}>
                  {lang === 'ru' ? 'Техническое\nПревосходство' : lang === 'de' ? 'Technische\nÜberlegenheit' : 'Technical\nSuperiority'}
                </h2>
                <div style={{ borderLeft: '1px solid #7aa3d4', paddingLeft: 32 }}>
                  <p className="stitch-body-md" style={{ color: 'rgba(222,225,245,0.65)', marginBottom: 32, lineHeight: 1.75 }}>
                    {lang === 'ru'
                      ? 'Мы не просто предоставляем транспорт. Мы создаём среду для сосредоточенного уединения. Наши джеты оснащены передовыми системами шумоподавления и очистки воздуха.'
                      : lang === 'de'
                      ? 'Wir bieten keine bloße Beförderung. Wir schaffen ein Umfeld konzentrierter Stille. Unsere Jets sind mit modernster Schallschutz- und Luftreinigungstechnologie ausgestattet.'
                      : 'We do not simply offer transportation. We provide an environment of focused solitude. Our jets are equipped with advanced sound-dampening technology and air-purification systems.'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 36, color: '#e8b000', lineHeight: 1 }}>01</span>
                    <span className="stitch-label" style={{ color: 'rgba(222,225,245,0.4)' }}>
                      {lang === 'ru' ? 'ГЛОБАЛЬНЫЙ ОХВАТ' : lang === 'de' ? 'GLOBALE REICHWEITE' : 'GLOBAL REACH'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — bento cards */}
              <div className="ptc-jets-bento">
                <div style={{ border: '1px solid rgba(255,255,255,0.12)', padding: 'clamp(24px,3vw,48px)' }} className="ptc-jets-card">
                  <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 36, color: '#e8b000', display: 'block', marginBottom: 20 }}>51,000</span>
                  <h4 className="stitch-headline-md" style={{ color: '#dee1f5', marginBottom: 12 }}>
                    {lang === 'ru' ? 'Крейсерская высота' : lang === 'de' ? 'Reiseflughöhe' : 'Cruise Altitude'}
                  </h4>
                  <p className="stitch-body-md" style={{ color: 'rgba(222,225,245,0.45)' }}>
                    {lang === 'ru' ? 'Выше погоды, выше шума — в полной атмосферной ясности.' : lang === 'de' ? 'Über dem Wetter, über dem Lärm, in totaler atmosphärischer Klarheit.' : 'Flying above the weather, above the noise, in total atmospheric clarity.'}
                  </p>
                </div>

                <div style={{ border: '1px solid rgba(255,255,255,0.12)', padding: 'clamp(24px,3vw,48px)', background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 36, color: '#e8b000', display: 'block', marginBottom: 20 }}>0.925</span>
                  <h4 className="stitch-headline-md" style={{ color: '#dee1f5', marginBottom: 12 }}>
                    {lang === 'ru' ? 'Скорость по Маху' : lang === 'de' ? 'Mach-Geschwindigkeit' : 'Mach Velocity'}
                  </h4>
                  <p className="stitch-body-md" style={{ color: 'rgba(222,225,245,0.45)' }}>
                    {lang === 'ru' ? 'Соединяем континенты с изящной высокоскоростной точностью.' : lang === 'de' ? 'Kontinente verbinden mit der mühelosen Eleganz hochpräziser Geschwindigkeit.' : 'Bridging continents with the effortless grace of high-velocity precision.'}
                  </p>
                </div>

                <div style={{ border: '1px solid rgba(255,255,255,0.12)', padding: 'clamp(24px,3vw,48px)', display: 'flex', gap: 40, alignItems: 'center' }} className="ptc-jets-card-wide">
                  <div style={{ flexShrink: 0, aspectRatio: '4/3', overflow: 'hidden' }} className="ptc-jets-card-img">
                    <img src="/images/jets-salon.webp" alt="Private jet interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 36, color: '#e8b000', display: 'block', marginBottom: 20 }}>100%</span>
                    <h4 className="stitch-headline-md" style={{ color: '#dee1f5', marginBottom: 12 }}>
                      {lang === 'ru' ? 'Индивидуальный интерьер' : lang === 'de' ? 'Individuelle Innenausstattung' : 'Custom Interiors'}
                    </h4>
                    <p className="stitch-body-md" style={{ color: 'rgba(222,225,245,0.45)' }}>
                      {lang === 'ru' ? 'Уникальные планировки от ведущих архитектурных бюро для максимального комфорта.' : lang === 'de' ? 'Einzigartige Layouts führender Architekturbüros für maximalen Komfort.' : 'Bespoke layouts designed by leading architectural firms to maximize comfort and rest.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <style>{`
            .ptc-jets-grid { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(40px,6vw,100px); align-items: start; }
            .ptc-jets-bento { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
            .ptc-jets-card-wide { grid-column: span 2; }
            .ptc-jets-card-img { width: 45%; }
            .ptc-jets-card:hover { background: rgba(255,255,255,0.04) !important; }
            @media (max-width: 900px) {
              .ptc-jets-grid { grid-template-columns: 1fr !important; }
              .ptc-jets-bento { grid-template-columns: 1fr !important; }
              .ptc-jets-card-wide { grid-column: span 1 !important; flex-direction: column !important; }
              .ptc-jets-card-img { width: 100% !important; }
            }
          `}</style>
        </section>

        {/* Silent Propulsion Section */}
        <section style={{ background: 'linear-gradient(to bottom, #0a0e1a 0%, #0a0e1a 75%, rgb(31,75,133) 100%)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <div className="ptc-silent-grid">

              {/* Left — image */}
              <div style={{ aspectRatio: '2/2', overflow: 'hidden', background: '#1a2035' }}>
                <img src="/images/page-jets-charter.webp" alt="Private jet above clouds" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Right — text */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="stitch-label" style={{ color: '#e8b000', marginBottom: 32 }}>
                  {lang === 'ru' ? 'ИНЖЕНЕРИЯ' : lang === 'de' ? 'DIE TECHNIK' : 'THE ENGINEERING'}
                </span>
                <h2 className="stitch-headline-lg" style={{ color: '#dee1f5', marginBottom: 32 }}>
                  {lang === 'ru' ? 'Тихая тяга' : lang === 'de' ? 'Stiller Antrieb' : 'Silent Propulsion'}
                </h2>
                <p className="stitch-body-lg" style={{ color: 'rgba(222,225,245,0.65)', marginBottom: 48 }}>
                  {lang === 'ru'
                    ? 'Используя турбинные технологии нового поколения, наши воздушные суда развивают крейсерскую скорость в почти полной тишине. Речь идёт не только о перемещении в пространстве, но о сохранении тишины путешествия.'
                    : lang === 'de'
                    ? 'Mit Turbinentechnologie der nächsten Generation erreichen unsere Flugzeuge Reisegeschwindigkeit in nahezu totaler Stille. Es geht nicht nur darum, sich durch den Raum zu bewegen, sondern die Stille der Reise zu bewahren.'
                    : 'Utilizing next-generation turbine technology, our aircraft achieve cruise speeds in near-total silence. It is not just about moving through space, but about preserving the silence of the journey.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { label: lang === 'ru' ? 'УРОВЕНЬ ШУМА В САЛОНЕ' : lang === 'de' ? 'GERÄUSCHPEGEL IN DER KABINE' : 'CABIN SOUND LEVEL', value: '48 dB' },
                    { label: lang === 'ru' ? 'ВОЗДУШНЫЙ ФИЛЬТР' : lang === 'de' ? 'LUFTFILTRATION' : 'AIR FILTRATION', value: 'HEPA-MAX 4' },
                    { label: lang === 'ru' ? 'СВЯЗЬ' : lang === 'de' ? 'KONNEKTIVITÄT' : 'CONNECTIVITY', value: 'KA-BAND SAT' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '18px 0' }}>
                      <span className="stitch-label" style={{ color: 'rgba(222,225,245,0.4)' }}>{row.label}</span>
                      <span className="stitch-label" style={{ color: '#e8b000' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <style>{`
            .ptc-silent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px,6vw,96px); align-items: center; }
            @media (max-width: 800px) { .ptc-silent-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        <div id="contact" style={{ background: 'rgb(31,75,133)' }}>
          <PlanTripSection
            locale={lang}
            submitLabel={lang === 'ru' ? 'Запланировать моё путешествие' : lang === 'de' ? 'Flug anfragen' : 'Plan My Trip'}
          />
        </div>

        <div style={{ background: '#1f4b85', textAlign: 'center', padding: '32px 24px', borderBottom: '7px solid #1f4b85' }}>
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
        .ptc-gallery-img { transition: transform 0.5s ease; }
        .ptc-gallery-img:hover { transform: scale(1.05); }
        @keyframes ptc-bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(5px); } }
        @media (max-width: 1199px) { .ptc-page-bg { background-attachment: scroll !important; } }
        .ptc-back-link:hover { color: #fff !important; }
      `}</style>
    </>
  )
}
