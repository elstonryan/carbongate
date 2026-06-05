"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { ExpertSlideOver } from "@/components/directory/ExpertSlideOver";
import { EXPERTS } from "@/lib/mock-data/experts";
import { cn } from "@/lib/utils";
import type { ExpertProfile, Regime } from "@/lib/types";

const TYPE_FILTERS: { id: ExpertProfile["profileType"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verifier", label: "Verifiers" },
  { id: "consultant", label: "Consultants" },
  { id: "broker", label: "Brokers" },
  { id: "law_firm", label: "Law Firms" },
];

const REGIME_FILTERS: { id: Regime | "all"; label: string }[] = [
  { id: "all", label: "All regimes" },
  { id: "EU", label: "EU CBAM" },
  { id: "UK", label: "UK CBAM" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ExpertProfile["profileType"] | "all">("all");
  const [regimeFilter, setRegimeFilter] = useState<Regime | "all">("all");
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);

  const filtered = useMemo(() => {
    return EXPERTS.filter((e) => {
      if (typeFilter !== "all" && e.profileType !== typeFilter) return false;
      if (regimeFilter !== "all" && !e.regimes.includes(regimeFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q) ||
          e.sectors.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, typeFilter, regimeFilter]);

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Expert Directory</h1>
            <p className="text-sm text-muted-foreground">
              Accredited verifiers, consultants, law firms and brokers — regime-filtered
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {filtered.length} of {EXPERTS.length}
          </span>
        </div>

        {/* Search + filters */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company or sector…"
              className="h-10 w-full rounded-xl border border-border bg-white/[0.03] pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Type filter */}
            <div className="flex items-center gap-1 rounded-xl border border-border bg-white/[0.03] p-1">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id)}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    typeFilter === f.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {typeFilter === f.id && (
                    <motion.span
                      layoutId="dir-type-bg"
                      className="absolute inset-0 rounded-lg bg-white/[0.08]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>

            {/* Regime filter */}
            <div className="flex items-center gap-1 rounded-xl border border-border bg-white/[0.03] p-1">
              {REGIME_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setRegimeFilter(f.id)}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    regimeFilter === f.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {regimeFilter === f.id && (
                    <motion.span
                      layoutId="dir-regime-bg"
                      className="absolute inset-0 rounded-lg bg-white/[0.08]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="min-h-0 flex-1 overflow-y-auto scrollbar-thin"
      >
        {filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <Search className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No experts match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((expert) => (
              <motion.div key={expert.id} variants={item}>
                <ExpertCard
                  expert={expert}
                  onClick={() => setSelectedExpert(expert)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <ExpertSlideOver
        expert={selectedExpert}
        onClose={() => setSelectedExpert(null)}
      />
    </div>
  );
}
