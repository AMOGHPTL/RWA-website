import { useRef, useEffect, useState } from 'react'

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 9V19L14 25L3 19V9L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 9L19 12V18L14 21L9 18V12L14 9Z" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),
    title: 'Fractional Ownership',
    description: 'Invest in premium assets with as little as $50. Own a verifiable fraction of a Manhattan skyscraper, Swiss gold vault, or toll highway.',
    accent: 'violet',
    delay: 0,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8V14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
      </svg>
    ),
    title: '24/7 Liquidity',
    description: 'Trade your asset tokens any time on our integrated DEX. No lock-up periods, no settlement delays, no market hours.',
    accent: 'cyan',
    delay: 0.08,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 8V6a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="15" r="2.5" fill="currentColor" fillOpacity="0.5"/>
        <path d="M14 17.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Automated Yields',
    description: 'Smart contracts distribute rental income, dividends, and yields directly to your wallet. Completely automated, zero manual work.',
    accent: 'violet',
    delay: 0.16,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14C4 8.477 8.477 4 14 4s10 4.477 10 10-4.477 10-10 10S4 19.523 4 14z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h20M14 4c-2.5 3-4 6.3-4 10s1.5 7 4 10c2.5-3 4-6.3 4-10s-1.5-7-4-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Global Access',
    description: 'Invest in assets across 50+ countries without intermediaries, foreign accounts, or currency risk. Powered by stablecoin rails.',
    accent: 'cyan',
    delay: 0.24,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.5 5 5.5.8-4 3.9.94 5.5L14 15.5l-4.94 2.7.94-5.5L6 8.8l5.5-.8L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 22h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 25h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Institutional Security',
    description: 'Multi-sig wallets, insurance coverage, regular third-party smart contract audits, and cold storage for all underlying assets.',
    accent: 'violet',
    delay: 0.32,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 10h22" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
        <path d="M13 16h7M13 20h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Regulatory Compliant',
    description: 'SEC-compliant securities, built-in KYC/AML, and regulatory approvals across all major jurisdictions. Investor protection first.',
    accent: 'cyan',
    delay: 0.4,
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

export default function Features() {
  const { ref, visible } = useReveal()

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#f4f2fa]">
      <div className="orb w-[500px] h-[500px] bg-violet-400/[0.1] top-0 right-0" />
      <div className="orb w-[400px] h-[400px] bg-sky-400/[0.07] bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="badge inline-flex mb-5">Platform Features</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            Why Choose <span className="text-gradient">ScripFi</span>?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We've reimagined what it means to invest in real-world assets —
            making it accessible, liquid, and radically transparent.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className={`feature-card p-7 reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${f.delay}s` }}
            >
              <div className={`mb-5 ${f.accent === 'violet' ? 'text-violet-500' : 'text-sky-500'}`}>
                {f.icon}
              </div>
              <h3 className="text-slate-900 font-semibold text-lg mb-2.5">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
