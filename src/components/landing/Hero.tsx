"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { ICONS } from "@/components/landing/icon-map";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: 0.15 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};
const line1 = ["The", "atlas", "of"];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-16">
      {/* ambient aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-emerald animate-aurora-1 left-[-8%] top-[6%] h-[34vw] w-[34vw]" />
        <div className="aurora aurora-violet animate-aurora-2 right-[-6%] top-[16%] h-[30vw] w-[30vw]" />
        <div className="aurora aurora-cobalt animate-aurora-1 bottom-[-6%] left-[28%] h-[26vw] w-[26vw]" style={{ animationDelay: "4s" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 blueprint opacity-[0.35]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
          The verified source of truth for carbon border regimes
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-6xl font-semibold leading-[0.92] tracking-tightest sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden pb-1">
            <span className="flex flex-wrap gap-x-5">
              {line1.map((w, i) => (
                <motion.span key={w} custom={i} variants={wordVariants} initial="hidden" animate="show" className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient"
          >
            carbon border compliance.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          A verified community and a non-hallucinating AI, mapping every regime and
          every heavy industry — steel to electricity. Answers grounded only in
          cited regulation. Numbers from tested code, never a guess.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 shadow-xl transition-all hover:-translate-y-0.5"
          >
            Explore the industries
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/ai-assistant"
            className="shine inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/25"
          >
            Try the AI
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/45"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Citation-grounded, ~0% hallucination
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-secondary" />
            EU ETS €65/t · live
          </span>
        </motion.div>

        {/* Industry world rail */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-14"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Step into a world →
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ICONS[ind.icon];
              return (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.06 }}
                >
                  <Link
                    href={`/industries/${ind.id}`}
                    className={`world group relative flex h-28 w-44 shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-3 ${ind.world}`}
                  >
                    <div className="absolute inset-0 blueprint opacity-30" />
                    <div
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${ind.accent}26`, color: ind.accent }}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </div>
                    <div className="relative">
                      <p className="font-display text-sm font-semibold text-white">{ind.name}</p>
                      <p className="font-mono text-[10px] text-white/50">{ind.cn}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
