"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  FileText,
  Check,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { ICONS } from "@/components/landing/icon-map";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-16">
      {/* faint institutional ambience */}
      <div className="pointer-events-none absolute inset-0 blueprint opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-emerald left-[-10%] top-[2%] h-[30vw] w-[30vw]" />
        <div className="aurora aurora-cobalt right-[-8%] top-[12%] h-[26vw] w-[26vw]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — message */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ec-blue-25 bg-ec-blue-5 px-3.5 py-1.5 text-xs font-semibold text-primary"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
            The verified source of truth for carbon border regimes
          </motion.div>

          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tightest text-foreground sm:text-6xl">
            Carbon border compliance,
            <span className="block text-primary">grounded in citations.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ec-grey">
            A gated community of verified carbon-border professionals, served by a
            non-hallucinating AI that answers only from cited regulation — across
            EU and UK CBAM. Numbers come from a tested engine, never a guess.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/onboarding"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:bg-primary-dark"
            >
              Apply to join
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-6 py-3.5 text-base font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-ec-blue-5"
            >
              Try the AI assistant
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ec-grey-75">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Citation-grounded, &lt;1% hallucination target
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-secondary" />
              Verified members only
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-success" />
              EU ETS €65/t · live
            </span>
          </div>
        </div>

        {/* Right — product proof card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-white">
                  AI
                </span>
                <span className="text-sm font-semibold text-foreground">
                  CBAM Assistant
                </span>
              </div>
              <span className="rounded-full bg-ec-blue-5 px-2.5 py-1 text-[11px] font-semibold text-primary">
                EU CBAM
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-foreground">
              &ldquo;Do I have to surrender CBAM certificates for steel imported in
              2026?&rdquo;
            </p>

            <div className="mt-3 rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                  <Check className="h-3 w-3" /> High confidence
                </span>
                <span className="text-[11px] text-ec-grey-75">as of 1 Jun 2026</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ec-grey">
                Yes. From 1 January 2026 authorised declarants must surrender
                certificates equal to the embedded emissions of imported steel, with
                the annual return due by 31 May the following year.
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-md border border-ec-blue-25 bg-ec-blue-5 px-2.5 py-1.5">
                <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-[11px] font-medium text-primary">
                  EU Regulation 2023/956 — Article 22
                </span>
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ec-grey-75">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Every claim cited. If the corpus can&apos;t support an answer, it says so.
            </p>
          </div>

          {/* floating ETS chip for density */}
          <div className="absolute -bottom-4 -left-4 hidden rounded-lg border border-border bg-white p-3 shadow-card sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ec-grey-75">
              EU ETS
            </p>
            <p className="text-lg font-bold text-foreground">
              €65.00<span className="text-xs font-medium text-success"> ▲</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Sectors rail */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ec-grey-75">
          Sectors in scope
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <Link
                key={ind.id}
                href={`/industries/${ind.id}`}
                className={`world card-atlas-hover group relative flex flex-col gap-2 rounded-lg border border-border p-3.5 ${ind.world}`}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${ind.accent}1a`, color: ind.accent }}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{ind.name}</p>
                  <p className="font-mono text-[10px] text-ec-grey-75">{ind.cn}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
