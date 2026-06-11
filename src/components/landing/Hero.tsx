"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { IndustryScene } from "@/components/industry/IndustryScene";

const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD_MS = 9000;

const HEADLINE = "Carbon border compliance,";

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const world = INDUSTRIES[active];

  /* auto-advance through the six worlds; hovering a sector chip takes over */
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % INDUSTRIES.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [active, reduce]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-10 pt-32">
      {/* Living world backdrop — cross-fades between the six sectors */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={world.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            <IndustryScene industry={world} scrim="top" />
          </motion.div>
        </AnimatePresence>
        {/* extra wash behind the headline column */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/65 via-white/25 to-transparent lg:w-2/3" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — message */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ec-blue-25 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
            The verified source of truth for carbon border regimes
          </motion.div>

          <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.06] tracking-tightest text-foreground sm:text-6xl lg:text-[4.1rem]">
            {HEADLINE.split(" ").map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))}
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="text-bright-gradient inline-block"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.34, duration: 0.8, ease: EASE }}
              >
                grounded in citations.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ec-grey"
          >
            A gated community of verified carbon-border professionals, served by a
            non-hallucinating AI that answers only from cited regulation — across
            EU and UK CBAM. Numbers come from a tested engine, never a guess.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/onboarding"
              className="glow-brand group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Apply to join
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white/85 px-6 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white"
            >
              Try the AI assistant
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ec-grey"
          >
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
          </motion.div>
        </div>

        {/* Right — floating product proof card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          className="relative"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-xl border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-xl">
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

            {/* floating ETS chip */}
            <div className="animate-float-soft absolute -bottom-4 -left-4 hidden rounded-lg border border-border bg-white p-3 shadow-card sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ec-grey-75">
                EU ETS
              </p>
              <p className="text-lg font-bold text-foreground">
                €65.00<span className="text-xs font-medium text-success"> ▲</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sectors rail — hover (or wait) to switch the world behind */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl pt-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ec-grey"
        >
          Sectors in scope — <span className="hidden sm:inline">hover to switch the world, </span>click to step inside
        </motion.p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ICONS[ind.icon];
            const isActive = i === active;
            return (
              <Link
                key={ind.id}
                href={`/industries/${ind.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative flex flex-col gap-2 overflow-hidden rounded-lg border p-3.5 backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "-translate-y-0.5 bg-white/95"
                    : "bg-white/75 hover:-translate-y-0.5 hover:bg-white/90"
                }`}
                style={{
                  borderColor: isActive ? ind.accent : "#dbe3ec",
                  boxShadow: isActive ? `0 14px 36px -14px ${ind.accent}99` : undefined,
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md border bg-white/90"
                  style={{ borderColor: `${ind.accent}40`, color: ind.accent }}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{ind.name}</span>
                  <span className="block font-mono text-[10px] text-ec-grey-75">{ind.cn}</span>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="world-underline"
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full"
                    style={{ backgroundColor: ind.accent }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
