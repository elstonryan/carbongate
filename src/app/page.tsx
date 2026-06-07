"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Search, Calculator, Ban } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { IndustryShowcase } from "@/components/landing/IndustryShowcase";
import { VerticalsBento } from "@/components/landing/VerticalsBento";
import { StatsBar } from "@/components/landing/StatsBar";

const STEPS = [
  {
    icon: ShieldCheck,
    title: "Get verified",
    body: "Apply with your role, regime exposure and company. A gated community is only as valuable as the trust behind it.",
    hex: "#10b981",
  },
  {
    icon: Search,
    title: "Ask with confidence",
    body: "Query the AI per regime. Every answer is grounded in a citable corpus, with a confidence level and an 'as of' date.",
    hex: "#2563eb",
  },
  {
    icon: Calculator,
    title: "Calculate & comply",
    body: "Run deterministic cost scenarios, track deadlines and prices, and tap a directory of accredited experts.",
    hex: "#7c3aed",
  },
];

export default function LandingPage() {
  return (
    <div className="landing-canvas grain relative min-h-screen overflow-hidden">
      {/* Animated aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora aurora-emerald animate-aurora-1 left-[-10%] top-[-5%] h-[40vw] w-[40vw]" />
        <div className="aurora aurora-cobalt animate-aurora-2 right-[-8%] top-[10%] h-[35vw] w-[35vw]" />
        <div className="aurora aurora-amber animate-aurora-1 bottom-[5%] left-[20%] h-[30vw] w-[30vw]" style={{ animationDelay: "3s" }} />
        <div className="aurora aurora-violet animate-aurora-2 bottom-[20%] right-[15%] h-[28vw] w-[28vw]" style={{ animationDelay: "5s" }} />
      </div>

      <LandingNav />

      <main className="relative z-10">
        <Hero />
        <IndustryShowcase />
        <VerticalsBento />

        {/* Trust + How it works */}
        <section id="trust" className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-12 max-w-2xl text-center"
            >
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Trust is the product
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                An AI that refuses to guess
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                In a compliance product, a confident wrong answer is the failure
                mode. So ours is engineered to say{" "}
                <span className="font-semibold text-slate-900">
                  &ldquo;I don&apos;t have reliable data on this&rdquo;
                </span>{" "}
                — and route you to a verified expert instead.
              </p>
            </motion.div>

            {/* Stats */}
            <StatsBar />

            {/* The refusal callout */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-rose-50 p-6 text-rose-500">
                  <Ban className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
                    13 stacked anti-hallucination layers
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-slate-700">
                    Corpus quality gate → retrieval grounding → hybrid search →
                    reranking → confidence gate → constrained generation →
                    structured output → faithfulness check → citation integrity →
                    scope guardrail → human review → continuous evaluation →
                    full audit trail.{" "}
                    <span className="font-semibold text-slate-900">
                      A wrong claim has to beat all of them.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* How it works */}
            <div className="mt-20">
              <h3 className="mb-10 text-center text-2xl font-bold text-slate-900">
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
                      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                    >
                      <span
                        className="absolute right-6 top-5 font-mono text-5xl font-black"
                        style={{ color: `${step.hex}14` }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${step.hex}1a`, color: step.hex }}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <h4 className="mt-5 text-lg font-bold text-slate-900">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {step.body}
                      </p>
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
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center shadow-2xl"
          >
            {/* Gradient glow inside CTA */}
            <div className="pointer-events-none absolute inset-0">
              <div className="aurora aurora-emerald left-[10%] top-[-30%] h-[20rem] w-[20rem] opacity-40" />
              <div className="aurora aurora-cobalt right-[5%] top-[10%] h-[18rem] w-[18rem] opacity-40" />
              <div className="aurora aurora-violet bottom-[-30%] left-[40%] h-[18rem] w-[18rem] opacity-40" />
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Stop guessing at the carbon border.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Join the verified community and the most reliable carbon-border AI
                in existence — EU CBAM deep, UK fast-follow, the world next.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/onboarding"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Apply to join
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore first
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500 text-sm font-black text-white">
                C
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Carbon<span className="text-bright-gradient">Gate</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Global Carbon Border Compliance Platform · Demo build with mock data
              · Not legal advice
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
