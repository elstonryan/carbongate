"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { ICONS } from "@/components/landing/icon-map";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function IndustryShowcase() {
  return (
    <section id="industries" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The industries in scope
            </span>
          </div>
          <h2 className="mt-4 font-display text-5xl font-semibold tracking-tightest sm:text-6xl">
            Six worlds that carry
            <br />
            <span className="text-gradient">the carbon.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Each sector has its own chemistry and its own data. Click into any
            world for worldwide production, emerging norms and what&apos;s trending.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div key={ind.id} variants={card}>
                <Link
                  href={`/industries/${ind.id}`}
                  className={`world group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-6 ${ind.world}`}
                >
                  <div className="absolute inset-0 blueprint opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl transition-all duration-500 group-hover:scale-125"
                    style={{ background: ind.accent }}
                  />
                  <div
                    className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: `${ind.accent}26`, color: ind.accent, boxShadow: `0 0 30px -8px ${ind.accent}` }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur">
                    {ind.defaultIntensity.low}–{ind.defaultIntensity.high}
                  </div>
                  <div className="relative">
                    <p className="font-mono text-xs text-white/50">{ind.cn}</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                      {ind.name}
                    </h3>
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
      </div>
    </section>
  );
}
