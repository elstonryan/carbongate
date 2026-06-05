"use client";

import { motion } from "framer-motion";
import { Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Regime, RegAlert } from "@/lib/types";

type RegimeFilter = Regime | "GLOBAL" | "ALL";
type TypeFilter = RegAlert["type"] | "all";
type UrgencyFilter = RegAlert["urgency"] | "all";

interface Props {
  regimeFilter: RegimeFilter;
  typeFilter: TypeFilter;
  urgencyFilter: UrgencyFilter;
  onRegime: (r: RegimeFilter) => void;
  onType: (t: TypeFilter) => void;
  onUrgency: (u: UrgencyFilter) => void;
  onReset: () => void;
}

const REGIMES: { id: RegimeFilter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "EU", label: "EU" },
  { id: "UK", label: "UK" },
  { id: "US", label: "US" },
  { id: "GLOBAL", label: "Global" },
];

const TYPES: { id: TypeFilter; label: string; color: string }[] = [
  { id: "all", label: "All types", color: "" },
  { id: "regulatory_change", label: "Regulatory change", color: "text-primary" },
  { id: "price_update", label: "Price update", color: "text-secondary" },
  { id: "deadline_reminder", label: "Deadline", color: "text-warning" },
  { id: "new_guidance", label: "New guidance", color: "text-accent" },
];

const URGENCIES: { id: UrgencyFilter; label: string; color: string }[] = [
  { id: "all", label: "All urgency", color: "" },
  { id: "critical", label: "Critical", color: "text-danger" },
  { id: "high", label: "High", color: "text-warning" },
  { id: "medium", label: "Medium", color: "text-secondary" },
  { id: "low", label: "Low", color: "text-muted-foreground" },
];

export function AlertFilters({
  regimeFilter,
  typeFilter,
  urgencyFilter,
  onRegime,
  onType,
  onUrgency,
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex h-full w-52 shrink-0 flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-3">
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Filters</span>
        </div>
        <button
          onClick={onReset}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin space-y-5">
        {/* Regime */}
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Regime
          </p>
          <div className="space-y-0.5">
            {REGIMES.map((r) => (
              <button
                key={r.id}
                onClick={() => onRegime(r.id)}
                className={cn(
                  "relative w-full rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                  regimeFilter === r.id
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {regimeFilter === r.id && (
                  <motion.span
                    layoutId="alert-regime"
                    className="absolute left-0 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                  />
                )}
                <span className="pl-1">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Type
          </p>
          <div className="space-y-0.5">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => onType(t.id)}
                className={cn(
                  "w-full rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                  typeFilter === t.id
                    ? "bg-white/5 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  typeFilter === t.id && t.color ? t.color : ""
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Urgency
          </p>
          <div className="space-y-0.5">
            {URGENCIES.map((u) => (
              <button
                key={u.id}
                onClick={() => onUrgency(u.id)}
                className={cn(
                  "w-full rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                  urgencyFilter === u.id
                    ? "bg-white/5 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <span className={urgencyFilter === u.id && u.color ? u.color : ""}>
                  {u.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
