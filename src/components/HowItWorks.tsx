import { useRef, useEffect, useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Connect Your Wallet',
    description: 'Link MetaMask, Coinbase Wallet, or create a custodial account in minutes. Complete KYC verification in under 5 minutes.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 17a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Browse Verified Assets',
    description: 'Explore our curated catalog of tokenized real-world assets. Filter by type, yield, geography, risk rating, and minimum investment.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 14h6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Purchase Tokens',
    description: 'Buy fractional ownership tokens with crypto or fiat. On-chain settlement in minutes, not the 5–10 business days of traditional finance.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 9v2m0 10v2M12 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 13c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Earn & Trade',
    description: 'Receive automated yield distributions every month. Trade tokens instantly on our DEX for liquidity whenever you need it.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 22L11 16l5 4 5-7 5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="26" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23.5 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function HowItWorks() {
  const { ref, visible } = useReveal()

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f7ff 0%, #f0ecff 50%, #f8f7ff 100%)' }}>
      <div className="orb w-[600px] h-[600px] bg-violet-400/[0.12] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 reveal ${visible ? 'visible' : ''}`}>
          <div className="badge inline-flex mb-5">Simple Process</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            Start Investing in <span className="text-gradient">4 Steps</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            From zero to tokenized asset investor in under 10 minutes. No broker needed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[52px] left-[14%] right-[14%] pointer-events-none">
            <div className="h-px bg-gradient-to-r from-violet-500/40 via-sky-500/40 to-violet-500/40 w-full" />
            {/* Dots at each step midpoint */}
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col items-center text-center reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Circle */}
              <div className="relative z-10 mb-6">
                <div className="w-[56px] h-[56px] rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center mx-auto shadow-lg glow-purple">
                  <span className="text-white font-bold text-xs tracking-widest">{step.number}</span>
                </div>
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 w-full hover:border-violet-500/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
                <div className="text-violet-600 flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-slate-900 font-semibold text-base mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Mobile arrow */}
              {i < STEPS.length - 1 && (
                <div className="lg:hidden text-violet-500/40 my-2">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
