import economyImg from '../assets/economy.png'

export default function Waitlist() {
  return (
    <section
      id="waitlist"
      className="min-h-screen flex items-center px-5 sm:px-8 py-32 md:py-48 relative overflow-hidden"
      style={{
        backgroundColor: '#E9E5DA',
        backgroundImage: `linear-gradient(rgba(233,229,218,0.55), rgba(233,229,218,0.62)), url(${economyImg})`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center top',
        backgroundRepeat: 'no-repeat, no-repeat',
      }}
    >
      <div
        className="w-full max-w-2xl mx-auto px-8 py-12 sm:px-12 sm:py-14 relative z-10 text-center rounded-3xl"
        style={{
          background: 'rgba(233,229,218,0.72)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          border: '1px solid rgba(55,50,35,0.12)',
          boxShadow: '0 20px 60px rgba(45,40,28,0.18)',
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26241f] mb-5 tracking-tight leading-tight">
          Connect With <span className="text-[#6b675c]">Us</span>
        </h2>

        <p className="text-[#57544a] text-base sm:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          Whether you're an investor, an asset owner, or a partner — we'd love to hear from you.
          Explore the docs or reach out and let's tokenize the real economy together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="btn-primary px-7 py-4 rounded-full text-sm font-semibold w-full sm:w-auto text-center"
          >
            Connect With Us →
          </a>
          <a
            href="#"
            className="px-7 py-4 rounded-full text-sm font-semibold w-full sm:w-auto text-center text-[#44423a] bg-white transition-all duration-200 hover:bg-[#f5f1e8]"
            style={{ border: '1px solid rgba(55,50,35,0.25)' }}
          >
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}
