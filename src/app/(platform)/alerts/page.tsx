"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AlertFilters } from "@/components/alerts/AlertFilters";
import { ALERTS } from "@/lib/mock-data/alerts";
import type { Regime, RegAlert } from "@/lib/types";

type RegimeFilter = Regime | "GLOBAL" | "ALL";
type TypeFilter = RegAlert["type"] | "all";
type UrgencyFilter = RegAlert["urgency"] | "all";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function AlertsPage() {
  const [regimeFilter, setRegimeFilter] = useState<RegimeFilter>("ALL");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("all");

  const filtered = useMemo(() => {
    return ALERTS.filter((a) => {
      if (regimeFilter !== "ALL" && a.regime !== regimeFilter) return false;
      if (typeFilter !== "all" && a.type !== typeFilter) return false;
      if (urgencyFilter !== "all" && a.urgency !== urgencyFilter) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [regimeFilter, typeFilter, urgencyFilter]);

  const criticalCount = filtered.filter((a) => a.urgency === "critical").length;

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Alerts Feed</h1>
            <p className="text-sm text-muted-foreground">
              Regulatory changes, price movements, deadline reminders — regime-tagged
            </p>
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 rounded-full border border-danger/20 bg-danger/10 px-3 py-1 text-xs font-medium text-danger"
              >
                <Bell className="h-3.5 w-3.5" />
                {criticalCount} critical
              </motion.span>
            )}
            <span className="text-sm text-muted-foreground">
              {filtered.length} alerts
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 gap-3">
        {/* Filters */}
        <AlertFilters
          regimeFilter={regimeFilter}
          typeFilter={typeFilter}
          urgencyFilter={urgencyFilter}
          onRegime={setRegimeFilter}
          onType={setTypeFilter}
          onUrgency={setUrgencyFilter}
          onReset={() => {
            setRegimeFilter("ALL");
            setTypeFilter("all");
            setUrgencyFilter("all");
          }}
        />

        {/* Alert list */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="min-w-0 flex-1 overflow-y-auto scrollbar-thin"
        >
          {filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Bell className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No alerts match your filters.
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filtered.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
