interface WhyUsBlockProps {
  heading: string
  body: string
}

export function WhyUsBlock({ heading, body }: WhyUsBlockProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 12, letterSpacing: '0.2em',
            textTransform: 'uppercase', display: 'block',
            color: 'rgb(232,176,0)', marginBottom: 16, fontWeight: 600,
          }}>
            Private Travel Club
          </span>
          <h2 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(26px,3vw,42px)',
            fontWeight: 400, color: '#fff',
            lineHeight: 1.25, marginBottom: 32,
          }}>
            {heading}
          </h2>
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(14px,1.3vw,18px)',
            fontWeight: 300, color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.75,
          }}>
            {body}
          </p>
          <div style={{
            marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 24, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Stat label="No membership fees" />
            <Stat label="24/7 availability" />
            <Stat label="Full discretion" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label }: { label: string }) {
  return (
    <div>
      <div style={{ width: 32, height: 1, background: '#fff', marginBottom: 12 }} />
      <p style={{
        fontFamily: 'var(--font-hanken)',
        fontSize: 12, fontWeight: 400,
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.6,
      }}>
        {label}
      </p>
    </div>
  )
}
