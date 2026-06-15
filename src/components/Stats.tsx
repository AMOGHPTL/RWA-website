import { useRef, useEffect, useState } from 'react'

const STATS = [
  {
    value: '$10T+',
    label: 'Global RWA Market Size',
    sub: 'projected by 2030',
    color: 'text-gradient',
  },
  {
    value: '0.1%',
    label: 'Currently Tokenized',
    sub: 'enormous upside ahead',
    color: 'text-gradient-gold',
  },
  {
    value: '$50',
    label: 'Minimum Investment',
    sub: 'start small, grow big',
    color: 'text-gradient',
  },
  {
    value: '24/7',
    label: 'Trading Availability',
    sub: 'no market hours',
    color: 'text-gradient-green',
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function Stats() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} id="roadmap" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/60 via-transparent to-orange-100/40" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-slate-900 font-medium text-sm sm:text-base mb-1">{stat.label}</div>
              <div className="text-slate-600 text-xs sm:text-sm">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
