"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EUCalculator } from "@/components/calculator/EUCalculator";
import { UKCalculator } from "@/components/calculator/UKCalculator";
import { RegimeBadge } from "@/components/shared/RegimeBadge";

const TABS = [
  { id: "EU", label: "EU CBAM" },
  { id: "UK", label: "UK CBAM" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("EU");

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Calculator</h1>
            <p className="text-sm text-muted-foreground">
              Deterministic cost scenarios — the AI never does the maths.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
            EU ETS €65/t
            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-secondary/70" />
            UK ETS £45/t
          </div>
        </div>

        {/* Regime tabs */}
        <div className="mt-4 flex items-center gap-1 rounded-xl border border-border bg-white/[0.03] p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="calc-tab-bg"
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span
                className={`relative flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <RegimeBadge
                  regime={tab.id}
                  size="sm"
                />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab content */}
      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "EU" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "EU" ? 16 : -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="h-full"
          >
            {activeTab === "EU" ? <EUCalculator /> : <UKCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <p className="shrink-0 text-center text-[10px] text-muted-foreground/50">
        Indicative only · Verify against primary sources before relying on
        these figures for a filing · Not legal or financial advice
      </p>
    </div>
  );
}
