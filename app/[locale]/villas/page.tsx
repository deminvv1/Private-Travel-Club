import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import BackToTop from '@/components/BackToTop'
import MobileFooter from '@/components/MobileFooter'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'
import WhyUsSection from '@/components/WhyUsSection'

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

const gallery = [
  { src: '/images/tild3165-3461-4733-b936-333464396562__chalet-zermatt-peak-.jpg', alt: 'Luxury chalet in Zermatt — exclusive villa rental by Private Travel Club' },
  { src: '/images/chalet-evening-lit.webp', alt: 'Evening illuminated luxury chalet — premium villa rental' },
  { src: '/images/tild6564-6463-4534-b638-303337306364__luxusvilla-stokovci-.jpg', alt: 'Luxury villa with pool — exclusive accommodation Private Travel Club' },
]

const OVERLAY = 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 50%, rgba(31,75,133,1) 100%)'

export default async function VillasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const translations = getT(lang)
  const t = translations.villasPage

  return (
    <>
      <Header locale={lang} />
      <main>
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/bora-bora-french-pol.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(10px,1.1vw,13px)', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>{t.tagline}</p>
            <h1 style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(34px,5vw,64px)', fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1.15, marginBottom: 20 }}>{t.title}</h1>
            <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(14px,1.5vw,20px)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 40 }}>{t.subtitle}</p>
            <a href="#contact" className="ptc-cta-btn">{t.cta}</a>
          </div>
          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, animation: 'ptc-bounce 2s ease-in-out infinite' }}>
              <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/tild3165-3461-4733-b936-333464396562__chalet-zermatt-peak-.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
          <div className="ptc-page-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,60px)' }}>
            <h2 style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 12 }}>{t.featuresTitle}</h2>
            <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.7, margin: '0 auto 60px', maxWidth: 640 }}>{t.featuresSub}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {t.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ color: '#e8b000', fontSize: 20, lineHeight: 1.4, flexShrink: 0 }}>❖</span>
                  <div>
                    <h3 style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/tild6564-6463-4534-b638-303337306364__luxusvilla-stokovci-.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
          <div className="ptc-page-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
            <h2 style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 48 }}>{t.galleryTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {gallery.map((photo, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 520px) 100vw, (max-width: 780px) 50vw, 33vw" className="ptc-gallery-img" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('/images/tild3165-3461-4733-b936-333464396562__chalet-zermatt-peak-.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
          <div className="ptc-page-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: OVERLAY }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 540, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,40px)' }}>
            <h2 style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 12 }}>{t.contactTitle}</h2>
            <p style={{ fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.7, marginBottom: 40 }}>{t.contactSub}</p>
            <div style={{ background: 'rgba(10,20,55,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', borderRadius: 4, padding: 'clamp(24px,3vw,36px)' }}>
              <ContactForm locale={lang} />
            </div>
          </div>
        </section>

        <div style={{ background: '#1f4b85', textAlign: 'center', padding: '32px 24px' }}>
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
        .ptc-cta-btn { border-radius: 10px; display: inline-block; background: #e8b000; color: #fff; font-family: PTCSans, Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; text-decoration: none; transition: background 0.2s; }
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
