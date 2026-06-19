import { useRef, useEffect, useState } from 'react'

const ASSETS = [
  {
    emoji: '🏢',
    name: 'Real Estate',
    description: 'Prime commercial & residential properties across global tier-1 cities.',
    apy: '7–11%',
    tag: 'High Demand',
    tagColor: 'text-amber-700 bg-amber-500/10 border-amber-500/25',
    available: true,
  },
  {
    emoji: '🪙',
    name: 'Precious Metals',
    description: 'Gold, silver, and platinum tokens backed by vaulted physical assets.',
    apy: '6–10%',
    tag: 'Safe Haven',
    tagColor: 'text-yellow-700 bg-yellow-500/10 border-yellow-500/25',
    available: false,
  },
  {
    emoji: '⚡',
    name: 'Infrastructure',
    description: 'Toll roads, energy grids, data centers, and utility assets.',
    apy: '9–11%',
    tag: 'Stable Income',
    tagColor: 'text-orange-700 bg-orange-500/10 border-orange-500/25',
    available: false,
  },
  {
    emoji: '📊',
    name: 'Private Credit',
    description: 'Corporate loans, structured finance, and revenue-based lending.',
    apy: '10–12%',
    tag: 'High Yield',
    tagColor: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/25',
    available: false,
  },
  {
    emoji: '🎨',
    name: 'Art & Collectibles',
    description: 'Blue-chip fine art, rare wine, luxury watches, and vintage cars.',
    apy: '5–11%',
    tag: 'Alternative',
    tagColor: 'text-pink-700 bg-pink-500/10 border-pink-500/25',
    available: false,
  },
  {
    emoji: '🌱',
    name: 'Carbon Credits',
    description: 'Verified carbon offsets, reforestation, and green infrastructure.',
    apy: '5–15%',
    tag: 'ESG Focus',
    tagColor: 'text-teal-700 bg-teal-500/10 border-teal-500/25',
    available: false,
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
    <section id="assets" ref={ref} className="bg-[#E9E5DA] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header — matches the Showcase / Roadmap header treatment */}
        <div className={`text-center mb-14 reveal ${visible ? 'visible' : ''}`}>
          <div className="badge-charcoal inline-flex mb-3">Asset Classes</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26241f] mb-2 tracking-tight">
            Tokenize the <span className="text-[#6b675c]">Real Economy</span>
          </h2>
          <p className="text-[#57544a] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From Manhattan skyscrapers to Swiss gold vaults, ScripFi tokenizes the
            assets that drive the global economy — all on-chain.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSETS.map((asset, i) => (
            <div
              key={asset.name}
              className={`relative rounded-2xl p-6 overflow-hidden reveal ${visible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${i * 0.07}s`,
                background: '#ede5cc',
                boxShadow: '0 2px 8px rgba(45,40,28,0.06), 0 12px 32px rgba(45,40,28,0.09)',
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl leading-none">{asset.emoji}</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${asset.tagColor}`}>
                  {asset.tag}
                </span>
              </div>
              <h3 className="text-[#26241f] font-bold text-lg mb-2 tracking-tight">{asset.name}</h3>
              <p className="text-[#57544a] text-sm mb-5 leading-relaxed">{asset.description}</p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(55,50,35,0.12)' }}>
                <span className="text-[#8a8576] text-xs font-medium uppercase tracking-wider">Expected APY</span>
                <span className="text-[#b45309] font-bold text-sm">{asset.apy}</span>
              </div>

              {/* Coming Soon overlay */}
              {!asset.available && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(233,229,218,0.4)', backdropFilter: 'blur(0.5px)', WebkitBackdropFilter: 'blur(0.5px)' }}
                >
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#26241f] tracking-tight"
                    style={{ background: '#ede5cc', border: '1px solid rgba(55,50,35,0.18)', boxShadow: '0 6px 18px rgba(45,40,28,0.14)' }}
                  >
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[#8a8576] text-xs mt-8">
          * Expected APY ranges are indicative and vary by specific asset. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  )
}
