"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { IndustryScene } from "@/components/industry/IndustryScene";
import { ICONS } from "@/components/landing/icon-map";
import { INDUSTRIES } from "@/lib/industries";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const card = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export default function IndustriesIndexPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-emerald left-[-10%] top-[2%] h-[30vw] w-[30vw]" />
        <div className="aurora aurora-cobalt right-[-8%] top-[16%] h-[26vw] w-[26vw]" />
      </div>

      {/* Header */}
      <section className="relative px-6 pt-36">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-ec-grey transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-3xl"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The Carbon Atlas
              </span>
            </div>
            <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tightest text-foreground sm:text-7xl">
              Six industries.
              <br />
              <span className="text-gradient">One carbon border.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ec-grey">
              Every CBAM sector has its own chemistry, its own producers and its
              own decarbonisation path. Step into each world for the worldwide
              data, the emerging norms and what&apos;s trending now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry worlds — each card is a living miniature of its sector */}
      <section className="relative px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div key={ind.id} variants={card}>
                <Link
                  href={`/industries/${ind.id}`}
                  className="group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-border p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {/* living scene */}
                  <div className="absolute inset-0 scale-[1.03] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08]">
                    <IndustryScene industry={ind} preview />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/25 to-transparent" />

                  {/* icon */}
                  <div
                    className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/85 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{
                      borderColor: `${ind.accent}45`,
                      color: ind.accent,
                      boxShadow: `0 10px 30px -10px ${ind.accent}88`,
                    }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>

                  {/* intensity chip */}
                  <div className="absolute right-6 top-6 rounded-full border border-border bg-white/85 px-3 py-1 font-mono text-xs text-ec-grey backdrop-blur">
                    {ind.defaultIntensity.low}–{ind.defaultIntensity.high} {ind.defaultIntensity.unit}
                  </div>

                  {/* content */}
                  <div className="relative">
                    <p className="font-mono text-xs text-ec-grey-75">{ind.cn}</p>
                    <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
                      {ind.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ec-grey">
                      {ind.tagline}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1.5"
                      style={{ color: ind.accent }}
                    >
                      Enter the world
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* footer strip */}
      <footer className="relative px-6 pb-16 pt-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ec-grey-75">
            Figures are indicative — verify against primary sources before relying
            on them for a filing.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
          >
            Enter the platform
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
