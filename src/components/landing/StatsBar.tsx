"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck2, Globe2, Boxes } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const STATS = [
  { icon: ShieldCheck, value: 0, suffix: "%", label: "Hallucination target", sub: "on in-scope questions", hex: "#34d399" },
  { icon: FileCheck2, value: 100, suffix: "%", label: "Answers cited", sub: "every claim, every source", hex: "#38e1d6" },
  { icon: Globe2, value: 8, label: "Regimes tracked", sub: "EU & UK live, six monitored", hex: "#a78bfa" },
  { icon: Boxes, value: 6, label: "Sectors in scope", sub: "steel to electricity", hex: "#f0a93b" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function StatsBar() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <motion.div key={s.label} variants={item} className="card-atlas p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${s.hex}1f`, color: s.hex }}>
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-4 font-display text-4xl font-semibold tracking-tight" style={{ color: s.hex }}>
              <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{s.label}</p>
            <p className="text-xs text-white/45">{s.sub}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
