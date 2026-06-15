import { useRef, useEffect, useState } from 'react'

const ASSETS = [
  {
    emoji: '🏢',
    name: 'Real Estate',
    description: 'Prime commercial & residential properties across global tier-1 cities.',
    apy: '8–12%',
    tag: 'High Demand',
    gradient: 'from-amber-600/20 to-amber-900/5',
    border: 'rgba(245,158,11,0.25)',
    tagColor: 'text-amber-700 bg-amber-500/10 border-amber-500/20',
  },
  {
    emoji: '🪙',
    name: 'Precious Metals',
    description: 'Gold, silver, and platinum tokens backed by vaulted physical assets.',
    apy: '5–9%',
    tag: 'Safe Haven',
    gradient: 'from-amber-600/20 to-amber-900/5',
    border: 'rgba(251,191,36,0.2)',
    tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  },
  {
    emoji: '⚡',
    name: 'Infrastructure',
    description: 'Toll roads, energy grids, data centers, and utility assets.',
    apy: '10–15%',
    tag: 'Stable Income',
    gradient: 'from-orange-600/20 to-orange-900/5',
    border: 'rgba(217,119,6,0.2)',
    tagColor: 'text-orange-700 bg-orange-500/10 border-orange-500/20',
  },
  {
    emoji: '📊',
    name: 'Private Credit',
    description: 'Corporate loans, structured finance, and revenue-based lending.',
    apy: '12–18%',
    tag: 'High Yield',
    gradient: 'from-emerald-600/20 to-emerald-900/5',
    border: 'rgba(52,211,153,0.2)',
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    emoji: '🎨',
    name: 'Art & Collectibles',
    description: 'Blue-chip fine art, rare wine, luxury watches, and vintage cars.',
    apy: '15–25%',
    tag: 'Alternative',
    gradient: 'from-pink-600/20 to-pink-900/5',
    border: 'rgba(244,114,182,0.2)',
    tagColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
  },
  {
    emoji: '🌱',
    name: 'Carbon Credits',
    description: 'Verified carbon offsets, reforestation, and green infrastructure.',
    apy: '20–35%',
    tag: 'ESG Focus',
    gradient: 'from-teal-600/20 to-teal-900/5',
    border: 'rgba(20,184,166,0.2)',
    tagColor: 'text-teal-300 bg-teal-500/10 border-teal-500/20',
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function AssetTypes() {
  const { ref, visible } = useReveal()

  return (
    <section id="assets" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#faf6ee]">
      <div className="orb w-[600px] h-[600px] bg-orange-400/[0.1] -top-20 -right-40" />
      <div className="orb w-[500px] h-[500px] bg-amber-400/[0.1] bottom-0 -left-40" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="badge inline-flex mb-5">Asset Classes</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            Tokenize the <span className="text-gradient">Real Economy</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From Manhattan skyscrapers to Swiss gold vaults, ScripFi tokenizes the
            assets that drive the global economy — all on-chain.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSETS.map((asset, i) => (
            <div
              key={asset.name}
              className={`asset-card bg-gradient-to-br ${asset.gradient} rounded-2xl p-6 reveal ${visible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${i * 0.07}s`,
                border: `1px solid ${asset.border}`,
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl leading-none">{asset.emoji}</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${asset.tagColor}`}>
                  {asset.tag}
                </span>
              </div>
              <h3 className="text-slate-900 font-semibold text-lg mb-2">{asset.name}</h3>
              <p className="text-slate-600 text-sm mb-5 leading-relaxed">{asset.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="text-slate-600 text-xs font-medium uppercase tracking-wider">Expected APY</span>
                <span className="text-green-400 font-bold text-sm">{asset.apy}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-xs mt-8">
          * Expected APY ranges are indicative and vary by specific asset. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  )
}
