"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { ICONS } from "@/components/landing/icon-map";
import { INDUSTRIES } from "@/lib/industries";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function IndustriesIndexPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav variant="dark" />

      {/* Header */}
      <section className="relative px-6 pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 max-w-3xl"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The Carbon Atlas
              </span>
            </div>
            <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl">
              Six industries.
              <br />
              <span className="text-gradient">One carbon border.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
              Every CBAM sector has its own chemistry, its own producers and its
              own decarbonisation path. Step into each world for the worldwide
              data, the emerging norms and what&apos;s trending now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry worlds grid */}
      <section className="relative px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div key={ind.id} variants={card}>
                <Link
                  href={`/industries/${ind.id}`}
                  className={`world group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-6 ${ind.world}`}
                >
                  {/* blueprint + accent wash */}
                  <div className="absolute inset-0 blueprint opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl transition-all duration-500 group-hover:scale-125"
                    style={{ background: ind.accent }}
                  />

                  {/* icon */}
                  <div
                    className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: `${ind.accent}26`, color: ind.accent, boxShadow: `0 0 30px -8px ${ind.accent}` }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>

                  {/* intensity chip */}
                  <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur">
                    {ind.defaultIntensity.low}–{ind.defaultIntensity.high} {ind.defaultIntensity.unit}
                  </div>

                  {/* content */}
                  <div className="relative">
                    <p className="font-mono text-xs text-white/50">{ind.cn}</p>
                    <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                      {ind.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-white/65">{ind.tagline}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                      style={{ color: ind.accent }}
                    >
                      Explore world
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">
            Figures are indicative — verify against primary sources before relying
            on them for a filing.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            Enter the platform
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
