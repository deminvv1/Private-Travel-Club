import type { Metadata } from "next";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import MobileFooter from "@/components/MobileFooter";
import PlanTripSection from "@/components/PlanTripSection";
import Link from "next/link";
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from "@/lib/i18n";
import WhyUsSection from "@/components/WhyUsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getT(lang);
  return {
    title: t.conciergePage.title,
    description: t.conciergePage.metaDescription,
    alternates: buildAlternates(lang, '/concierge'),
  };
}

const LABEL_STYLE = {
  fontFamily: 'var(--font-hanken)',
  fontSize: 11 as const,
  fontWeight: 600 as const,
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
}

const CATS: Record<string, string[]> = {
  en: ['Curation', 'Access', 'Privacy'],
  ru: ['Кураторство', 'Доступ', 'Конфиденциальность'],
  de: ['Kuration', 'Zugang', 'Privatsphäre'],
}

export default async function ConciergePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const translations = getT(lang)
  const t = translations.conciergePage

  return (
    <>
      <Header locale={lang} />
      <main>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/concierge-page.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(31,75,133,0.8)' }} />
          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(120px,14vw,160px) clamp(24px,6vw,100px) 80px', maxWidth: 900, width: '100%', margin: '0 auto', textAlign: 'center' }}>
            <p className="stitch-label" style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>{t.tagline}</p>
            <h1 className="stitch-display" style={{ color: '#fff', marginBottom: 24 }}>{t.title}</h1>
            <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>{t.subtitle}</p>
            <a href="#contact" className="ptc-cta-btn">{t.cta}</a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, #0e1321)' }} />
          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, animation: 'ptc-bounce 2s ease-in-out infinite' }}>
              <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ── INTRO — 2-col ── */}
        <section style={{ background: '#0e1321', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }} className="ptc-conc-intro">
            <div>
              <h2 className="stitch-headline-lg" style={{lineHeight: 1.15 }}>
                {lang === 'ru' ? <>Определяется<br />дискрецией.</> : lang === 'de' ? <>Definiert durch<br />Diskretion.</> : <>Defined by<br />Discretion.</>}
              </h2>
            </div>
            <div>
              <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {lang === 'ru'
                  ? 'Наш консьерж — это не стойка в лобби. Это глобальная сеть фиксеров, кураторов и специалистов, работающих исключительно для наших клиентов. От бронирования мест в закрытых мишленовских заведениях до организации частных открытий галерей после закрытия — мы управляем логистикой роскоши.'
                  : lang === 'de'
                  ? 'Unser Concierge ist kein Empfangstresen. Es ist ein globales Netzwerk aus Fixern, Kuratoren und Spezialisten, die ausschließlich unseren Klienten gewidmet sind. Von der Sicherung von Reservierungen in Michelin-Enklaven bis zur Orchestrierung privater Galerieeröffnungen nach Ladenschluss — wir handhaben die Logistik des Luxus.'
                  : 'Our concierge is not a desk in a lobby; it is a global network of fixers, curators, and specialists dedicated to our clients. From securing off-menu reservations at Michelin-starred enclaves to orchestrating private gallery openings after hours, we handle the logistics of luxury.'}
              </p>
            </div>
          </div>
        </section>

        {/* ── FEATURE CARDS ── */}
        <section style={{ background: '#0e1321', paddingBottom: 'clamp(80px,10vw,120px)', paddingLeft: 'clamp(24px,4vw,80px)', paddingRight: 'clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }} className="ptc-conc-cards">
            {t.features.map((f, i) => {
              const cats = CATS[lang] ?? CATS.en
              const cat = cats[i] ?? ''
              return (
                <div key={i} className="ptc-conc-card" style={{
                  background: '#1f4b85',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderLeft: i > 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  padding: 'clamp(32px,4vw,64px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 450,
                }}>
                  <div>
                    <span style={{ ...LABEL_STYLE, color: '#ffce5a', display: 'block', marginBottom: 32 }}>
                      {String(i + 1).padStart(2, '0')}{cat ? ` / ${cat}` : ''}
                    </span>
                    <h3 className="stitch-headline-md" style={{ color: '#fff', marginBottom: 24 }}>{f.title}</h3>
                    <p className="stitch-body-md">{f.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── QUOTE SECTION ── */}
        <section style={{ position: 'relative', height: 530, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src="/images/glov.webp"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28)' }}
            />
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to bottom, #0e1321, transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, rgb(31,75,133))' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 clamp(24px,4vw,80px)' }}>
            <h2 className="stitch-display" style={{ color: '#fff', fontStyle: 'italic', lineHeight: 1.2, fontSize: 'clamp(24px, 3vw, 42px)' }}>
              {lang === 'ru'
                ? '"Настоящая роскошь — не в том, что вы имеете, а в том, о чём вам не нужно думать."'
                : lang === 'de'
                ? '"Echter Luxus liegt nicht in dem, was Sie besitzen, sondern in dem, worüber Sie nie nachdenken müssen."'
                : '"True luxury is not about what you have, but what you never have to think about."'}
            </h2>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <div id="contact" style={{ background: 'rgb(31,75,133)' }}>
          <PlanTripSection
            locale={lang}
            label={lang === 'ru' ? 'Консьерж-Сервис' : lang === 'de' ? 'Concierge-Service' : 'Concierge Private Service'}
            title={lang === 'ru' ? 'Персональный менеджер.' : lang === 'de' ? 'Dedizierte Betreuung.' : 'Dedicated Management.'}
            sub={
              lang === 'ru'
                ? 'Поделитесь деталями — мы закрепим за вами личного менеджера, который создаст исключительный опыт, полностью подстроенный под вас.'
                : lang === 'de'
                ? 'Teilen Sie uns Ihre Angaben mit — wir stellen Ihnen einen persönlichen Manager zur Seite, der ein außergewöhnliches, auf Sie zugeschnittenes Erlebnis gestaltet.'
                : 'Share your details and we\'ll assign a dedicated manager to curate an extraordinary experience tailored entirely to you.'
            }
            submitLabel={lang === 'ru' ? 'Запросить консьерж-сервис' : lang === 'de' ? 'Concierge anfragen' : 'Access Concierge'}
          />
        </div>

        {/* ── BACK ── */}
        <div style={{ background: '#1f4b85', textAlign: 'center', padding: '32px 24px', borderBottom: '5px solid #1f4b85' }}>
          <Link
            href={`/${lang}`}
            className="ptc-back-link"
            style={{ fontFamily: 'var(--font-hanken)', fontSize: 13, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
          >
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
        .ptc-cta-btn { display: inline-block; background: #e8b000; color: #ffffff; font-family: var(--font-hanken); font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 40px; text-decoration: none; transition: background 0.2s; }
        .ptc-cta-btn:hover { background: #d4a000; }
        .ptc-gallery-img { transition: transform 0.5s ease; }
        .ptc-gallery-img:hover { transform: scale(1.05); }
        @keyframes ptc-bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(5px); } }
        .ptc-back-link:hover { color: #fff !important; }
        .ptc-conc-intro { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(40px,6vw,100px); align-items: end; }
        .ptc-conc-cards { display: grid; grid-template-columns: repeat(3,1fr); }
        .ptc-conc-card { transition: background 0.3s; }
        .ptc-conc-card:hover { background: #255699 !important; }
        .ptc-conc-gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 900px) {
          .ptc-conc-intro { grid-template-columns: 1fr !important; }
          .ptc-conc-cards { grid-template-columns: 1fr !important; }
          .ptc-conc-card { border-left: 1px solid rgba(255,255,255,0.12) !important; border-top: none !important; }
          .ptc-conc-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
