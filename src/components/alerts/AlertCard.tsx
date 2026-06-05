"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, AlertTriangle, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { RegAlert } from "@/lib/types";

interface Props {
  alert: RegAlert;
}

const URGENCY_STYLES: Record<RegAlert["urgency"], { badge: string; dot: string }> = {
  critical: { badge: "border-danger/30 bg-danger/10 text-danger", dot: "bg-danger animate-pulse" },
  high: { badge: "border-warning/30 bg-warning/10 text-warning", dot: "bg-warning" },
  medium: { badge: "border-secondary/30 bg-secondary/10 text-secondary", dot: "bg-secondary" },
  low: { badge: "border-border text-muted-foreground", dot: "bg-muted-foreground/50" },
};

const TYPE_ICONS: Record<RegAlert["type"], React.ElementType> = {
  regulatory_change: AlertTriangle,
  price_update: TrendingUp,
  deadline_reminder: Calendar,
  new_guidance: BookOpen,
};

const TYPE_LABELS: Record<RegAlert["type"], string> = {
  regulatory_change: "Regulatory change",
  price_update: "Price update",
  deadline_reminder: "Deadline",
  new_guidance: "New guidance",
};

export function AlertCard({ alert }: Props) {
  const [expanded, setExpanded] = useState(false);
  const urgency = URGENCY_STYLES[alert.urgency];
  const TypeIcon = TYPE_ICONS[alert.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border bg-white/[0.02] transition-colors",
        alert.urgency === "critical"
          ? "border-danger/20"
          : "border-border hover:border-white/15"
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Timeline dot */}
        <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
          <span className={cn("h-2.5 w-2.5 rounded-full", urgency.dot)} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-2">
            <RegimeBadge
              regime={
                alert.regime === "GLOBAL"
                  ? "GLOBAL"
                  : alert.regime === "US"
                  ? "US"
                  : alert.regime
              }
              size="sm"
            />
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                urgency.badge
              )}
            >
              {alert.urgency}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <TypeIcon className="h-3 w-3" />
              {TYPE_LABELS[alert.type]}
            </span>
            <span className="ml-auto text-[10px] text-muted-foreground/60">
              {formatDistanceToNow(new Date(alert.date), { addSuffix: true })}
            </span>
          </div>

          {/* Title */}
          <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground">
            {alert.title}
          </p>

          {/* Summary */}
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {alert.summary}
          </p>

          {/* Expand button */}
          <div className="mt-2.5 flex items-center gap-3">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  expanded && "rotate-180"
                )}
              />
              {expanded ? "Less" : "More detail"}
            </button>
            <a
              href={alert.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary transition-colors hover:text-primary/80"
            >
              <ExternalLink className="h-3 w-3" />
              Source
            </a>
          </div>

          {/* Expanded detail */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="mt-3 border-l-2 border-primary/20 pl-3 text-xs leading-relaxed text-muted-foreground">
                  {alert.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
