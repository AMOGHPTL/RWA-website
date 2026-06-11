import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Assets', href: '#assets' },
  { label: 'Roadmap', href: '#roadmap' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-scrolled' : 'navbar-top'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 group-hover:shadow-violet-500/50 transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            Scrip<span className="text-gradient">Fi</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 relative group ${
                scrolled
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-violet-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-violet-400 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
            scrolled
              ? 'border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50'
              : 'border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40'
          }`}>
            Whitepaper
          </button>
          <button
            onClick={scrollToWaitlist}
            className="btn-primary px-5 py-2 rounded-full text-sm"
          >
            Get Early Access →
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M5 5l12 12M5 17L17 5"/>
            ) : (
              <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M3 6h16M3 11h16M3 16h16"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden animate-fade-in border-t ${scrolled ? 'bg-white/95 border-violet-100' : 'bg-[#0c0c24]/95 border-white/10'} backdrop-blur-xl`}>
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium py-3 px-4 rounded-xl transition-all ${
                  scrolled
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-violet-50'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className={`border-t mt-3 pt-4 flex flex-col gap-3 ${scrolled ? 'border-slate-100' : 'border-white/10'}`}>
              <button className={`w-full py-3 rounded-xl text-sm font-medium border transition-all ${
                scrolled
                  ? 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50'
                  : 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
              }`}>
                Whitepaper
              </button>
              <button
                onClick={scrollToWaitlist}
                className="btn-primary w-full py-3 rounded-xl text-sm font-semibold"
              >
                Get Early Access →
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
