import { useState } from 'react'

const PERKS = [
  {
    icon: '💎',
    title: 'Zero Fees Forever',
    description: 'Founding members pay zero platform fees for life, no matter what the public pricing becomes.',
  },
  {
    icon: '🎖️',
    title: 'Founding Member NFT',
    description: 'Receive a unique on-chain credential that unlocks exclusive platform features and governance rights.',
  },
  {
    icon: '🚀',
    title: 'Priority Asset Access',
    description: 'Get first access to new asset listings before they open to the general public.',
  },
]

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf6ee 0%, #f7ebd5 50%, #faf6ee 100%)' }}>
      <div className="orb w-[800px] h-[800px] bg-amber-400/[0.15] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Main CTA card */}
        <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 border border-amber-500/20 relative overflow-hidden">
          {/* Corner glow decorations */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center mx-auto mb-7 shadow-2xl glow-purple">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3l3 6 7 1-5 5 1.2 7L14 19l-6.2 3.2L9 15.2 4 10.2l7-1 3-6z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>

            <div className="badge inline-flex mb-5">Limited Early Access</div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
              Be Among the First<br />
              <span className="text-gradient">1,000 Investors</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mb-10 leading-relaxed">
              Join our exclusive waitlist and lock in founding member status — with lifetime perks
              that won't be available after launch.
            </p>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              {PERKS.map(perk => (
                <div key={perk.title} className="glass-light rounded-xl p-4">
                  <div className="text-2xl mb-2">{perk.icon}</div>
                  <h4 className="text-slate-900 font-medium text-sm mb-1.5">{perk.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{perk.description}</p>
                </div>
              ))}
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="input-field rounded-xl px-5 py-3.5 text-sm w-full"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="Your email address"
                    required
                    className="input-field rounded-xl px-5 py-3.5 text-sm w-full"
                  />
                </div>
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <button type="submit" className="btn-primary w-full py-4 rounded-xl text-sm font-semibold">
                  Secure My Spot →
                </button>
              </form>
            ) : (
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-3 rounded-2xl px-7 py-4 border border-green-500/25 bg-green-500/[0.07] mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm shrink-0">✓</div>
                  <div className="text-left">
                    <p className="text-slate-900 font-medium text-sm">
                      {name ? `Welcome, ${name}!` : "You're in!"}
                    </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Confirmation sent to <span className="text-amber-600">{email}</span>
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  We'll notify you as soon as ScripFi launches. Stay tuned.
                </p>
              </div>
            )}

            <p className="text-slate-600 text-xs mt-5">
              No spam, ever. No credit card required. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['bg-amber-500', 'bg-amber-600', 'bg-amber-400', 'bg-orange-500'].map(c => (
                <div key={c} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span>47,200+ already joined</span>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-400">★★★★★</span> Rated by early testers
          </span>
        </div>
      </div>
    </section>
  )
}
