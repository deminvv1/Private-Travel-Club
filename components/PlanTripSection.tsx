import ContactForm from '@/components/ContactForm'

const COPY: Record<string, { label: string; title: string; sub: string }> = {
  en: {
    label: 'Private Travel Club',
    title: 'Plan My Trip',
    sub: 'Share your details and we\'ll craft a fully personalised VIP experience within a few hours. No templates — your journey, your way.',
  },
  ru: {
    label: 'Private Travel Club',
    title: 'Запланировать поездку',
    sub: 'Поделитесь деталями — ваш персональный менеджер составит индивидуальный VIP-план в течение нескольких часов. Никаких шаблонов — только ваш маршрут.',
  },
  de: {
    label: 'Private Travel Club',
    title: 'Meine Reise planen',
    sub: 'Teilen Sie uns Ihre Details mit und wir erstellen innerhalb weniger Stunden einen vollständig personalisierten VIP-Reiseplan. Keine Vorlagen — Ihre Reise, Ihr Weg.',
  },
}

export default function PlanTripSection({
  locale,
  label: labelOverride,
  title: titleOverride,
  sub: subOverride,
  submitLabel,
}: {
  locale: string
  label?: string
  title?: string
  sub?: string
  submitLabel?: string
}) {
  const base = COPY[locale] ?? COPY.en
  const copy = {
    label: labelOverride ?? base.label,
    title: titleOverride ?? base.title,
    sub: subOverride ?? base.sub,
  }

  return (
    <section style={{
      background: 'linear-gradient(to bottom, rgb(31,75,133) 0%, #0e1321 320px, #0e1321 calc(100% - 320px), rgb(31,75,133) 100%)',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1300, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)',
      }}>
        <div className="ptc-plantrip-grid">

          <div>
            <span className="stitch-label" style={{ color: '#e8b000', display: 'block', marginBottom: 20 }}>
              {copy.label}
            </span>
            <h2 className="stitch-headline-lg" style={{ color: '#fff', marginBottom: 24 }}>
              {copy.title}
            </h2>
            <p className="stitch-body-lg" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 400 }}>
              {copy.sub}
            </p>
          </div>

          <div>
            <ContactForm locale={locale} submitLabel={submitLabel} />
          </div>

        </div>
      </div>

      <style>{`
        .ptc-plantrip-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }
        @media (max-width: 768px) {
          .ptc-plantrip-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
