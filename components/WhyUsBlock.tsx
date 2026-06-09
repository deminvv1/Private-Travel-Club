interface WhyUsBlockProps {
  heading: string
  body: string
}

export function WhyUsBlock({ heading, body }: WhyUsBlockProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4 block">
            Private Travel Club
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-snug mb-8">
            {heading}
          </h2>
        </div>
        <div>
          <p className="text-stone-600 leading-relaxed text-lg">{body}</p>
          <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
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
      <div className="w-8 h-px bg-stone-900 mb-3" />
      <p className="text-xs text-stone-500 leading-relaxed">{label}</p>
    </div>
  )
}
