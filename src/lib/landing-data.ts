/**
 * Landing-page data: the carbon-border industries in scope, and the platform
 * verticals. Kept in one place so the marketing surface stays in sync with the
 * regulation and the app — extend here, not in the components.
 */

export interface Industry {
  id: string;
  name: string;
  blurb: string;
  /** Indicative default embedded-emissions intensity, for the "at a glance" stat. */
  intensity: string;
  unit: string;
  cn: string;
  icon: string; // lucide icon name
  hex: string;
  tint: string; // light background tint
}

/** The six EU CBAM sectors — the industries the platform is built around. */
export const INDUSTRIES: Industry[] = [
  {
    id: "steel",
    name: "Iron & Steel",
    blurb: "The largest CBAM sector by volume. Route matters — BF-BOF vs DRI-EAF vs scrap.",
    intensity: "2.1–2.6",
    unit: "tCO₂e / t",
    cn: "CN 72–73",
    icon: "Factory",
    hex: "#2563eb",
    tint: "rgba(37, 99, 235, 0.08)",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    blurb: "Electricity-intensive. Indirect emissions dominate primary production.",
    intensity: "16–18",
    unit: "tCO₂e / t",
    cn: "CN 76",
    icon: "Layers",
    hex: "#06b6d4",
    tint: "rgba(6, 182, 212, 0.08)",
  },
  {
    id: "cement",
    name: "Cement",
    blurb: "Calcination emissions are unavoidable chemistry — clinker is the hotspot.",
    intensity: "0.6–0.9",
    unit: "tCO₂e / t",
    cn: "CN 2523",
    icon: "Building2",
    hex: "#f59e0b",
    tint: "rgba(245, 158, 11, 0.10)",
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    blurb: "N₂O from nitric acid and ammonia feedstock drive the footprint.",
    intensity: "2.0–2.8",
    unit: "tCO₂e / t",
    cn: "CN 28 / 31",
    icon: "Sprout",
    hex: "#10b981",
    tint: "rgba(16, 185, 129, 0.10)",
  },
  {
    id: "hydrogen",
    name: "Hydrogen",
    blurb: "Grey vs green is everything. Production route sets the entire result.",
    intensity: "8–10",
    unit: "tCO₂e / t",
    cn: "CN 2804",
    icon: "FlaskConical",
    hex: "#7c3aed",
    tint: "rgba(124, 58, 237, 0.10)",
  },
  {
    id: "electricity",
    name: "Electricity",
    blurb: "Priced on the grid emission factor of the exporting country. EU-only.",
    intensity: "Grid factor",
    unit: "tCO₂e / MWh",
    cn: "CN 2716",
    icon: "Zap",
    hex: "#f43f5e",
    tint: "rgba(244, 63, 94, 0.10)",
  },
];

export interface Vertical {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
  hex: string;
  /** Bento span hints */
  span: "lg" | "md" | "sm";
  tag?: string;
}

/** The ten platform verticals, sized for a bento grid. */
export const VERTICALS: Vertical[] = [
  {
    id: "ai",
    title: "Non-hallucinating AI",
    desc: "Ask anything across EU & UK CBAM. Every answer is citation-grounded, confidence-scored, and dated — it refuses to guess.",
    icon: "Bot",
    href: "/ai-assistant",
    hex: "#004494",
    span: "lg",
    tag: "Core",
  },
  {
    id: "calculator",
    title: "Deterministic calculator",
    desc: "EU certificates & UK levy from a tested engine — never an LLM.",
    icon: "Calculator",
    href: "/calculator",
    hex: "#006fb4",
    span: "md",
  },
  {
    id: "community",
    title: "Verified community",
    desc: "Regime-gated channels for importers, exporters, verifiers and consultants.",
    icon: "MessageSquare",
    href: "/community",
    hex: "#1c63b5",
    span: "md",
  },
  {
    id: "library",
    title: "Regulation library",
    desc: "Primary-source docs, sector guides and templates — each with an 'as of' date.",
    icon: "BookOpen",
    href: "/library",
    hex: "#b07d1e",
    span: "sm",
  },
  {
    id: "directory",
    title: "Expert directory",
    desc: "Accredited verifiers, consultants, brokers and law firms — filtered by regime.",
    icon: "Users",
    href: "/directory",
    hex: "#0f7c8c",
    span: "sm",
  },
  {
    id: "alerts",
    title: "Live alerts",
    desc: "Detect-review-publish monitoring on EUR-Lex, GOV.UK/HMRC and price feeds.",
    icon: "Bell",
    href: "/alerts",
    hex: "#c2410c",
    span: "sm",
  },
  {
    id: "dashboard",
    title: "Compliance dashboard",
    desc: "Live ETS price, deadline countdowns and your obligations at a glance.",
    icon: "LayoutDashboard",
    href: "/dashboard",
    hex: "#2f7d33",
    span: "md",
  },
  {
    id: "verification",
    title: "Verified onboarding",
    desc: "Identity, role and regime tagging — the trust gate that powers the flywheel.",
    icon: "ShieldCheck",
    href: "/onboarding",
    hex: "#5b53b8",
    span: "md",
  },
];

/** Regimes covered, for the marquee + coverage strip. */
export const REGIMES = [
  { code: "EU", label: "EU CBAM", status: "Live 2026", hex: "#10b981" },
  { code: "UK", label: "UK CBAM", status: "Live 2027", hex: "#2563eb" },
  { code: "US", label: "United States", status: "Monitoring", hex: "#f59e0b" },
  { code: "IN", label: "India", status: "Exporter focus", hex: "#7c3aed" },
  { code: "CA", label: "Canada", status: "Watch", hex: "#f43f5e" },
  { code: "AU", label: "Australia", status: "Watch", hex: "#06b6d4" },
  { code: "TR", label: "Turkey", status: "Deductions", hex: "#84cc16" },
  { code: "CN", label: "China", status: "Deductions", hex: "#ec4899" },
];
