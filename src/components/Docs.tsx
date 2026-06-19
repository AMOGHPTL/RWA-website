import { useEffect, useState } from 'react'
import scripFiLogo from '../assets/LogoYellow.svg'

/* ─────────────────────────────────────────────────────────────
   ScripFi Docs — a plain-language guide for investors.
   Explains what you own, the two ways to invest, how it works,
   and why it's safe. Kept deliberately simple; the deeper legal /
   engineering detail lives in internal docs, not here.
   ───────────────────────────────────────────────────────────── */

type Section = { id: string; label: string }

const SECTIONS: Section[] = [
  { id: 'overview', label: 'What is ScripFi?' },
  { id: 'two-ways', label: 'Two ways to invest' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'safety', label: 'Is it safe?' },
  { id: 'faq', label: 'FAQ' },
]

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── Small presentational helpers ─── */

function SectionTitle({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="badge-charcoal inline-flex mb-3">{eyebrow}</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#26241f] tracking-tight mb-5">{title}</h2>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ background: '#ede5cc', boxShadow: '0 2px 8px rgba(45,40,28,0.06), 0 12px 32px rgba(45,40,28,0.09)' }}
    >
      {children}
    </div>
  )
}

function Callout({ tone, title, children }: { tone: 'amber' | 'green'; title: string; children: React.ReactNode }) {
  const accent = tone === 'green' ? '#0f7a5a' : '#b45309'
  const bg = tone === 'green' ? 'rgba(16,122,90,0.06)' : 'rgba(180,83,9,0.06)'
  return (
    <div className="rounded-2xl p-6 border-l-4" style={{ borderColor: accent, background: bg }}>
      <h4 className="font-bold mb-1.5" style={{ color: accent }}>{title}</h4>
      <div className="text-[#57544a] text-sm leading-relaxed">{children}</div>
    </div>
  )
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What am I actually buying?',
    a: "A token tied to a real property. Depending on the option you choose, it represents either a share of ownership in that property or a right to its rental income.",
  },
  {
    q: 'How do I earn money?',
    a: 'You receive a share of the rental income, paid out automatically to your wallet. If the property rises in value, ownership tokens can be worth more too.',
  },
  {
    q: 'Can I sell whenever I want?',
    a: 'The income token can be traded freely at any time. The ownership token is verified-only, so it can be sold to other approved investors.',
  },
  {
    q: 'Do I need a lot of money to start?',
    a: 'No. Properties are split into many small tokens, so you can invest with a small amount and own a fraction.',
  },
  {
    q: 'What do I need to get started?',
    a: 'A crypto wallet (like MetaMask) or a ScripFi account. For ownership tokens you also complete a quick identity check.',
  },
]

export default function Docs() {
  const active = useScrollSpy(SECTIONS.map(s => s.id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#E9E5DA]">
      {/* ── Dark header band ── */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #14142e 0%, #0c0c24 60%, #1c1810 100%)' }}>
        <div className="orb w-[460px] h-[460px] bg-amber-500/[0.12] top-0 right-0 translate-x-1/4 -translate-y-1/3" />
        <div className="grid-bg absolute inset-0 opacity-[0.4]" />

        {/* Slim top bar: logo + back to home */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-7 relative z-10 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img src={scripFiLogo} alt="ScripFi logo" className="w-9 h-9 object-contain" />
            <span className="font-bold text-2xl tracking-tight text-white">ScripFi</span>
          </a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            ← Back to home
          </a>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-16 relative z-10">
          <div className="badge inline-flex mb-4">Getting started</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Invest in <span className="text-gradient-amber">real property</span>, on-chain
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
            ScripFi turns real-world assets like real estate into tokens you can buy, earn from, and trade —
            starting from a small amount. Here's everything you need to know in plain language.
          </p>
        </div>
      </header>

      {/* ── Body: sticky sidebar + content ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8676] mb-3">On this page</p>
            <ul className="space-y-1">
              {SECTIONS.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToId(s.id)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${
                      active === s.id
                        ? 'bg-amber-500/15 text-[#b45309] font-semibold'
                        : 'text-[#57544a] hover:text-[#26241f] hover:bg-black/[0.04]'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 space-y-20">
          {/* ── Overview ── */}
          <section className="space-y-5">
            <SectionTitle id="overview" eyebrow="The basics" title="What is ScripFi?" />
            <p className="text-[#3d3a32] leading-relaxed">
              Owning property usually takes a lot of money and a lot of paperwork. ScripFi makes it simple: a property is
              divided into many digital tokens, and you can buy as few as you like. Each token is tied to a real building, so
              owning tokens means you share in that property's value and income.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Start small</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">Buy a fraction of a property instead of the whole thing.</p>
              </Card>
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Earn income</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">Receive your share of rental income, paid straight to your wallet.</p>
              </Card>
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Trade anytime</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">Sell your tokens when you want, without the usual delays.</p>
              </Card>
            </div>
          </section>

          {/* ── Two ways to invest ── */}
          <section className="space-y-5">
            <SectionTitle id="two-ways" eyebrow="Choose your style" title="Two ways to invest" />
            <p className="text-[#3d3a32] leading-relaxed">
              The same property can be offered in two ways. Pick the one that matches what you want — long-term ownership, or
              flexible income you can move around freely.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Card>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0f7a5a] mb-2">Option 1</div>
                <h3 className="font-bold text-[#26241f] text-lg mb-1.5">Ownership token</h3>
                <p className="text-[#57544a] text-sm leading-relaxed mb-3">
                  Own a real share of the property. You get rental income, a say in big decisions, and any rise in value over time.
                </p>
                <ul className="text-[#57544a] text-sm space-y-1.5 list-disc list-inside">
                  <li>Best for long-term investors</li>
                  <li>Sold to verified investors (quick ID check)</li>
                  <li>Strongest, clearest claim on the asset</li>
                </ul>
              </Card>
              <Card>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#b45309] mb-2">Option 2</div>
                <h3 className="font-bold text-[#26241f] text-lg mb-1.5">Income token</h3>
                <p className="text-[#57544a] text-sm leading-relaxed mb-3">
                  Earn a share of the property's rental income. Fully flexible — trade it freely and use it across crypto apps.
                </p>
                <ul className="text-[#57544a] text-sm space-y-1.5 list-disc list-inside">
                  <li>Best for flexible, income-focused investors</li>
                  <li>Buy and sell freely, anytime</li>
                  <li>Works with DeFi apps</li>
                </ul>
              </Card>
            </div>
            <Callout tone="green" title="Not sure which to pick?">
              If you want to truly own a piece of the building, choose the <strong>ownership token</strong>. If you mainly want
              the income with the freedom to trade whenever you like, choose the <strong>income token</strong>.
            </Callout>
          </section>

          {/* ── How it works ── */}
          <section className="space-y-5">
            <SectionTitle id="how-it-works" eyebrow="Step by step" title="How it works" />
            <ol className="space-y-4">
              {[
                ['Connect your wallet', 'Link a crypto wallet or create a ScripFi account in minutes.'],
                ['Browse properties', 'Explore verified properties and see the price, expected income, and details.'],
                ['Buy your tokens', 'Pick an amount and pay with crypto or card. Your tokens arrive in your wallet.'],
                ['Earn and trade', 'Collect your share of rental income automatically, and sell your tokens whenever you choose.'],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-br from-amber-400 to-amber-600 text-[#1c1913]"
                    style={{ boxShadow: '0 4px 12px rgba(217,119,6,0.3)' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#26241f] mb-0.5">{title}</h4>
                    <p className="text-[#57544a] text-sm leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Safety ── */}
          <section className="space-y-5">
            <SectionTitle id="safety" eyebrow="Peace of mind" title="Is it safe?" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Backed by real property</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">
                  Every token is tied to an actual building, with the legal paperwork recorded so your claim is real — not just a promise.
                </p>
              </Card>
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Verified and compliant</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">
                  Properties are checked before listing, and ScripFi follows the rules of the regions it operates in.
                </p>
              </Card>
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">You stay in control</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">
                  Your tokens live in your own wallet. You decide when to hold, earn, or sell.
                </p>
              </Card>
              <Card>
                <h3 className="font-bold text-[#26241f] mb-1.5">Transparent on-chain</h3>
                <p className="text-[#57544a] text-sm leading-relaxed">
                  Ownership and payouts are recorded on the blockchain, so everything is verifiable.
                </p>
              </Card>
            </div>
            <Callout tone="amber" title="A quick note">
              All investing carries risk, and property values can go up or down. Only invest what you're comfortable with. This page
              is general information, not financial advice.
            </Callout>
          </section>

          {/* ── FAQ ── */}
          <section className="space-y-5">
            <SectionTitle id="faq" eyebrow="Questions" title="Frequently asked" />
            <div className="space-y-3">
              {FAQS.map(({ q, a }) => (
                <Card key={q}>
                  <h4 className="font-bold text-[#26241f] mb-1.5">{q}</h4>
                  <p className="text-[#57544a] text-sm leading-relaxed">{a}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Back to top / home */}
          <div className="pt-6 border-t border-black/10 flex flex-wrap gap-4">
            <button onClick={() => scrollToId('overview')} className="text-sm font-medium text-[#b45309] hover:underline">
              ↑ Back to top
            </button>
            <a href="#" className="text-sm font-medium text-[#57544a] hover:text-[#26241f]">
              ← Back to home
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
