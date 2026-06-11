"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  animate as animateValue,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calculator,
  Bot,
  TrendingUp,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { IndustryScene } from "@/components/industry/IndustryScene";
import { ICONS } from "@/components/landing/icon-map";
import { INDUSTRIES, type Industry } from "@/lib/industries";

const TREND_STYLE: Record<string, string> = {
  Policy: "#5b53b8",
  Market: "#006fb4",
  Technology: "#2f7d33",
  Trade: "#b07d1e",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function IndustryDetailView({ industry }: { industry: Industry }) {
  const Icon = ICONS[industry.icon];
  const accent = industry.accent;

  const idx = INDUSTRIES.findIndex((i) => i.id === industry.id);
  const prev = INDUSTRIES[(idx - 1 + INDUSTRIES.length) % INDUSTRIES.length];
  const next = INDUSTRIES[(idx + 1) % INDUSTRIES.length];

  const maxRoute = Math.max(...industry.routes.map((r) => r.intensity));
  const savingPct = Math.round(
    (1 - industry.verifiedTypical.low / industry.defaultIntensity.high) * 100
  );

  /* page scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  const vars = {
    "--world-tint": `${accent}14`,
    "--world-tint-soft": `${accent}0d`,
  } as React.CSSProperties;

  return (
    <div style={vars} className="day-ambient relative min-h-screen text-foreground">
      <SiteNav />

      {/* sector-tinted scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ scaleX: progress, background: `linear-gradient(90deg, ${accent}, ${accent}66)` }}
      />

      {/* ============ HERO — living industrial world ============ */}
      <section className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden border-b border-border px-6 pb-16 pt-36">
        <IndustryScene industry={industry} />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ec-grey transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              All industries
            </Link>
          </motion.div>

          <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/85 backdrop-blur-md"
                style={{
                  borderColor: `${accent}55`,
                  color: accent,
                  boxShadow: `0 14px 40px -14px ${accent}77`,
                }}
              >
                {Icon && <Icon className="h-8 w-8" />}
              </motion.div>

              <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tightest text-foreground sm:text-6xl lg:text-7xl">
                {industry.name.split(" ").map((word, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <span className="inline-block overflow-hidden align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "108%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.18 + i * 0.09, duration: 0.8, ease: EASE }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  </Fragment>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
                className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-ec-grey"
              >
                {industry.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                <Chip>{industry.cn}</Chip>
                {industry.inEU && <Chip accent="#004494">EU CBAM</Chip>}
                {industry.inUK && <Chip accent="#2f7d33">UK CBAM</Chip>}
                {!industry.inUK && <Chip muted>Not in UK scope</Chip>}
              </motion.div>
            </div>

            {/* Headline intensity card — tilts toward the cursor */}
            <TiltCard
              accent={accent}
              className="w-full max-w-sm rounded-2xl border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ec-grey-75">
                Default intensity
              </p>
              <p className="mt-1 font-display text-5xl font-bold" style={{ color: accent }}>
                {industry.defaultIntensity.low}–{industry.defaultIntensity.high}
              </p>
              <p className="text-sm text-ec-grey-75">{industry.defaultIntensity.unit}</p>

              <div className="mt-5 space-y-2.5">
                <Bar label="Default" value={industry.defaultIntensity.high} max={industry.defaultIntensity.high} color="#da2130" />
                <Bar label="Verified (typical)" value={industry.verifiedTypical.low} max={industry.defaultIntensity.high} color={accent} />
              </div>
              <p className="mt-4 rounded-lg p-3 text-xs leading-relaxed text-ec-grey" style={{ backgroundColor: `${accent}10` }}>
                Verified data can cut this by up to{" "}
                <span className="font-bold" style={{ color: accent }}>
                  {savingPct}%
                </span>{" "}
                versus the punitive default — the importer&apos;s hook.
              </p>
            </TiltCard>
          </div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full border-2 pt-1.5"
            style={{ borderColor: `${accent}66` }}
          >
            <span className="h-2 w-1 rounded-full" style={{ background: accent }} />
          </motion.div>
        </div>
      </section>

      {/* faint engineering grid behind the body */}
      <div className="relative">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />

        {/* sticky chapter navigation with scroll-spy */}
        <ChapterNav accent={accent} />

        {/* ============ EDITORIAL: what / why ============ */}
        <section id="overview" className="relative scroll-mt-40 px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <Reveal>
              <Kicker accent={accent}>What it is</Kicker>
              <p className="mt-4 text-lg leading-relaxed text-ec-grey">{industry.whatItIs}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <Kicker accent={accent}>Why it matters for CBAM</Kicker>
              <p className="mt-4 text-lg leading-relaxed text-ec-grey">{industry.whyItMatters}</p>
            </Reveal>
          </div>
        </section>

        {/* ============ KEY STATS ============ */}
        <section className="relative px-6 pb-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
            {industry.keyStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <TiltCard accent={accent} className="card-atlas h-full p-6">
                  <p className="font-display text-3xl font-bold tracking-tight" style={{ color: accent }}>
                    <StatNumber value={s.value} />
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">{s.label}</p>
                  {s.sub && <p className="mt-0.5 text-xs text-ec-grey-75">{s.sub}</p>}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ WORLD PRODUCTION ============ */}
        <section id="production" className="relative scroll-mt-40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading accent={accent} kicker="Worldwide" title="Who makes it" />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="card-atlas p-7">
                <p className="mb-6 text-sm text-ec-grey-75">
                  Share of global output by origin — indicative
                </p>
                <div className="space-y-4">
                  {industry.producers.map((p, i) => (
                    <div key={p.country}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-foreground">{p.country}</span>
                        <span className="font-mono text-ec-grey-75">{p.share}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-ec-grey-15">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.share}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.09, ease: EASE }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${accent}, ${accent}99)`,
                            opacity: 1 - i * 0.09,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emissions breakdown */}
              <div className="card-atlas p-7">
                <p className="mb-6 text-sm text-ec-grey-75">Where the emissions come from</p>
                <div className="mb-5 flex h-4 overflow-hidden rounded-full bg-ec-grey-5">
                  {industry.emissionSources.map((e, i) => (
                    <motion.div
                      key={e.label}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                      style={{ backgroundColor: accent, opacity: 1 - i * 0.2 }}
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  {industry.emissionSources.map((e, i) => (
                    <div key={e.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2.5 text-foreground">
                        <span
                          className="h-2.5 w-2.5 rounded-sm"
                          style={{ backgroundColor: accent, opacity: 1 - i * 0.2 }}
                        />
                        {e.label}
                      </span>
                      <span className="font-mono text-ec-grey-75">{e.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRODUCTION ROUTES ============ */}
        <section id="routes" className="relative scroll-mt-40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading accent={accent} kicker="The numbers" title="Production routes & intensity" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {industry.routes.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.1}>
                  <TiltCard accent={accent} className="card-atlas h-full p-7">
                    <h3 className="font-semibold text-foreground">{r.name}</h3>
                    <p className="mt-4 font-display text-5xl font-bold" style={{ color: accent }}>
                      <StatNumber value={String(r.intensity)} />
                    </p>
                    <p className="mt-0.5 text-xs text-ec-grey-75">tCO₂e / t (indicative)</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-ec-grey-15">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(r.intensity / maxRoute) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
                      />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ec-grey">{r.note}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE NORM ============ */}
        <section id="norms" className="relative scroll-mt-40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading accent={accent} kicker="Best practice" title="What needs to be the norm" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {industry.norms.map((n, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="card-atlas card-atlas-hover flex items-start gap-4 p-6">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${accent}1a`, color: accent }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed text-ec-grey">{n}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRENDS ============ */}
        <section id="trends" className="relative scroll-mt-40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading accent={accent} kicker="On the radar" title="What's trending" icon />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {industry.trends.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <TiltCard accent={accent} className="card-atlas h-full p-7">
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: `${TREND_STYLE[t.tag]}1a`, color: TREND_STYLE[t.tag] }}
                      >
                        {t.tag}
                      </span>
                      <span className="font-mono text-[11px] text-ec-grey-75">{t.date}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-foreground">{t.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ec-grey">{t.body}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA + sector nav ============ */}
        <section className="relative px-6 pb-28 pt-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div
                className="relative overflow-hidden rounded-3xl border border-border p-10 shadow-card sm:p-12"
                style={{ background: `radial-gradient(120% 160% at 0% 0%, ${accent}1f, #ffffff 62%)` }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[80px]"
                  style={{ background: `${accent}33` }}
                />
                <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  Model {industry.name.toLowerCase()} for your imports
                </h2>
                <p className="mt-3 max-w-xl text-ec-grey">
                  Run a deterministic cost scenario, or ask the citation-grounded AI a
                  question scoped to this sector.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                  >
                    <Calculator className="h-4 w-4" />
                    Open the calculator
                  </Link>
                  <Link
                    href="/ai-assistant"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-ec-blue-5"
                  >
                    <Bot className="h-4 w-4" />
                    Ask the AI
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Prev / next — live miniature worlds */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <WorldNavCard industry={prev} dir="prev" />
              <WorldNavCard industry={next} dir="next" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- sticky chapter nav with scroll-spy ---------- */
const CHAPTERS = [
  { id: "overview", label: "Overview" },
  { id: "production", label: "Production" },
  { id: "routes", label: "Routes" },
  { id: "norms", label: "Best practice" },
  { id: "trends", label: "Trends" },
];

function ChapterNav({ accent }: { accent: string }) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      // a band around the upper third of the viewport decides the chapter
      { rootMargin: "-25% 0px -65% 0px" }
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[88px] z-40 border-b border-border bg-white/85 backdrop-blur-md">
      <div className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-2">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                isActive ? "text-white" : "text-ec-grey hover:bg-muted hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="chapter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: accent }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- count-up stat value (handles "~1.9 Gt", "#1", "60%") ---------- */
function StatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    match ? `${match[1]}${v.toFixed(decimals)}${match[3]}` : value
  );

  useEffect(() => {
    if (inView && match) {
      const controls = animateValue(mv, target, { duration: 1.5, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  if (!match) return <span ref={ref}>{value}</span>;
  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ---------- live mini-world prev/next card ---------- */
function WorldNavCard({ industry, dir }: { industry: Industry; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/industries/${industry.id}`}
      className="card-atlas-hover group relative flex h-36 items-end overflow-hidden rounded-2xl border border-border shadow-card"
    >
      <div className="absolute inset-0 scale-[1.02] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]">
        <IndustryScene industry={industry} preview />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
      <div
        className={`relative z-10 flex w-full items-center gap-4 p-5 ${
          dir === "next" ? "flex-row-reverse text-right" : ""
        }`}
      >
        {dir === "prev" ? (
          <ArrowLeft className="h-5 w-5 text-ec-grey-50 transition-transform duration-300 group-hover:-translate-x-1.5" />
        ) : (
          <ArrowRight className="h-5 w-5 text-ec-grey-50 transition-transform duration-300 group-hover:translate-x-1.5" />
        )}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ec-grey-75">
            {dir === "prev" ? "Previous world" : "Next world"}
          </p>
          <p className="font-display text-xl font-bold text-foreground">{industry.name}</p>
        </div>
      </div>
    </Link>
  );
}

/* ---------- cursor-tilt card ---------- */
function TiltCard({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 140, damping: 20 });
  const ry = useSpring(0, { stiffness: 140, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ boxShadow: `0 22px 60px -26px ${accent}55` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- small pieces ---------- */
function Chip({
  children,
  accent,
  muted,
}: {
  children: React.ReactNode;
  accent?: string;
  muted?: boolean;
}) {
  return (
    <span
      className="rounded-full border bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur-sm"
      style={{
        borderColor: accent ? `${accent}55` : "#dbe3ec",
        color: accent ?? (muted ? "#9f9f9f" : "#5a6b85"),
      }}
    >
      {children}
    </span>
  );
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] text-ec-grey-75">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ec-grey-15">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(4, (value / max) * 100)}%` }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Kicker({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="h-px w-8 origin-left"
        style={{ backgroundColor: accent }}
      />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  accent,
  icon,
}: {
  kicker: string;
  title: string;
  accent: string;
  icon?: boolean;
}) {
  return (
    <Reveal>
      <Kicker accent={accent}>{kicker}</Kicker>
      <h2 className="mt-4 flex items-center gap-3 font-display text-4xl font-bold tracking-tight text-foreground">
        {title}
        {icon && <TrendingUp className="h-7 w-7" style={{ color: accent }} />}
      </h2>
    </Reveal>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
