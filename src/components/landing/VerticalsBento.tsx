"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VERTICALS } from "@/lib/landing-data";
import { ICONS } from "@/components/landing/icon-map";

/** Precise bento spans on a 12-col grid (no gaps): 6+3+3 / 4+4+4 / 6+6. */
const BENTO: Record<string, string> = {
  ai: "sm:col-span-6 lg:col-span-6 lg:row-span-2",
  calculator: "sm:col-span-3 lg:col-span-3",
  community: "sm:col-span-3 lg:col-span-3",
  dashboard: "sm:col-span-3 lg:col-span-3",
  verification: "sm:col-span-3 lg:col-span-3",
  library: "sm:col-span-3 lg:col-span-6",
  directory: "sm:col-span-3 lg:col-span-3",
  alerts: "sm:col-span-3 lg:col-span-3",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function VerticalsBento() {
  return (
    <section id="platform" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            One platform, every tool
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Eight verticals.
            <span className="text-bright-gradient"> All connected.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Each module stands alone and snaps into the rest. Tap any tile to jump
            straight in.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid auto-rows-[170px] grid-cols-1 gap-4 sm:grid-cols-6 lg:grid-cols-12"
        >
          {VERTICALS.map((v) => {
            const Icon = ICONS[v.icon];
            const isFeature = v.id === "ai";
            return (
              <motion.div
                key={v.id}
                variants={card}
                whileHover={{ y: -5 }}
                className={`group ${BENTO[v.id]} col-span-1`}
              >
                <Link
                  href={v.href}
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-2xl"
                >
                  {/* Hover gradient wash */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(120% 120% at 100% 0%, ${v.hex}1a, transparent 60%)`,
                    }}
                  />
                  {/* Glow blob */}
                  <div
                    className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ backgroundColor: v.hex }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${v.hex}1a`, color: v.hex }}
                    >
                      {Icon && <Icon className="h-6 w-6" />}
                    </span>
                    <div className="flex items-center gap-2">
                      {v.tag && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ backgroundColor: v.hex }}
                        >
                          {v.tag}
                        </span>
                      )}
                      <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:text-slate-900 group-hover:rotate-12" />
                    </div>
                  </div>

                  <div className="relative mt-auto pt-4">
                    <h3
                      className={`font-bold tracking-tight text-slate-900 ${
                        isFeature ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {v.title}
                    </h3>
                    <p
                      className={`mt-1.5 leading-relaxed text-slate-600 ${
                        isFeature ? "text-base max-w-md" : "text-sm"
                      }`}
                    >
                      {v.desc}
                    </p>
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
