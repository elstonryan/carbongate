"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/landing-data";
import { ICONS } from "@/components/landing/icon-map";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function IndustryShowcase() {
  return (
    <section id="industries" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
            The industries in scope
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Built for the sectors that
            <span className="text-warm-gradient"> carry the carbon</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Six sectors are in scope for EU CBAM today. Each has its own emissions
            profile, default values and CN codes — and the platform knows them all.
          </p>
        </motion.div>

        {/* Industry grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.article
                key={ind.id}
                variants={card}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-2xl"
              >
                {/* Color wash that grows on hover */}
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
                  style={{ backgroundColor: ind.tint }}
                />
                {/* Top accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: ind.hex }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ backgroundColor: ind.tint, color: ind.hex }}
                    >
                      {Icon && <Icon className="h-7 w-7" />}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-500">
                      {ind.cn}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {ind.blurb}
                  </p>

                  {/* Emissions stat */}
                  <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Default intensity
                      </p>
                      <p
                        className="mt-0.5 text-2xl font-black tracking-tight"
                        style={{ color: ind.hex }}
                      >
                        {ind.intensity}
                      </p>
                    </div>
                    <p className="font-mono text-xs text-slate-500">{ind.unit}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
