"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const STATS = [
  { value: 6, suffix: "", label: "In-scope EU sectors", decimals: 0 },
  { value: 99.2, suffix: "%", label: "Answer faithfulness target", decimals: 1 },
  { value: 24, suffix: "", label: "Regime-tagged data tables", decimals: 0 },
  { value: 0, suffix: "%", label: "Tolerated hallucination on scope", decimals: 0 },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl border border-border bg-card/60 p-5 text-center backdrop-blur-xl"
        >
          <div className="text-3xl font-bold tracking-tight text-foreground">
            <AnimatedCounter
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
