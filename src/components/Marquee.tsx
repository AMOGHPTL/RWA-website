const ITEMS = [
  ' Real Estate',
  ' Gold & Silver',
  ' Infrastructure',
  ' Private Credit',
  ' Fine Art',
  ' Carbon Credits',
  ' Trade Finance',
  ' Industrial Assets',
  ' IP Royalties',
  ' Agricultural Land',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="py-5 border-y border-amber-200/50 overflow-hidden relative bg-[#000000]">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#faf6ee] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#faf6ee] to-transparent" />
      <div className="marquee-track animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium mx-8 whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-amber-500/50 inline-block ml-8" />
          </span>
        ))}
      </div>
    </div>
  )
}
