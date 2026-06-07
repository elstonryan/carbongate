"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calculator,
  Bot,
  TrendingUp,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { IndustryBackground } from "@/components/industry/IndustryBackground";
import { ICONS } from "@/components/landing/icon-map";
import { INDUSTRIES, type Industry } from "@/lib/industries";

const TREND_STYLE: Record<string, string> = {
  Policy: "#5b53b8",
  Market: "#006fb4",
  Technology: "#2f7d33",
  Trade: "#b07d1e",
};

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

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ============ HERO (light sector panel) ============ */}
      <section className="world relative flex min-h-[78vh] flex-col justify-end overflow-hidden border-b border-border px-6 pb-16 pt-36">
        <IndustryBackground industry={industry} intensity={0.5} />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ec-grey-75 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              All industries
            </Link>
          </motion.div>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                {Icon && <Icon className="h-8 w-8" />}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="font-display text-5xl font-bold leading-[1] tracking-tightest text-foreground sm:text-6xl"
              >
                {industry.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-5 max-w-xl text-lg leading-relaxed text-ec-grey"
              >
                {industry.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                <Chip>{industry.cn}</Chip>
                {industry.inEU && <Chip accent="#004494">EU CBAM</Chip>}
                {industry.inUK && <Chip accent="#006fb4">UK CBAM</Chip>}
                {!industry.inUK && <Chip muted>Not in UK scope</Chip>}
              </motion.div>
            </div>

            {/* Headline intensity card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass w-full max-w-sm rounded-xl p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ec-grey-75">
                Default intensity
              </p>
              <p className="mt-1 font-display text-5xl font-bold" style={{ color: accent }}>
                {industry.defaultIntensity.low}–{industry.defaultIntensity.high}
              </p>
              <p className="text-sm text-ec-grey-75">{industry.defaultIntensity.unit}</p>

              <div className="mt-5 space-y-2">
                <Bar label="Default" value={industry.defaultIntensity.high} max={industry.defaultIntensity.high} color="#da2130" />
                <Bar label="Verified (typical)" value={industry.verifiedTypical.low} max={industry.defaultIntensity.high} color={accent} />
              </div>
              <p className="mt-4 rounded-lg bg-ec-blue-5 p-3 text-xs text-ec-grey">
                Verified data can cut this by up to{" "}
                <span className="font-bold" style={{ color: accent }}>
                  {savingPct}%
                </span>{" "}
                versus the punitive default — the importer&apos;s hook.
              </p>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-ec-grey-50">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            ↓
          </motion.div>
        </div>
      </section>

      {/* ============ EDITORIAL: what / why ============ */}
      <section className="relative px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
              What it is
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ec-grey">{industry.whatItIs}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
              Why it matters for CBAM
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ec-grey">{industry.whyItMatters}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ KEY STATS ============ */}
      <section className="relative px-6 pb-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
          {industry.keyStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="card-atlas h-full p-5">
                <p className="font-display text-3xl font-bold tracking-tight" style={{ color: accent }}>
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
                {s.sub && <p className="text-xs text-ec-grey-75">{s.sub}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ WORLD PRODUCTION ============ */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading accent={accent} kicker="Worldwide" title="Who makes it" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="card-atlas p-6">
              <p className="mb-5 text-sm text-ec-grey-75">
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
                        transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            i === 0
                              ? accent
                              : `linear-gradient(90deg, ${accent}cc, ${accent}66)`,
                          opacity: 1 - i * 0.1,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emissions breakdown */}
            <div className="card-atlas p-6">
              <p className="mb-5 text-sm text-ec-grey-75">Where the emissions come from</p>
              <div className="mb-4 flex h-4 overflow-hidden rounded-full">
                {industry.emissionSources.map((e, i) => (
                  <motion.div
                    key={e.label}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${e.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ backgroundColor: accent, opacity: 1 - i * 0.18 }}
                  />
                ))}
              </div>
              <div className="space-y-2.5">
                {industry.emissionSources.map((e, i) => (
                  <div key={e.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: accent, opacity: 1 - i * 0.18 }}
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
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading accent={accent} kicker="The numbers" title="Production routes & intensity" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {industry.routes.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <div className="card-atlas h-full p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-foreground">{r.name}</h3>
                  </div>
                  <p className="mt-3 font-display text-4xl font-bold" style={{ color: accent }}>
                    {r.intensity}
                  </p>
                  <p className="text-xs text-ec-grey-75">tCO₂e / t (indicative)</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-ec-grey-15">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(r.intensity / maxRoute) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-ec-grey">{r.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE NORM ============ */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading accent={accent} kicker="Best practice" title="What needs to be the norm" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {industry.norms.map((n, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
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
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading accent={accent} kicker="On the radar" title="What's trending" icon />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {industry.trends.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="card-atlas card-atlas-hover group h-full p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ backgroundColor: `${TREND_STYLE[t.tag]}1a`, color: TREND_STYLE[t.tag] }}
                    >
                      {t.tag}
                    </span>
                    <span className="font-mono text-[11px] text-ec-grey-75">{t.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ec-grey">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA + sector nav ============ */}
      <section className="relative px-6 pb-24 pt-8">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-2xl border border-border p-10"
            style={{ background: `radial-gradient(120% 140% at 0% 0%, ${accent}14, #ffffff 60%)` }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground">
              Model {industry.name.toLowerCase()} for your imports
            </h2>
            <p className="mt-2 max-w-xl text-ec-grey">
              Run a deterministic cost scenario, or ask the citation-grounded AI a
              question scoped to this sector.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
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

          {/* Prev / next */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href={`/industries/${prev.id}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5 text-ec-grey-50 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="text-xs text-ec-grey-75">Previous</p>
                <p className="font-display text-lg font-bold text-foreground">{prev.name}</p>
              </div>
            </Link>
            <Link
              href={`/industries/${next.id}`}
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-white p-5 text-right transition-colors hover:bg-muted"
            >
              <div>
                <p className="text-xs text-ec-grey-75">Next</p>
                <p className="font-display text-lg font-bold text-foreground">{next.name}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-ec-grey-50 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
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
      className="rounded-full border px-3 py-1 text-xs font-medium"
      style={{
        borderColor: accent ? `${accent}55` : "#dbe3ec",
        backgroundColor: accent ? `${accent}14` : "#eef2f7",
        color: accent ? accent : muted ? "#9f9f9f" : "#5a6b85",
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
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
      <div className="flex items-center gap-2">
        <span className="h-px w-8" style={{ backgroundColor: accent }} />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
          {kicker}
        </span>
      </div>
      <h2 className="mt-3 flex items-center gap-3 font-display text-4xl font-bold tracking-tight text-foreground">
        {title}
        {icon && <TrendingUp className="h-7 w-7" style={{ color: accent }} />}
      </h2>
    </Reveal>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
