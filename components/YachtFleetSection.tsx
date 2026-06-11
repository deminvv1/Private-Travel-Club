const COPY: Record<string, {
  title: string
  desc: string
  filter: string
  flagship: string
  inquire: string
  length: string
  guests: string
  speed: string
  range: string
  beam: string
  solaris_desc: string
}> = {
  en: {
    title: 'The Curated Fleet',
    desc: 'Each vessel in our collection is selected based on rigorous standards of privacy, nautical performance, and interior avant-garde design.',
    filter: 'FILTER SPECIFICATIONS',
    flagship: 'FLAGSHIP SERIES',
    inquire: 'INQUIRE PRIVATELY',
    length: 'LENGTH',
    guests: 'GUESTS',
    speed: 'SPEED',
    range: 'RANGE',
    beam: 'BEAM',
    solaris_desc: 'The apex of long-range exploration. Solaris II features an ice-class hull and a dedicated submersible launch bay for the truly intrepid.',
  },
  ru: {
    title: 'Избранный флот',
    desc: 'Каждое судно в нашей коллекции отбирается по строгим стандартам конфиденциальности, морских характеристик и авангардного дизайна интерьера.',
    filter: 'ПАРАМЕТРЫ',
    flagship: 'ФЛАГМАНСКАЯ СЕРИЯ',
    inquire: 'ЗАПРОСИТЬ ПРИВАТНО',
    length: 'ДЛИНА',
    guests: 'ГОСТЕЙ',
    speed: 'СКОРОСТЬ',
    range: 'ДАЛЬНОСТЬ',
    beam: 'ШИРИНА',
    solaris_desc: 'Вершина дальних экспедиций. SOLARIS II оснащён ледовым корпусом и отсеком для запуска субмарины для самых бесстрашных.',
  },
  de: {
    title: 'Die kuratierte Flotte',
    desc: 'Jedes Schiff unserer Kollektion wird nach strengen Standards für Privatsphäre, nautische Leistung und avantgardistisches Innendesign ausgewählt.',
    filter: 'SPEZIFIKATIONEN',
    flagship: 'FLAGGSCHIFF-SERIE',
    inquire: 'PRIVAT ANFRAGEN',
    length: 'LÄNGE',
    guests: 'GÄSTE',
    speed: 'GESCHW.',
    range: 'REICHWEITE',
    beam: 'BREITE',
    solaris_desc: 'Der Höhepunkt der Langstreckenexpedition. SOLARIS II verfügt über einen eisgängigen Rumpf und eine dedizierte U-Boot-Startanlage.',
  },
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-hanken)',
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
}

export default function YachtFleetSection({ locale }: { locale: string }) {
  const c = COPY[locale] ?? COPY.en

  return (
    <section style={{ background: '#1f4b85', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* Header row */}
        <div className="ptc-fleet-hdr" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px,5vw,96px)', gap: 40 }}>
          <div style={{ maxWidth: 560 }}>
            <h2 className="stitch-headline-lg" style={{ color: '#fff', marginBottom: 24 }}>{c.title}</h2>
            <p className="stitch-body-md" style={{ color: 'rgba(255,255,255,0.75)' }}>{c.desc}</p>
          </div>
          <button className="ptc-fleet-filter-btn" style={{
            flexShrink: 0, background: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(222,225,245,0.75)',
            fontFamily: 'var(--font-hanken)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '16px 32px', cursor: 'default',
          }}>
            {c.filter}
          </button>
        </div>

        {/* Bento grid */}
        <div className="ptc-fleet-grid">

          {/* Card 1 — AURELIUS V */}
          <div className="ptc-fleet-card" style={{ background: '#0e1321', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
              <img src="/images/yachts-full.webp" alt="AURELIUS V" className="ptc-fleet-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }} />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
                <div>
                  <h4 className="stitch-headline-md" style={{ color: '#fff', marginBottom: 8 }}>AURELIUS V</h4>
                  <p style={{ ...LABEL_STYLE, color: 'rgba(255,255,255,0.4)' }}>OCEANCO | 2023</p>
                </div>

              </div>
              <SpecGrid specs={[
                { label: c.length, value: '115M' },
                { label: c.guests, value: '18' },
                { label: c.speed, value: '22KT' },
              ]} />
            </div>
          </div>

          {/* Card 2 — NOCTURNE */}
          <div className="ptc-fleet-card" style={{ background: '#0e1321', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
              <img src="/images/yachts-salon.webp" alt="NOCTURNE" className="ptc-fleet-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }} />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
                <div>
                  <h4 className="stitch-headline-md" style={{ color: '#fff', marginBottom: 8 }}>NOCTURNE</h4>
                  <p style={{ ...LABEL_STYLE, color: 'rgba(255,255,255,0.4)' }}>FEADSHIP | 2024</p>
                </div>
              </div>
              <SpecGrid specs={[
                { label: c.length, value: '88M' },
                { label: c.guests, value: '12' },
                { label: c.speed, value: '18KT' },
              ]} />
            </div>
          </div>

          {/* Card 3 — SOLARIS II (full width) */}
          <div className="ptc-fleet-card ptc-fleet-card-wide" style={{ gridColumn: 'span 2', background: '#0e1321', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', display: 'flex' }}>
            <div className="ptc-fleet-wide-img" style={{ flex: '0 0 66.66%', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 380 }}>
                <img src="/images/yachts-full-good.webp" alt="SOLARIS II" className="ptc-fleet-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }} />
              </div>
            </div>
            <div style={{ flex: 1, padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ ...LABEL_STYLE, color: '#ffce5a', display: 'block', marginBottom: 16 }}>{c.flagship}</span>
              <h3 className="stitch-headline-lg" style={{ color: '#fff', marginBottom: 24, lineHeight: 1.1 }}>SOLARIS II</h3>
              <p className="stitch-body-md" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 48 }}>{c.solaris_desc}</p>
              <div style={{ marginBottom: 48 }}>
                {([
                  { label: c.range, value: '8,500 NM' },
                  { label: c.beam, value: '14.5 M' },
                ] as { label: string; value: string }[]).map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.12)', padding: '16px 0' }}>
                    <span style={{ ...LABEL_STYLE, color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-hanken)', fontSize: 16, fontWeight: 700, color: '#e8b000' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="ptc-fleet-inquire-btn" style={{
                display: 'block', textAlign: 'center',
                background: '#e8b000', color: '#1a1200',
                fontFamily: 'var(--font-hanken)', fontSize: 12,
                fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '16px 32px', textDecoration: 'none',
              }}>
                {c.inquire}
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .ptc-fleet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .ptc-fleet-card:hover .ptc-fleet-img { transform: scale(1.05); }
        .ptc-fleet-filter-btn { transition: background 0.3s, color 0.3s, border-color 0.3s; }
        .ptc-fleet-filter-btn:hover { background: #e8b000 !important; color: #3f2e00 !important; border-color: #e8b000 !important; }
        .ptc-fleet-inquire-btn { transition: background 0.3s; }
        .ptc-fleet-inquire-btn:hover { background: #d4a000 !important; }
        @media (max-width: 900px) {
          .ptc-fleet-hdr { flex-direction: column !important; align-items: flex-start !important; }
          .ptc-fleet-grid { grid-template-columns: 1fr !important; }
          .ptc-fleet-card-wide { grid-column: span 1 !important; flex-direction: column !important; }
          .ptc-fleet-wide-img { flex: none !important; min-height: 260px !important; }
        }
      `}</style>
    </section>
  )
}



function SpecGrid({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 32 }}>
      {specs.map((spec, i) => (
        <div key={i}>
          <p style={{ fontFamily: 'var(--font-hanken)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{spec.label}</p>
          <p style={{ fontFamily: 'var(--font-hanken)', fontSize: 16, fontWeight: 700, color: '#e8b000' }}>{spec.value}</p>
        </div>
      ))}
    </div>
  )
}
