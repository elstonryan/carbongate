"use client";

import { motion } from "framer-motion";
import { CalendarClock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { daysUntil } from "@/lib/utils";

interface Deadline {
  label: string;
  date: string; // ISO
  regime: "EU" | "UK";
  detail: string;
}

// Deadlines relative to the demo "today" (2026-06-05).
const DEADLINES: Deadline[] = [
  {
    label: "Q2 80% holding check",
    date: "2026-06-30",
    regime: "EU",
    detail: "Hold ≥80% of cumulative embedded emissions",
  },
  {
    label: "Annual surrender",
    date: "2027-05-31",
    regime: "EU",
    detail: "Surrender certificates for 2026 emissions",
  },
  {
    label: "UK CBAM go-live",
    date: "2027-01-01",
    regime: "UK",
    detail: "Direct levy begins for UK importers",
  },
];

export function ComplianceCountdown() {
  const next = DEADLINES.map((d) => ({ ...d, days: daysUntil(d.date) })).sort(
    (a, b) => a.days - b.days
  );
  const primary = next[0];
  const urgent = primary.days <= 30;

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Compliance countdown</h3>
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Primary deadline */}
      <div className="rounded-xl border border-border bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <RegimeBadge regime={primary.regime} size="sm" />
          {urgent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-medium text-warning">
              <AlertTriangle className="h-3 w-3" />
              Due soon
            </span>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="font-mono text-4xl font-bold tracking-tight text-foreground"
          >
            {primary.days}
          </motion.span>
          <span className="text-sm text-muted-foreground">days left</span>
        </div>
        <p className="mt-1 text-sm font-medium text-foreground">
          {primary.label}
        </p>
        <p className="text-xs text-muted-foreground">{primary.detail}</p>
      </div>

      {/* Upcoming list */}
      <div className="mt-3 space-y-2">
        {next.slice(1).map((d) => (
          <div
            key={d.label}
            className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <RegimeBadge regime={d.regime} size="sm" />
              <span className="text-xs text-foreground">{d.label}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {d.days}d
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
