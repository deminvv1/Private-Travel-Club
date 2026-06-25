import { getT } from '@/lib/i18n'

export default function AboutSection({ locale }: { locale: string }) {
  const t = getT(locale)
  const { title, body, items } = t.intro

  return (
    <section id="about" style={{
      background: '#1f4b85',
    }}>
      <div style={{
        maxWidth: 1300, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)',
      }}>
        <h2 className="stitch-headline-lg" style={{ color: '#fff', marginBottom: 24 }}>
          {title}
        </h2>
        <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 48, maxWidth: 720 }}>
          {body}
        </p>

        <div className="ptc-about-items">
          {items.map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ color: '#e8b000', fontSize: 18, lineHeight: '1.6', flexShrink: 0 }}>❖</span>
              <span className="stitch-body-md" style={{ color: '#fff', fontWeight: 600 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ptc-about-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px 60px;
        }
        @media (max-width: 600px) {
          .ptc-about-items { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
