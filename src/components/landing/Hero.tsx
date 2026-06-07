"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { INDUSTRIES } from "@/lib/landing-data";
import { ICONS } from "@/components/landing/icon-map";
import { Marquee } from "@/components/landing/Marquee";

const headline = ["Carbon", "border", "compliance,", "made"];

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Floating industry chips positioned around the hero
const FLOATERS = [
  { id: "steel", top: "16%", left: "6%", delay: "0s", r: "-8deg" },
  { id: "aluminium", top: "60%", left: "3%", delay: "1.2s", r: "6deg" },
  { id: "cement", top: "24%", right: "5%", delay: "0.6s", r: "7deg" },
  { id: "hydrogen", top: "64%", right: "4%", delay: "1.8s", r: "-6deg" },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Floating industry chips (desktop only) */}
      {FLOATERS.map((f) => {
        const ind = INDUSTRIES.find((i) => i.id === f.id)!;
        const Icon = ICONS[ind.icon];
        return (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute z-10 hidden lg:block"
            style={{
              top: f.top,
              left: "left" in f ? f.left : undefined,
              right: "right" in f ? (f as { right: string }).right : undefined,
            }}
          >
            <div
              className="animate-float-soft glass-light flex items-center gap-2.5 rounded-2xl px-4 py-3"
              style={{ ["--r" as string]: f.r, animationDelay: f.delay }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: ind.tint, color: ind.hex }}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">{ind.name}</p>
                <p className="font-mono text-[11px] text-slate-500">
                  {ind.intensity} {ind.unit}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Center column */}
      <div className="relative z-20 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The verified source of truth for carbon border regimes
        </motion.div>

        {/* Headline with word reveal */}
        <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
          <span className="block overflow-hidden pb-2">
            <span className="flex flex-wrap justify-center gap-x-4">
              {headline.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 block text-bright-gradient"
          >
            actually trustworthy.
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
        >
          A gated community of carbon-border professionals, served by an AI that
          answers <span className="font-semibold text-slate-900">only from cited regulation</span> and
          a calculator where every number comes from tested code — across EU CBAM,
          UK CBAM, and the regimes coming next.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Explore the platform
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/ai-assistant"
            className="shine inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-7 py-3.5 text-base font-semibold text-slate-900 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-400"
          >
            Try the AI
          </Link>
        </motion.div>

        {/* Trust micro-row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Citation-grounded, ~0% hallucination
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            EU ETS €65/t · live
          </span>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="relative z-20 mt-14 w-full max-w-6xl"
      >
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Six sectors · Eight regimes · One platform
        </p>
        <Marquee />
      </motion.div>
    </section>
  );
}
