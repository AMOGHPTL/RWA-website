import { useState } from "react";
import bgImg from "../assets/bg2.png";

const STATS = [
  { value: "47,200+", label: "Investors Waitlisted" },
  { value: "$2.5B+", label: "Target Assets" },
  { value: "120+", label: "Partner Institutions" },
  { value: "50+", label: "Countries" },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden backdrop-blur-lg"
      style={{
        backgroundColor: "#060612",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${bgImg})`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <div
          className="badge inline-flex mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Coming Soon — Waitlist Open
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-6 animate-slide-up"
          style={{
            animationDelay: "0.15s",
            textShadow: "0 2px 24px rgba(0,0,0,0.55)",
          }}
        >
          The Tokenized RWAs
          <br />
          <span className="text-gradient">Hub</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-slate-100 text-base sm:text-lg md:text-md max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{
            animationDelay: "0.25s",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
          }}
        >
          ScripFi brings institutional-grade real-world asset tokenization to
          everyone. Convert your RWAs and Invest in premium real estate, commodities, and
          infrastructure — starting from just{" "}
          <span className="text-white font-semibold">$50</span>.
        </p>

        {/* Hero Image */}
        <div
          className="relative mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: "0.28s", maxWidth: "680px" }}
        >
        </div>

        {/* Email form */}
        {/* {!submitted ? (
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
        )} */}
        {/* {error && <p className="text-red-400 text-sm mb-5">{error}</p>} */}
        <button className="bg-white rounded-full px-7 py-3.5 text-sm whitespace-nowrap animate-slide-up" style={{ animationDelay: "0.38s" }}>
          Docs
        </button>
      </div>

    </section>
  );
}
