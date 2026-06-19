import { useRef, useEffect, useState, type ReactNode } from 'react'

type Step = {
  number: string
  title: string
  description: string
  icon: ReactNode
}

const INVESTOR_STEPS: Step[] = [
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

const OWNER_STEPS: Step[] = [
  {
    number: '01',
    title: 'Submit Your Asset',
    description: 'Share ownership documents, valuation, and asset details. Our team reviews title, legal standing, and compliance requirements.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 5h12l6 6v16a1 1 0 01-1 1H8a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M19 5v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 18h8M12 22h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Verification & Legal Wrap',
    description: 'Independent appraisal and a compliant legal structure so your real-world asset is securely and lawfully represented on-chain.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l10 4v7c0 6.5-4.3 10.8-10 13-5.7-2.2-10-6.5-10-13V8l10-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11.5 16l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Mint Asset Tokens',
    description: 'Your asset is fractionalized into compliant tokens. You set the supply, price per token, and yield terms for investors.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 5v3M16 24v3M5 16h3M24 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'List & Raise Capital',
    description: 'Go live on the marketplace, raise from global investors, and manage payouts and disclosures from a single dashboard.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M5 27h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="7" y="16" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="11" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="21" y="6" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

function StepFlow({ steps, visible, dark = false }: { steps: Step[]; visible: boolean; dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-5 relative">
      {/* Desktop connector line */}
      <div className="hidden lg:block absolute top-[23px] left-[14%] right-[14%] pointer-events-none">
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(217,119,6,0), rgba(217,119,6,0.45), rgba(217,119,6,0))' }} />
      </div>

      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`flex flex-col items-center text-center reveal ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: `${i * 0.12}s` }}
        >
          {/* Number node */}
          <div className="relative z-10 mb-6">
            {dark ? (
              // Amber-filled node for the owner (dark) track
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-gradient-to-br from-amber-400 to-amber-600"
                style={{ boxShadow: '0 0 0 5px rgba(245,158,11,0.14), 0 6px 18px rgba(217,119,6,0.4)' }}
              >
                <span className="font-bold text-sm text-[#1c1913]">{step.number}</span>
              </div>
            ) : (
              // Cream node for the investor (light) track
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{
                  background: '#ede5cc',
                  border: '1px solid rgba(55,50,35,0.18)',
                  boxShadow: '0 4px 14px rgba(45,40,28,0.10)',
                }}
              >
                <span className="font-bold text-sm text-[#b45309]">{step.number}</span>
              </div>
            )}
          </div>

          {/* Card */}
          {dark ? (
            <div
              className="rounded-2xl p-6 w-full flex-1 transition-transform duration-300 hover:-translate-y-1.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,231,210,0.12)' }}
            >
              <div className="text-amber-400 flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-[#f2ecdd] font-bold text-base mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[#b3ad9d] text-sm leading-relaxed">{step.description}</p>
            </div>
          ) : (
            <div
              className="rounded-2xl p-6 w-full flex-1 transition-transform duration-300 hover:-translate-y-1.5"
              style={{ background: '#ede5cc', boxShadow: '0 2px 8px rgba(45,40,28,0.06), 0 12px 32px rgba(45,40,28,0.09)' }}
            >
              <div className="text-[#b45309] flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-[#26241f] font-bold text-base mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[#57544a] text-sm leading-relaxed">{step.description}</p>
            </div>
          )}

          {/* Mobile arrow */}
          {i < steps.length - 1 && (
            <div className={`lg:hidden my-2 ${dark ? 'text-amber-400/50' : 'text-amber-600/40'}`}>↓</div>
          )}
        </div>
      ))}
    </div>
  )
}

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
  const investors = useReveal()
  const owners = useReveal()

  return (
    <section id="how-it-works" className="bg-[#E9E5DA] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* For investors */}
        <div ref={investors.ref}>
          <div className={`text-center mb-14 reveal ${investors.visible ? 'visible' : ''}`}>
            <div className="badge-charcoal inline-flex mb-3">For Investors</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#26241f] mb-2 tracking-tight">
              Start Investing in <span className="text-[#6b675c]">4 Steps</span>
            </h2>
            <p className="text-[#57544a] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              From zero to tokenized asset investor in under 10 minutes. No broker needed.
            </p>
          </div>
          <StepFlow steps={INVESTOR_STEPS} visible={investors.visible} />
        </div>

        {/* For asset owners — inverted dark panel so it clearly reads as a separate path */}
        <div
          ref={owners.ref}
          className="mt-20 rounded-[28px] px-5 py-16 sm:px-10 sm:py-20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #2b2620 0%, #211d18 100%)',
            boxShadow: '0 30px 70px rgba(28,24,17,0.28)',
          }}
        >
          <div className="orb w-[420px] h-[420px] bg-amber-500/[0.10] top-0 right-0 translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10">
            <div className={`text-center mb-14 reveal ${owners.visible ? 'visible' : ''}`}>
              <div
                className="inline-flex items-center gap-2 mb-3 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[0.02em]"
                style={{ background: 'rgba(245,231,210,0.08)', border: '1px solid rgba(245,231,210,0.18)', color: '#e7dec9' }}
              >
                For Asset Owners
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f2ecdd] mb-2 tracking-tight">
                Tokenize Your Asset in <span className="text-amber-400">4 Steps</span>
              </h2>
              <p className="text-[#b3ad9d] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Turn real estate, art, or any real-world asset into compliant on-chain tokens and unlock global liquidity.
              </p>
            </div>
            <StepFlow steps={OWNER_STEPS} visible={owners.visible} dark />
          </div>
        </div>
      </div>
    </section>
  )
}
