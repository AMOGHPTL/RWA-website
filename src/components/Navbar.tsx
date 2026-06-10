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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
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
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-secondary px-4 py-2 rounded-full text-sm">
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
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
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
        <div className="md:hidden glass border-t border-violet-200/30 animate-fade-in">
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-700 hover:text-slate-900 text-sm font-medium py-3 px-3 rounded-xl hover:bg-violet-50 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-200/60 mt-3 pt-4 flex flex-col gap-3">
              <button className="btn-secondary w-full py-3 rounded-xl text-sm font-medium">
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
