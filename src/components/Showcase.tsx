import { useRef, useEffect, useState } from 'react'
import { SHOWCASE_ITEMS, type ShowcaseItem } from '../data/showcase'

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

// Sticky offset of the first card; each next card peeks a bit lower
const STACK_TOP = 96
const STACK_STEP = 24

function ShowcaseCard({ item, index }: { item: ShowcaseItem; index: number }) {
  return (
    <div data-stack-wrap className="md:sticky" style={{ top: `${STACK_TOP + index * STACK_STEP}px` }}>
      <div data-stack-card className="stack-card">
        <div
          className={`showcase-card flex flex-col gap-8 md:gap-12 p-6 sm:p-10 md:items-center ${item.imageSide === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          style={{ background: item.bg }}
        >
          {/* Image side */}
          <div className="relative md:w-1/2 shrink-0">
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              className="w-full h-auto max-h-[360px] object-contain"
            />
            {/* feathered vignette: fades the image edges into the card background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: `inset 0 0 44px 28px ${item.bg}` }}
            />
          </div>

          {/* Text side */}
          <div className="md:w-1/2">
            <div className="badge-charcoal inline-flex mb-5">{item.tag}</div>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#26241f] mb-4 tracking-tight">
              {item.title} <span className="text-[#6b675c]">{item.highlight}</span>
            </h3>
            <p className="text-[#57544a] text-base leading-relaxed mb-6">{item.description}</p>
            <ul className="space-y-3">
              {item.bullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm text-[#44423a]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#3a372e]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.05)
  const stackRef = useRef<HTMLDivElement>(null)

  // Scroll-driven deck:
  //  - entering cards stay small and faded, then "pop" to full size as they
  //    reach their pinned spot (cubic ease-in = delayed snap)
  //  - pinned cards scale down and dim as the next card slides over them
  useEffect(() => {
    const container = stackRef.current
    if (!container) return
    const wraps = Array.from(container.querySelectorAll<HTMLElement>('[data-stack-wrap]'))
    let raf = 0
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

    const update = () => {
      raf = 0
      const winH = window.innerHeight
      for (let i = 0; i < wraps.length; i++) {
        const card = wraps[i].querySelector<HTMLElement>('[data-stack-card]')
        if (!card) continue
        const rect = wraps[i].getBoundingClientRect()
        const next = wraps[i + 1]

        // covered by the next card → scale down + dim
        if (next) {
          const nextTop = next.getBoundingClientRect().top
          const cover = clamp01((rect.bottom - nextTop) / rect.height)
          if (cover > 0) {
            card.style.transform = `scale(${1 - cover * 0.06})`
            card.style.filter = `brightness(${1 - cover * 0.14})`
            card.style.opacity = ''
            continue
          }
        }

        // entering from below → delayed pop into place
        const stickyTop = STACK_TOP + i * STACK_STEP
        const enter = clamp01((winH - rect.top) / Math.max(winH - stickyTop, 1))
        if (enter < 1) {
          const pop = enter * enter * enter // ease-in: holds back, then snaps
          card.style.transform = `scale(${0.88 + 0.12 * pop})`
          card.style.opacity = `${0.35 + 0.65 * pop}`
          card.style.filter = ''
        } else {
          card.style.transform = ''
          card.style.opacity = ''
          card.style.filter = ''
        }
      }
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
    <section id="showcase" className="py-24 md:py-32 relative overflow-hidden bg-[#E9E5DA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 md:mb-24 reveal ${visible ? 'visible' : ''}`}>
          <div className="badge-charcoal inline-flex mb-5">Core Pillars</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#26241f] mb-5 tracking-tight">
            Built on <span className="text-[#6b675c]">Four Pillars</span>
          </h2>
          <p className="text-[#57544a] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything that makes ScripFi different — ownership that moves at the speed
            of the internet, governed by you, earning for you.
          </p>
        </div>

        {/* Stacked cards */}
        <div ref={stackRef} className="flex flex-col gap-14 md:gap-[55vh]">
          {SHOWCASE_ITEMS.map((item, i) => (
            <ShowcaseCard key={item.highlight} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
