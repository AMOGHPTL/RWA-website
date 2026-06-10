import { useState, useEffect } from "react";
import tokenizationImg from "../assets/hero.svg";
import bgImg from "../assets/bg.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="glass rounded-2xl w-[72px] h-[72px] sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center animate-pulse-glow">
        <span className="countdown-digit text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { value: "47,200+", label: "Investors Waitlisted" },
  { value: "$2.5B+", label: "Target Assets" },
  { value: "120+", label: "Partner Institutions" },
  { value: "50+", label: "Countries" },
];

const LAUNCH_DATE = new Date("2026-12-01T00:00:00");

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dark-section"
      style={{
        backgroundColor: "#060612",
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.045) 1px, transparent 1px), url(${bgImg})`,
        backgroundSize: "44px 44px, 44px 44px, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "repeat, repeat, no-repeat",
      }}
    >
      {/* Background orbs */}
      <div className="orb w-[700px] h-[700px] bg-violet-600/[0.18] -top-52 -left-52" />
      <div className="orb w-[550px] h-[550px] bg-sky-500/[0.12] top-1/3 -right-56" />
      <div className="orb w-[450px] h-[450px] bg-indigo-700/[0.14] bottom-0 left-1/3" />

      {/* Spinning ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.07] animate-spin-slow">
        <svg viewBox="0 0 800 800" fill="none" className="w-full h-full">
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="url(#ring1)"
            strokeWidth="1"
            strokeDasharray="6 14"
          />
          <circle
            cx="400"
            cy="400"
            r="300"
            stroke="url(#ring2)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <circle
            cx="400"
            cy="400"
            r="220"
            stroke="url(#ring3)"
            strokeWidth="1"
            strokeDasharray="3 8"
          />
          <defs>
            <linearGradient
              id="ring1"
              x1="0"
              y1="0"
              x2="800"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient
              id="ring2"
              x1="0"
              y1="0"
              x2="800"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient
              id="ring3"
              x1="0"
              y1="0"
              x2="800"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <div
          className="badge inline-flex mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Coming Soon — Waitlist Open
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-6 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Own a Piece of
          <br />
          the <span className="text-gradient">Real World</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          ScripFi brings institutional-grade real-world asset tokenization to
          everyone. Invest in premium real estate, commodities, and
          infrastructure — starting from just{" "}
          <span className="text-white font-medium">$50</span>.
        </p>

        {/* Hero Image */}
        <div
          className="relative mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: "0.28s", maxWidth: "680px" }}
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 rounded-3xl bg-violet-600/20 blur-3xl scale-95 pointer-events-none" />
          {/* Image frame */}
          
          {/* Floating label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 badge whitespace-nowrap shadow-lg shadow-violet-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Real Assets → On-Chain Tokens
          </div>
        </div>

        {/* Countdown */}
        <div
          className="flex items-end justify-center gap-3 sm:gap-4 md:gap-5 mb-10 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CountUnit value={timeLeft.days} label="Days" />
          <span className="text-violet-400/60 font-light text-3xl mb-10">
            :
          </span>
          <CountUnit value={timeLeft.hours} label="Hours" />
          <span className="text-violet-400/60 font-light text-3xl mb-10">
            :
          </span>
          <CountUnit value={timeLeft.minutes} label="Min" />
          <span className="text-violet-400/60 font-light text-3xl mb-10">
            :
          </span>
          <CountUnit value={timeLeft.seconds} label="Sec" />
        </div>

        {/* Email form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-5 animate-slide-up"
            style={{ animationDelay: "0.38s" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email address"
              className="input-field flex-1 rounded-full px-5 py-3.5 text-sm"
            />
            <button
              type="submit"
              className="btn-primary rounded-full px-7 py-3.5 text-sm whitespace-nowrap"
            >
              Join Waitlist →
            </button>
          </form>
        ) : (
          <div
            className="inline-flex items-center gap-3 glass rounded-2xl px-7 py-4 mb-5 border-green-500/20 animate-fade-in"
            style={{ borderColor: "rgba(34,197,94,0.2)" }}
          >
            <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">
              ✓
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">
                You're on the list!
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                We'll reach out at{" "}
                <span className="text-violet-300">{email}</span>
              </p>
            </div>
          </div>
        )}
        {error && <p className="text-red-400 text-sm mb-5">{error}</p>}

        {/* Trust line */}
        <div
          className="flex flex-wrap items-center justify-center gap-5 text-slate-500 text-xs animate-fade-in"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            "No spam, ever",
            "Early access perks",
            "Zero fees for founding members",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-violet-500">✦</span> {t}
            </span>
          ))}
        </div>

        {/* Stats grid */}
        <div
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-4 sm:p-5 text-center hover:border-violet-500/25 transition-colors duration-300"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-50">
        <span className="text-slate-600 text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-violet-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
