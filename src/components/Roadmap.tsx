import { useRef, useEffect, useState } from "react";
import { ROADMAP_PHASES, type RoadmapPhase } from "../data/roadmap";

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Wave geometry (viewBox 1200 × 620) ──
// Phases alternate between a crest (top) and a trough (bottom).
// Node points line up with the cards positioned along the wave.
const VB_W = 1200;
const VB_H = 620;
const CREST_Y = 255;
const TROUGH_Y = 385;
const CENTER_Y = (CREST_Y + TROUGH_Y) / 2; // 320
const NODE_X = [216, 472, 728, 984]; // 18 / 39.3 / 60.7 / 82 % — kept inset so wide cards don't clip
const isCrest = (i: number) => i % 2 === 0;
const nodeY = (i: number) => (isCrest(i) ? CREST_Y : TROUGH_Y);

const WAVE_PATH = [
  `M 0,${CENTER_Y}`,
  `C 86,290 130,${CREST_Y} ${NODE_X[0]},${CREST_Y}`,
  `C 344,${CREST_Y} 344,${TROUGH_Y} ${NODE_X[1]},${TROUGH_Y}`,
  `C 600,${TROUGH_Y} 600,${CREST_Y} ${NODE_X[2]},${CREST_Y}`,
  `C 856,${CREST_Y} 856,${TROUGH_Y} ${NODE_X[3]},${TROUGH_Y}`,
  `C 1070,${TROUGH_Y} 1114,350 1200,${CENTER_Y}`,
].join(" ");

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  return (
    <div
      className="rounded-2xl px-5 py-4 w-full"
      style={{
        background: "#ede5cc",
        boxShadow: "0 14px 40px rgba(45,40,28,0.14)",
      }}
    >
      {/* Top row: phase + stage on the left, months on the right */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="badge-charcoal shrink-0">{phase.phase}</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8576] truncate">
            {phase.stage}
          </span>
        </div>
      </div>

      <h3 className="text-[#26241f] font-bold text-[17px] leading-snug tracking-tight mb-1">
        {phase.title}
      </h3>
      <p className="text-[#57544a] text-[13px] leading-relaxed mb-3">
        {phase.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {phase.chips.map((chip) => (
          <span
            key={chip}
            className="text-[11px] font-medium text-[#44423a] rounded-full px-2.5 py-0.5 border"
            style={{ borderColor: "rgba(55,50,35,0.18)" }}
          >
            {chip}
          </span>
        ))}
      </div>
      <span className="sr-only">{index + 1}</span>
    </div>
  );
}

export default function Roadmap() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      id="roadmap"
      ref={ref}
      className="bg-[#E9E5DA] py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header — matches the Showcase header treatment */}
        <div className={`text-center mb-14 reveal ${visible ? "visible" : ""}`}>
          <div className="badge-charcoal inline-flex mb-3">The Road Ahead</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26241f] mb-2 tracking-tight">
            Our vision for <span className="text-[#6b675c]">Tokenization</span>
          </h2>
          <p className="text-[#57544a] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Four phases that ScripFi is going to roll out — riding the wave from
            a clean testnet MVP to an institutional, multi-chain RWA network.
          </p>
        </div>

        {/* ── Wave layout (xl and up) ── */}
        <div
          className="hidden xl:block relative"
          style={{ height: `${VB_H}px` }}
        >
          {/* The wave line */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a8576" />
                <stop offset="50%" stopColor="#57544a" />
                <stop offset="100%" stopColor="#8a8576" />
              </linearGradient>
            </defs>
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="url(#waveStroke)"
              strokeWidth={2.5}
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: visible ? 0 : 1,
                transition:
                  "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: "drop-shadow(0 3px 10px rgba(45,40,28,0.18))",
              }}
            />
          </svg>

          {/* Nodes + connector stems + cards */}
          {ROADMAP_PHASES.map((phase, i) => {
            const xPct = (NODE_X[i] / VB_W) * 100;
            const y = nodeY(i);
            const crest = isCrest(i);
            const stem = 24; // px from node to card edge
            return (
              <div key={phase.phase}>
                {/* Connector stem */}
                <div
                  className="absolute w-px"
                  style={{
                    left: `${xPct}%`,
                    ...(crest
                      ? { bottom: `${VB_H - y + 6}px` }
                      : { top: `${y + 6}px` }),
                    height: `${stem - 6}px`,
                    transform: "translateX(-50%)",
                    background: crest
                      ? "linear-gradient(to top, rgba(217,119,6,0.55), rgba(245,158,11,0))"
                      : "linear-gradient(to bottom, rgba(217,119,6,0.55), rgba(245,158,11,0))",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    transitionDelay: `${0.6 + i * 0.18}s`,
                  }}
                />

                {/* Node dot, anchored on the wave */}
                <div
                  className="absolute"
                  style={{
                    left: `${xPct}%`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    transitionDelay: `${0.5 + i * 0.18}s`,
                  }}
                >
                  <span
                    className="block w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600"
                    style={{
                      boxShadow:
                        "0 0 0 5px rgba(245,158,11,0.15), 0 2px 8px rgba(217,119,6,0.35)",
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`absolute w-105 reveal ${visible ? "visible" : ""}`}
                  style={{
                    left: `${xPct}%`,
                    transform: "translateX(-50%)",
                    ...(crest
                      ? { bottom: `${VB_H - y + stem}px` }
                      : { top: `${y + stem}px` }),
                    transitionDelay: `${0.55 + i * 0.18}s`,
                  }}
                >
                  <PhaseCard phase={phase} index={i} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Vertical timeline (below xl) ── */}
        <div className="xl:hidden relative max-w-2xl mx-auto pl-8 sm:pl-10">
          {/* Vertical line */}
          <span
            className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #8a8576, #57544a, #8a8576)",
            }}
          />
          <div className="flex flex-col gap-8">
            {ROADMAP_PHASES.map((phase, i) => (
              <div
                key={phase.phase}
                className={`relative reveal ${visible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <span
                  className="absolute -left-[26px] sm:-left-[30px] top-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600"
                  style={{
                    boxShadow:
                      "0 0 0 5px rgba(245,158,11,0.15), 0 2px 8px rgba(217,119,6,0.35)",
                  }}
                />
                <PhaseCard phase={phase} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
