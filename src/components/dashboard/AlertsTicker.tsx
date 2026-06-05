"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { ALERTS } from "@/lib/mock-data/alerts";

const URGENCY_DOT: Record<string, string> = {
  critical: "bg-danger",
  high: "bg-warning",
  medium: "bg-secondary",
  low: "bg-muted",
};

export function AlertsTicker() {
  // Duplicate the list so the vertical marquee loops seamlessly.
  const items = ALERTS.slice(0, 8);
  const loop = [...items, ...items];

  return (
    <Card className="flex h-full flex-col overflow-hidden p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h3 className="text-sm font-semibold">Regulatory alerts</h3>
        </div>
        <Link
          href="/alerts"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View feed
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="space-y-2"
        >
          {loop.map((a, i) => (
            <Link
              key={`${a.id}-${i}`}
              href="/alerts"
              className="flex items-start gap-2.5 rounded-lg border border-border bg-white/[0.02] px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  URGENCY_DOT[a.urgency]
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <RegimeBadge regime={a.regime} size="sm" />
                  <Radio className="h-3 w-3 text-muted-foreground/50" />
                </div>
                <p className="mt-1 line-clamp-1 text-xs font-medium text-foreground">
                  {a.title}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}
