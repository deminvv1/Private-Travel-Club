import type { Metadata } from 'next'
import Header from '@/components/Header'
import MobileFooter from '@/components/MobileFooter'
import BackToTop from '@/components/BackToTop'
import WhyUsSection from '@/components/WhyUsSection'
import Link from 'next/link'
import { getT, isValidLocale, DEFAULT_LOCALE, buildAlternates } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)
  return {
    title: t.cookies.title,
    alternates: buildAlternates(lang, '/cookies'),
  }
}

const OVERLAY = 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 50%, rgba(31,75,133,1) 100%)'

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  const t = getT(lang)
  const c = t.cookies

  return (
    <>
      <Header locale={lang} />
      <main>
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: "url('/images/luxurious-travel-des.webp')",
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: OVERLAY }} />

          <div style={{
            position: 'relative', zIndex: 2,
            maxWidth: 860, margin: '0 auto',
            padding: 'clamp(120px,14vw,160px) clamp(24px,5vw,60px) clamp(80px,10vw,120px)',
          }}>
            <Link href={`/${lang}`} style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 12, fontWeight: 500, letterSpacing: '2px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none', display: 'inline-block', marginBottom: 40,
            }}>
              {t.nav.back}
            </Link>

            <h1 style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 700, color: '#fff',
              marginBottom: 48,
            }}>
              {c.title}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {c.sections.map((section, i) => (
                <div key={i}>
                  <h2 style={{
                    fontFamily: 'PTCSans, Arial, sans-serif',
                    fontSize: 'clamp(16px,1.8vw,22px)',
                    fontWeight: 700, color: '#fff',
                    marginBottom: 16,
                  }}>
                    {section.heading}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {section.body.map((paragraph, j) => (
                      <p key={j} style={{
                        fontFamily: 'PTCSans, Arial, sans-serif',
                        fontSize: 'clamp(13px,1.3vw,17px)',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.8,
                      }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <WhyUsSection
          title={t.whyus.title}
          body={t.whyus.body}
          col1={t.whyus.col1}
          col2={t.whyus.col2}
          contactsTitle={t.whyus.contactsTitle}
          address={t.whyus.address}
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