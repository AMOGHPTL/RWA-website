import { useState } from 'react'
import scripFiLogo from '../assets/LogoYellow.svg'

const NAV_LINKS = [
  { label: 'Core Pillars', href: '#showcase' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Assets', href: '#assets' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const isDocsPage = () => window.location.hash.replace(/^#\/?/, '') === 'docs'

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.slice(1)
    if (isDocsPage()) {
      // Leave the docs page first, then scroll to the section once home mounts.
      window.location.hash = ''
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }


  return (
    <nav className="absolute top-0 left-0 right-0 z-50 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={goHome} className="flex items-center gap-2.5">
          <img src={scripFiLogo} alt="ScripFi logo" className="w-9 h-9 object-contain" />
          <span className="font-bold text-2xl tracking-tight text-white">
            Scrip<span className="">Fi</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => handleNav(e, link.href)}
              className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 relative group text-white/80 hover:text-white hover:bg-white/10"
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-amber-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40">
            Docs
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/10"
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
        <div className="md:hidden animate-fade-in border-t bg-[#0c0c24]/95 border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium py-3 px-4 rounded-xl transition-all text-white/75 hover:text-white hover:bg-white/10"
                onClick={e => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t mt-3 pt-4 flex flex-col gap-3 border-white/10">
              <a href="#docs" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block w-full py-3 rounded-xl text-sm font-medium text-center border transition-all border-white/20 text-white/80 hover:bg-white/10 hover:text-white">
                Docs
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
