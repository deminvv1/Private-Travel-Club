import Image from 'next/image'
import Link from 'next/link'

interface WhyUsSectionProps {
  title: string
  body: string
  col1: string[]
  col2: string[]
  contactsTitle: string
  hideHeader?: boolean
  noBackground?: boolean
  address?: string
  email: string
  phone: string
  phoneTel: string
  whatsapp: string
  whatsappLink: string
  instagram: string
  instagramLink: string
  locale: string
  nav: { villas: string; yachts: string; jets: string; concierge: string; navigationTitle: string; privacyPolicy: string; cookiePolicy: string; impressum: string }
}

export default function WhyUsSection({
  title, body, col1, col2, contactsTitle,
  address, email, phone, phoneTel,
  whatsapp, whatsappLink, instagram, instagramLink,
  locale, nav, hideHeader = false, noBackground = false,
}: WhyUsSectionProps) {
  const contacts = [
    { icon: '/images/tild6338-6432-4131-b064-313838333833__call.svg', text: phone, href: phoneTel },
    { icon: '/images/tild3330-3064-4430-a236-636435613633__whatsapp-logo.svg', text: whatsapp, href: whatsappLink },
    { icon: '/images/tild3734-6262-4535-b331-303738623866__instagram-logo.svg', text: instagram, href: instagramLink },
  ]

  const navLinks = [
    { label: nav.jets, href: `/${locale}/jets` },
    { label: nav.yachts, href: `/${locale}/yachts` },
    { label: nav.villas, href: `/${locale}/villas` },
    { label: nav.concierge, href: `/${locale}/concierge` },
  ]

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', background: 'rgb(31,75,133)' }}>
      {noBackground ? (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgb(31,75,133) 0%, rgba(31,75,133,0.65) 50%, rgb(31,75,133) 100%)',
        }} />
      ) : (
        <>
          <div className="ptc-whyus-bg" style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: "url('/images/tild6638-6537-4132-a666-383131626462__istock-964566894.webp')",
            backgroundSize: 'cover', backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }} />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            backgroundImage: 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 50%, rgba(31,75,133,1) 100%)',
          }} />
        </>
      )}

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1300, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)',
      }}>
        {!hideHeader && (
          <>
            <h2 style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(22px,2.8vw,38px)',
              fontWeight: 700, color: '#fff', marginBottom: 18,
            }}>
              {title}
            </h2>
            <p style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(17px,1.4vw,20px)',
              fontWeight: 300, color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7, marginBottom: 56, maxWidth: 680,
            }}>
              {body}
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '14px 60px', marginBottom: 80,
            }} className="ptc-whyus-benefits">
              {col1.map((item, i) => <BenefitItem key={'a' + i} text={item} />)}
              {col2.map((item, i) => <BenefitItem key={'b' + i} text={item} />)}
            </div>
          </>
        )}

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
        }} className="ptc-whyus-contacts">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(22px,2.5vw,34px)',
              fontWeight: 700, fontStyle: 'italic',
              color: '#fff'
            }}>
              {locale === 'ru' ? 'Услуги' : locale === 'de' ? 'Leistungen' : 'Services'}
            </p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ptc-footer-nav-link" style={{
                fontFamily: 'PTCSans, Arial, sans-serif',
                fontSize: 13, fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(22px,2.5vw,34px)',
              fontWeight: 700, fontStyle: 'italic',
              color: '#fff', marginBottom: 4,
            }}>
              {locale === 'ru' ? 'Направления' : locale === 'de' ? 'Reiseziele' : 'Destinations'}
            </p>
            {[
              { slug: 'maldives',    en: 'Maldives',   ru: 'Мальдивы',  de: 'Malediven' },
              { slug: 'greece',      en: 'Greece',     ru: 'Греция',    de: 'Griechenland' },
              { slug: 'italy',       en: 'Italy',      ru: 'Италия',    de: 'Italien' },
              { slug: 'switzerland', en: 'Switzerland',ru: 'Швейцария', de: 'Schweiz' },
              { slug: 'seychelles',  en: 'Seychelles', ru: 'Сейшелы',   de: 'Seychellen' },
            ].map(({ slug, en, ru, de }) => (
              <Link key={slug} href={`/${locale}/destinations/${slug}`} className="ptc-footer-nav-link" style={{
                fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13, fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s',
              }}>
                {locale === 'ru' ? ru : locale === 'de' ? de : en}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.65)', margin: '4px 0' }} />
            {[
              { slug: 'dubai',          en: 'Dubai',          ru: 'Дубай',          de: 'Dubai' },
              { slug: 'french-riviera', en: 'French Riviera', ru: 'Лазурный берег', de: 'Côte d\'Azur' },
              { slug: 'cappadocia',     en: 'Cappadocia',     ru: 'Каппадокия',     de: 'Kappadokien' },
            ].map(({ slug, en, ru, de }) => (
              <Link key={slug} href={`/${locale}/destinations/${slug}`} className="ptc-footer-nav-link" style={{
                fontFamily: 'PTCSans, Arial, sans-serif', fontSize: 13, fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s',
              }}>
                {locale === 'ru' ? ru : locale === 'de' ? de : en}
              </Link>
            ))}
          </nav>

          <div>
            <h3 style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(22px,2.5vw,34px)',
              fontWeight: 700, fontStyle: 'italic',
              color: '#fff', marginBottom: 24,
            }}>
              {contactsTitle}
            </h3>
            <p style={{ ...textStyle, marginBottom: 4 }}>Private Travel Club</p>
            {address && <p style={{ ...textStyle, marginBottom: 4 }}>{address}</p>}
            <a href={`mailto:${email}`} style={{
              ...textStyle, color: '#7aa3d4',
              borderBottom: '1px solid rgba(122,163,212,0.3)', transition: 'color 0.2s',
            }}>
              {email}
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
            {contacts.map((c, i) => (
              <a key={i} href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="ptc-contact-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  fontFamily: 'PTCSans, Arial, sans-serif',
                  fontSize: 17, fontWeight: 400, color: '#fff',
                }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Image src={c.icon} alt="" width={28} height={28} />
                  {locale === 'ru' && i === 2 && (
                    <span style={{
                      position: 'absolute', top: -5, right: -6,
                      fontSize: 15, lineHeight: 1,
                      color: 'rgb(232,176,0)',
                      fontWeight: 700,
                    }}>*</span>
                  )}
                </div>
                {c.text}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          marginTop: 56, paddingTop: 24,
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <div>
            <p style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 12, fontWeight: 300,
              color: 'rgba(255,255,255,0.3)',
            }}>
              © {new Date().getFullYear()} Private Travel Club
            </p>
            {locale === 'ru' && (
              <p style={{
                fontFamily: 'PTCSans, Arial, sans-serif',
                fontSize: 11, fontWeight: 300,
                color: 'rgba(255,255,255,0.25)',
                marginTop: 6, maxWidth: 480,
              }}>
                <span style={{ color: 'rgb(232,176,0)' }}>*</span> Instagram — продукт компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href={`/${locale}/privacy`} className="ptc-footer-nav-link" style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 12, fontWeight: 400,
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}>
              {nav.privacyPolicy}
            </Link>
            <Link href={`/${locale}/impressum`} className="ptc-footer-nav-link" style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 12, fontWeight: 400,
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}>
              {nav.impressum}
            </Link>
            <Link href={`/${locale}/cookies`} className="ptc-footer-nav-link" style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 12, fontWeight: 400,
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}>
              {nav.cookiePolicy}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1199px) { .ptc-whyus-bg { background-attachment: scroll !important; } }
        .ptc-contact-link { opacity: 0.85; transition: opacity 0.2s; }
        .ptc-contact-link:hover { opacity: 1; }
        .ptc-footer-nav-link:hover { color: rgba(255,255,255,0.9) !important; }
      `}</style>
    </section>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span style={{ color: '#e8b000', fontSize: 16, lineHeight: 1.6, flexShrink: 0 }}>❖</span>
      <span style={{
        fontFamily: 'PTCSans, Arial, sans-serif',
        fontSize: 'clamp(15px,1.3vw,18px)',
        fontWeight: 600, color: '#fff', lineHeight: 1.6,
      }}>
        {text}
      </span>
    </div>
  )
}

const textStyle: React.CSSProperties = {
  fontFamily: 'PTCSans, Arial, sans-serif',
  fontSize: 17, fontWeight: 300,
  color: 'rgba(255,255,255,0.8)', lineHeight: 1.65,
}
