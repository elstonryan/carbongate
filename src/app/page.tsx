"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Search, Calculator, Ban } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { IndustryShowcase } from "@/components/landing/IndustryShowcase";
import { VerticalsBento } from "@/components/landing/VerticalsBento";
import { StatsBar } from "@/components/landing/StatsBar";

const STEPS = [
  { icon: ShieldCheck, title: "Get verified", body: "Apply with your role, regime exposure and company. A gated community is only as valuable as the trust behind it.", hex: "#004494" },
  { icon: Search, title: "Ask with confidence", body: "Query the AI per regime. Every answer is grounded in a citable corpus, with a confidence level and an 'as of' date.", hex: "#006fb4" },
  { icon: Calculator, title: "Calculate & comply", body: "Run deterministic cost scenarios, track deadlines and prices, and tap a directory of accredited experts.", hex: "#2f7d33" },
];

const FOOTER_COLS = [
  { title: "Platform", links: ["AI Assistant", "Calculator", "Community", "Library", "Directory"] },
  { title: "Regimes", links: ["EU CBAM (live)", "UK CBAM (2027)", "US (monitoring)", "All regimes"] },
  { title: "Company", links: ["About", "Pricing", "Apply to join", "Contact"] },
  { title: "Legal", links: ["Privacy & GDPR", "Terms", "Not legal advice", "Data residency"] },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SiteNav />

      <main className="relative z-10">
        <Hero />
        <IndustryShowcase />
        <VerticalsBento />

        {/* Trust */}
        <section id="trust" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Trust is the product
                </span>
                <span className="h-px w-8 bg-primary" />
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-foreground sm:text-5xl">
                An AI that refuses to guess
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ec-grey">
                In a compliance product, a confident wrong answer is the failure
                mode. So ours is engineered to say{" "}
                <span className="font-semibold text-foreground">
                  &ldquo;I don&apos;t have reliable data on this&rdquo;
                </span>{" "}
                — and route you to a verified expert instead.
              </p>
            </motion.div>

            <div className="mt-14">
              <StatsBar />
            </div>

            {/* 13-layer callout */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-atlas mt-6 overflow-hidden p-8"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
                <div className="flex shrink-0 items-center justify-center rounded-xl bg-danger/10 p-6 text-danger">
                  <Ban className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wide text-danger">
                    13 stacked anti-hallucination layers
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-ec-grey">
                    Corpus quality gate → retrieval grounding → hybrid search →
                    reranking → confidence gate → constrained generation →
                    structured output → faithfulness check → citation integrity →
                    scope guardrail → human review → continuous evaluation → full
                    audit trail.{" "}
                    <span className="font-semibold text-foreground">
                      A wrong claim has to beat all of them.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* How it works */}
            <div className="mt-20">
              <h3 className="mb-10 text-center font-display text-2xl font-bold text-foreground">
                From verified access to confident compliance — in three steps
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="card-atlas card-atlas-hover relative overflow-hidden p-7"
                    >
                      <span className="absolute right-6 top-5 font-display text-5xl font-bold text-ec-grey-15">
                        0{i + 1}
                      </span>
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: `${step.hex}1a`, color: step.hex }}>
                        <Icon className="h-7 w-7" />
                      </span>
                      <h4 className="mt-5 font-display text-xl font-bold text-foreground">{step.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-ec-grey">{step.body}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative px-6 pb-24 pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="ec-band-grad relative mx-auto max-w-6xl overflow-hidden rounded-2xl px-8 py-16 text-center"
          >
            <div className="pointer-events-none absolute inset-0 blueprint opacity-20" />
            <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tightest text-white sm:text-5xl">
                Stop guessing at the carbon border.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                Join the verified community and the most reliable carbon-border AI
                in existence — EU CBAM deep, UK fast-follow, the world next.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/onboarding" className="group inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-card transition-all hover:bg-ec-blue-5">
                  Apply to join
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10">
                  Explore the industries
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary text-[13px] font-bold text-white">
                    CG
                    <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-[17px] font-bold tracking-tight text-foreground">
                    Carbon<span className="text-primary">Gate</span>
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ec-grey-75">
                  The verified source of truth for carbon border adjustment regimes —
                  a gated professional community and a citation-grounded AI.
                </p>
              </div>

              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l}>
                        <span className="cursor-pointer text-sm text-ec-grey-75 transition-colors hover:text-primary">
                          {l}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-ec-grey-75 sm:flex-row sm:items-center">
              <p>© 2026 CarbonGate · Global Carbon Border Compliance Platform</p>
              <p>
                Independent — not affiliated with or endorsed by the European
                Commission · Demo build with mock data · Not legal advice
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
