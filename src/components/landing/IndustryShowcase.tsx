"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { ICONS } from "@/components/landing/icon-map";
import { IndustryScene } from "@/components/industry/IndustryScene";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function IndustryShowcase() {
  return (
    <section id="industries" className="relative border-t border-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
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
              The sectors in scope
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-foreground sm:text-5xl">
            Six sectors that carry
            <br />
            <span className="text-primary">the carbon.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ec-grey">
            Each sector has its own chemistry and its own data. Open any one for
            worldwide production, emerging norms and what&apos;s trending.
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
                  className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-xl border border-border p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {/* living sector scene */}
                  <div className="absolute inset-0 scale-[1.03] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08]">
                    <IndustryScene industry={ind} preview />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />

                  <div
                    className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border bg-white/85 backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
                    style={{ borderColor: `${ind.accent}40`, color: ind.accent }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="absolute right-6 top-6 rounded-full border border-border bg-white/85 px-3 py-1 font-mono text-xs text-ec-grey-75 backdrop-blur">
                    {ind.defaultIntensity.low}–{ind.defaultIntensity.high}
                  </div>
                  <div className="relative">
                    <p className="font-mono text-xs text-ec-grey-75">{ind.cn}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
                      {ind.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ec-grey">{ind.tagline}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                      style={{ color: ind.accent }}
                    >
                      Explore sector
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
