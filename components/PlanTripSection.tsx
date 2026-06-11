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

export default function PlanTripSection({ locale }: { locale: string }) {
  const copy = COPY[locale] ?? COPY.en

  return (
    <section style={{
      background: '#0e1321',
      padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,80px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="ptc-plantrip-grid">

          <div>
            <span style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#e8b000', display: 'block', marginBottom: 20,
            }}>
              {copy.label}
            </span>
            <h2 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(28px,3.5vw,52px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.15, marginBottom: 24,
            }}>
              {copy.title}
            </h2>
            <p style={{
              fontFamily: 'PTCSans, Arial, sans-serif',
              fontSize: 'clamp(14px,1.3vw,17px)',
              fontWeight: 300, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75, maxWidth: 400,
            }}>
              {copy.sub}
            </p>
          </div>

          <div>
            <ContactForm locale={locale} />
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
