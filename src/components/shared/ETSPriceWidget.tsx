"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

export interface ETSPricePoint {
  day: string;
  price: number;
}

/**
 * Large ETS price display with a 7-day sparkline and % change badge.
 * "As of" timestamp is always shown — non-negotiable for a compliance tool.
 */
export function ETSPriceWidget({
  market,
  price,
  currency,
  changePercent,
  series,
  asOf,
  className,
}: {
  market: string;
  price: number;
  currency: "EUR" | "GBP";
  changePercent: number;
  series: ETSPricePoint[];
  asOf: string;
  className?: string;
}) {
  const up = changePercent >= 0;
  const symbol = currency === "EUR" ? "€" : "£";
  const color = "#004494";

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {market}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              <AnimatedCounter value={price} decimals={2} prefix={symbol} />
            </span>
            <span className="text-sm text-muted-foreground">/tCO₂e</span>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
            up ? "bg-primary/15 text-primary" : "bg-danger/15 text-danger"
          )}
        >
          {up ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {up ? "+" : ""}
          {changePercent.toFixed(1)}%
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 min-h-0 flex-1"
      >
        <ResponsiveContainer width="100%" height="100%" minHeight={70}>
          <AreaChart
            data={series}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`ets-${market}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              cursor={{ stroke: "rgba(19,40,75,0.15)" }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #dbe3ec",
                borderRadius: 8,
                fontSize: 12,
                color: "#13284b",
                boxShadow: "0 8px 24px -18px rgba(19,40,75,0.4)",
              }}
              formatter={(v: number) => [`${symbol}${v.toFixed(2)}`, "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill={`url(#ets-${market})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <p className="mt-2 text-[10px] text-muted-foreground/70">
        Weekly avg auction price · as of {asOf}
      </p>
    </div>
  );
}
