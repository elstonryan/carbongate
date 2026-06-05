"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Database, ShieldCheck, ArrowRight } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { StatsBar } from "@/components/landing/StatsBar";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: ShieldCheck,
    title: "Get verified",
    body: "Apply with your role, regime exposure and company. A gated community is only as valuable as the trust behind it.",
  },
  {
    icon: Search,
    title: "Ask with confidence",
    body: "Query the AI per regime. Every answer is grounded in a citable corpus, carries a confidence level and an 'as of' date.",
  },
  {
    icon: Database,
    title: "Calculate & comply",
    body: "Run deterministic cost scenarios, track deadlines and prices, and tap a directory of accredited experts.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-background">
              C
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Carbon<span className="text-primary">Gate</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/signin">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/dashboard">Launch app</Link>
            </Button>
          </nav>
        </div>
      </header>

      <Hero />

      {/* Below the fold */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14">
          <StatsBar />
        </div>

        {/* How it works */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How it works
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              From verified access to confident compliance in three steps.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative rounded-xl border border-border bg-card/60 p-6 backdrop-blur-xl"
                >
                  <span className="absolute right-5 top-5 font-mono text-3xl font-bold text-white/5">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything a carbon-border professional needs
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ten verticals, one regime-aware platform.
            </p>
          </div>
          <FeatureGrid />
        </div>

        {/* Regime coverage */}
        <div className="mb-20 rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Built multi-regime from day one
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Every record is tagged by regime and the calculation engine is
              modular. Launch EU deep, fast-follow UK, monitor the rest — without
              re-architecting.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <RegimeBadge regime="EU" />
              <RegimeBadge regime="UK" />
              <RegimeBadge regime="US" />
              <RegimeBadge regime="IN" />
              <RegimeBadge regime="CA" />
              <RegimeBadge regime="AU" />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-secondary/10 p-10 text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trust is the entire value proposition.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              An AI that says &ldquo;I don&apos;t have reliable data on this&rdquo;
              is worth more than one that always answers. Come see the discipline.
            </p>
            <Button asChild size="lg" className="group mt-6">
              <Link href="/dashboard">
                Enter the platform
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <footer className="mt-16 border-t border-border pt-8 text-center text-xs text-muted-foreground/70">
          CarbonGate · Global Carbon Border Compliance Platform · Demo build with
          mock data · Not legal advice
        </footer>
      </section>
    </main>
  );
}
