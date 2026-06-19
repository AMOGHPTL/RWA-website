import scripFiLogo from '../assets/LogoYellow.svg'

const LINKS = {
  Platform: [
    { label: 'Core Pillars', href: '#showcase' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Asset Types', href: '#assets' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#waitlist' },
    { label: 'Docs', href: '#' },
  ],
}

const SOCIALS = [
  {
    name: 'X (Twitter)',
    href: 'https://x.com/amoghp549',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amogh-patil-2a5873269/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.length > 1 && href.startsWith('#')) {
      const target = document.getElementById(href.slice(1))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-[#E9E5DA] pt-12 pb-8 relative overflow-hidden" style={{ borderTop: '1px solid rgba(55,50,35,0.12)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-8">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2.5 mb-3">
              <img src={scripFiLogo} alt="ScripFi logo" className="w-8 h-8 object-contain" />
              <span className="text-[#26241f] font-bold text-lg tracking-tight">
                Scrip<span className="text-[#6b675c]">Fi</span>
              </span>
            </a>
            <p className="text-[#57544a] text-sm leading-relaxed mb-4 max-w-[220px]">
              Democratizing access to real-world asset investments through blockchain tokenization.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#57544a] hover:text-amber-700 hover:border-amber-400/50 transition-all duration-200"
                  style={{ background: '#ede5cc', border: '1px solid rgba(55,50,35,0.16)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — pushed to the right */}
          <div className="flex gap-16 sm:gap-24">
            {Object.entries(LINKS).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-[#26241f] font-semibold text-sm mb-3">{category}</h4>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={e => handleNav(e, item.href)}
                        className="text-[#57544a] text-sm hover:text-[#26241f] transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="pt-6" style={{ borderTop: '1px solid rgba(55,50,35,0.12)' }}>
          <p className="text-[#8a8576] text-[11px] leading-relaxed">
            ScripFi tokens are regulated securities. Investment involves risk. This is not financial advice.
            Please read all risk disclosures before investing.
          </p>
        </div>
      </div>
    </footer>
  )
}
