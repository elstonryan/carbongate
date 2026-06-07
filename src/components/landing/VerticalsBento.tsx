"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VERTICALS } from "@/lib/landing-data";
import { ICONS } from "@/components/landing/icon-map";

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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function VerticalsBento() {
  return (
    <section id="platform" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-secondary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              One platform, every tool
            </span>
          </div>
          <h2 className="mt-4 font-display text-5xl font-semibold tracking-tightest sm:text-6xl">
            Eight verticals.
            <span className="text-gradient"> All connected.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Each module stands alone and snaps into the rest. Tap any tile to jump
            straight in.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-6 lg:grid-cols-12"
        >
          {VERTICALS.map((v) => {
            const Icon = ICONS[v.icon];
            const isFeature = v.id === "ai";
            return (
              <motion.div key={v.id} variants={card} whileHover={{ y: -5 }} className={`group ${BENTO[v.id]} col-span-1`}>
                <Link
                  href={v.href}
                  className="card-atlas relative flex h-full w-full flex-col overflow-hidden p-6 transition-all duration-300 hover:border-white/20"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(120% 120% at 100% 0%, ${v.hex}26, transparent 60%)` }}
                  />
                  <div
                    className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: v.hex }}
                  />
                  <div className="relative flex items-start justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${v.hex}1f`, color: v.hex }}
                    >
                      {Icon && <Icon className="h-6 w-6" />}
                    </span>
                    <div className="flex items-center gap-2">
                      {v.tag && (
                        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#06120c]" style={{ backgroundColor: v.hex }}>
                          {v.tag}
                        </span>
                      )}
                      <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-300 group-hover:rotate-12 group-hover:text-white" />
                    </div>
                  </div>
                  <div className="relative mt-auto pt-4">
                    <h3 className={`font-display font-semibold tracking-tight text-white ${isFeature ? "text-3xl" : "text-xl"}`}>
                      {v.title}
                    </h3>
                    <p className={`mt-1.5 leading-relaxed text-white/55 ${isFeature ? "max-w-md text-base" : "text-sm"}`}>
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
