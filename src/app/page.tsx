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
  { icon: ShieldCheck, title: "Get verified", body: "Apply with your role, regime exposure and company. A gated community is only as valuable as the trust behind it.", hex: "#34d399" },
  { icon: Search, title: "Ask with confidence", body: "Query the AI per regime. Every answer is grounded in a citable corpus, with a confidence level and an 'as of' date.", hex: "#38e1d6" },
  { icon: Calculator, title: "Calculate & comply", body: "Run deterministic cost scenarios, track deadlines and prices, and tap a directory of accredited experts.", hex: "#a78bfa" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SiteNav variant="dark" />

      <main className="relative z-10">
        <Hero />
        <IndustryShowcase />
        <VerticalsBento />

        {/* Trust */}
        <section id="trust" className="relative px-6 py-28">
          <div className="mx-auto max-w-6xl">
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
              <h2 className="mt-4 font-display text-5xl font-semibold tracking-tightest sm:text-6xl">
                An AI that refuses to guess
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                In a compliance product, a confident wrong answer is the failure
                mode. So ours is engineered to say{" "}
                <span className="font-semibold text-white">
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
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-danger/10 p-6 text-danger">
                  <Ban className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wide text-danger">
                    13 stacked anti-hallucination layers
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-white/75">
                    Corpus quality gate → retrieval grounding → hybrid search →
                    reranking → confidence gate → constrained generation →
                    structured output → faithfulness check → citation integrity →
                    scope guardrail → human review → continuous evaluation → full
                    audit trail.{" "}
                    <span className="font-semibold text-white">
                      A wrong claim has to beat all of them.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* How it works */}
            <div className="mt-20">
              <h3 className="mb-10 text-center font-display text-2xl font-semibold text-white">
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
                      className="card-atlas relative overflow-hidden p-7"
                    >
                      <span className="absolute right-6 top-5 font-display text-5xl font-bold text-white/[0.06]">
                        0{i + 1}
                      </span>
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${step.hex}1f`, color: step.hex }}>
                        <Icon className="h-7 w-7" />
                      </span>
                      <h4 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative px-6 pb-28 pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-16 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="aurora aurora-emerald left-[10%] top-[-30%] h-80 w-80 opacity-40" />
              <div className="aurora aurora-cobalt right-[5%] top-[10%] h-72 w-72 opacity-40" />
              <div className="aurora aurora-violet bottom-[-30%] left-[40%] h-72 w-72 opacity-40" />
            </div>
            <div className="absolute inset-0 blueprint opacity-30" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-5xl font-semibold tracking-tightest text-white">
                Stop guessing at the carbon border.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">
                Join the verified community and the most reliable carbon-border AI
                in existence — EU CBAM deep, UK fast-follow, the world next.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/onboarding" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-all hover:-translate-y-0.5">
                  Apply to join
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  Explore the industries
                </Link>
              </div>
            </div>
          </motion.div>

          <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 via-teal-300 to-violet-400 text-sm font-black text-[#06120c]">
                C
              </span>
              <span className="font-display text-sm font-semibold text-white">
                Carbon<span className="text-gradient">Gate</span>
              </span>
            </div>
            <p className="text-xs text-white/40">
              Global Carbon Border Compliance Platform · Demo build with mock data · Not legal advice
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
