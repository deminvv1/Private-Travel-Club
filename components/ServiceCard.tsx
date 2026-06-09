import type { ServiceCard as ServiceCardType } from '@/lib/types'

const icons: Record<ServiceCardType['icon'], JSX.Element> = {
  villa: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  yacht: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M22 18H2a4 4 0 004 4h12a4 4 0 004-4z" />
      <path d="M21 14l-9-10-9 10" />
      <line x1="12" y1="4" x2="12" y2="14" />
    </svg>
  ),
  jet: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 8.2a1 1 0 00-.5 1.7l2.9 2.9L5 16l-2 2 4-1 4-1 2.5 2.5L12 22l2-2 2.2-2.8a1 1 0 00-.4-1z" />
    </svg>
  ),
  helicopter: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2v4M4 6h16M8 6v4a4 4 0 008 0V6M6 14h12l2 6H4l2-6z" />
    </svg>
  ),
  concierge: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2C6.5 2 2 6.5 2 12h20c0-5.5-4.5-10-10-10z" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="12" x2="12" y2="22" />
    </svg>
  ),
  car: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h5l3 4v3h-8V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
}

interface ServiceCardProps {
  title: string
  body: string
  icon: ServiceCardType['icon']
}

export function ServiceCard({ title, body, icon }: ServiceCardProps) {
  return (
    <div className="p-8 border border-stone-200 hover:border-stone-400 transition-colors">
      <div className="text-stone-700 mb-6">{icons[icon]}</div>
      <h3 className="text-lg font-light text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
    </div>
  )
}
