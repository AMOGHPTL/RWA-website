// ─────────────────────────────────────────────────────────────
//  Roadmap content — edit phase text here freely.
//  Phases are rendered along a wave: odd phases sit on a crest
//  (card above the line), even phases sit in a trough (card below).
// ─────────────────────────────────────────────────────────────

export interface RoadmapPhase {
  phase: string; // e.g. "Phase 1"
  stage: string; // short eyebrow, e.g. "Funding this phase"
  title: string;
  description: string;
  chips: string[];
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    stage: "Funding this phase",
    title: "Foundation & MVP",
    description:
      "Static asset tokenization on testnet: smart contracts, KYC/AML onboarding, document hashing, and a simple marketplace.",
    chips: [
      "RWA token contracts",
      "Wallet integration",
      "Issuer & investor onboarding",
      "DAO foundation",
    ],
  },
  {
    phase: "Phase 2",
    stage: "Mainnet alpha",
    title: "Yield-bearing assets & escrow",
    description:
      "Automated yield distribution, auditor integration, oracle price feeds, and continuous compliance.",
    chips: [
      "Yield distribution",
      "Escrow contracts",
      "Auditor workflow",
      "Oracle integration",
    ],
  },
  {
    phase: "Phase 3",
    stage: "Scale",
    title: "Governance & risk management",
    description:
      "Full DAO voting, a delisting mechanism for bad actors, risk ratings, and secondary trading.",
    chips: [
      "DAO governance",
      "Delisting mechanism",
      "Risk framework",
      "Secondary trading",
    ],
  },
  {
    phase: "Phase 4",
    stage: "Growth",
    title: "Scaling & integrations",
    description:
      "Enterprise issuance, multi-chain support, advanced yield products, and mobile apps.",
    chips: ["Institutional API", "Multi-chain", "Mobile apps", "Whitelabel"],
  },
];
