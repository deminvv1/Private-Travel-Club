import ContactForm from './ContactForm'

interface IntroSectionProps {
  title: string
  body: string
  items: string[]
  locale: string
}

export default function IntroSection({ title, body, items, locale }: IntroSectionProps) {
  return (
    <section style={{
      position: 'relative', width: '100%',
      minHeight: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      <div className="ptc-intro-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: "url('/images/luxurious-travel-des.webp')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(to bottom, rgba(31,75,133,1) 0%, rgba(31,75,133,0.65) 55%, rgba(31,75,133,1) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,60px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px,6vw,80px)',
        alignItems: 'start',
      }} className="ptc-intro-grid">

        <div>
          <h2 style={{
            fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 'clamp(22px,2.5vw,32px)',
            fontWeight: 700, color: '#fff', marginBottom: 20,
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 'clamp(13px,1.3vw,22px)',
            fontWeight: 300, color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7, marginBottom: 32,
          }}>
            {body}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item, i) => (
              <li key={i} style={{
                fontFamily: 'PTCSans, Arial, sans-serif',
                fontSize: 'clamp(13px,1.3vw,22px)',
                fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6, marginBottom: 10,
                paddingLeft: 24, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#7aa3d4' }}>❖</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'rgba(10,20,55,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 4,
          padding: 'clamp(24px,3vw,36px)',
        }}>
          <ContactForm locale={locale} />
        </div>
      </div>

    </section>
  )
}
