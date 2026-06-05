"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const REGIME_CARDS = [
  { code: "EU", label: "EU CBAM", status: "Live · definitive", color: "#10b981", x: "8%", y: "18%", delay: 0 },
  { code: "UK", label: "UK CBAM", status: "Live 1 Jan 2027", color: "#3b82f6", x: "78%", y: "12%", delay: 0.15 },
  { code: "US", label: "United States", status: "Monitoring", color: "#f59e0b", x: "84%", y: "62%", delay: 0.3 },
  { code: "IN", label: "India", status: "Exporter market", color: "#8b5cf6", x: "5%", y: "66%", delay: 0.45 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Animated gradient mesh + grid */}
      <div className="absolute inset-0 gradient-mesh opacity-70" />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Floating regime cards (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {REGIME_CARDS.map((card) => (
          <motion.div
            key={card.code}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 + card.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: card.x, top: card.y }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
              className="glass flex items-center gap-3 rounded-xl px-4 py-3 shadow-2xl"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold"
                style={{ backgroundColor: `${card.color}22`, color: card.color }}
              >
                {card.code}
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground">{card.label}</p>
                <p className="text-[10px] text-muted-foreground">{card.status}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Center content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Multi-regime · citation-grounded · verified community
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          The verified source of truth for{" "}
          <span className="text-gradient">carbon border compliance</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          One platform for every carbon border adjustment regime you&apos;re
          exposed to — EU CBAM in depth, UK fast-follow, US and others monitored.
          A non-hallucinating AI that answers only from a curated, citable corpus
          and refuses to guess.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group">
            <Link href="/dashboard">
              Enter the platform
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/auth/signup">
              <ShieldCheck className="text-primary" />
              Request verified access
            </Link>
          </Button>
        </motion.div>

        <motion.p variants={item} className="mt-5 text-xs text-muted-foreground/70">
          Gated to verified carbon-border professionals · GDPR &amp; UK-GDPR compliant
        </motion.p>
      </motion.div>
    </section>
  );
}
