import { useRef, useEffect, useState } from 'react'
import { SHOWCASE_ITEMS } from '../data/showcase'

function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function Showcase() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.05)
  const tunnelRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      if (!tunnelRef.current) return
      const rect = tunnelRef.current.getBoundingClientRect()
      // how far the top of the tunnel has scrolled past the top of the viewport
      const scrolledIn = Math.max(-rect.top, 0)
      const index = Math.min(
        Math.floor(scrolledIn / window.innerHeight),
        SHOWCASE_ITEMS.length - 1
      )
      setActiveIndex(index)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="showcase" className="bg-[#E9E5DA] py-24">
      {/*
        Tunnel height = (items + 1) × 100vh so the last item gets a full
        viewport of scroll before the sticky block releases. The whole
        showcase (header + card + dots) is locked inside one 100vh sticky
        viewport while the cards swap.
      */}
      <div
        ref={tunnelRef}
        style={{ height: `${(SHOWCASE_ITEMS.length + 1) * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center py-0 px-5 sm:px-8 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">

            {/* Header — locked in with the cards */}
            <div ref={ref} className={`text-center reveal ${visible ? 'visible' : ''} mb-5`}>
              <div className="badge-charcoal inline-flex mb-3">Core Pillars</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#26241f] mb-2 tracking-tight">
                Built on <span className="text-[#6b675c]">Core Pillars</span>
              </h2>
              <p className="text-[#57544a] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Everything that makes ScripFi different — ownership that moves at the speed
                of the internet, governed by you, earning for you.
              </p>
            </div>

            {/* Single card */}
            <div className="showcase-card">
              {/*
                CSS grid with all items in the same cell (1/1).
                All items contribute to the row height (largest wins),
                and opacity controls which one is visible.
              */}
              <div className="grid">
                {SHOWCASE_ITEMS.map((item, i) => (
                  <div
                    key={item.highlight}
                    className={`flex flex-col gap-4 md:gap-10 p-5 sm:p-8 md:items-center ${item.imageSide === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    style={{
                      gridArea: '1 / 1',
                      background: item.bg,
                      opacity: i === activeIndex ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      pointerEvents: i === activeIndex ? 'auto' : 'none',
                    }}
                  >
                    {/* Image */}
                    <div className="relative md:w-2/3 shrink-0">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="w-full h-auto max-h-[62vh] object-contain"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 44px 28px ${item.bg}` }}
                      />
                    </div>

                    {/* Text */}
                    <div className="md:w-1/3">
                      <div className="badge-charcoal inline-flex mb-3">{item.tag}</div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#26241f] mb-3 tracking-tight">
                        {item.title} <span className="text-[#6b675c]">{item.highlight}</span>
                      </h3>
                      <p className="text-[#57544a] text-sm leading-relaxed mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.bullets.map(b => (
                          <li key={b} className="flex items-start gap-3 text-sm text-[#44423a]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#3a372e]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 justify-center mt-4">
              {SHOWCASE_ITEMS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? '24px' : '6px',
                    background: i === activeIndex ? '#3a372e' : 'rgba(58,55,46,0.3)',
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
