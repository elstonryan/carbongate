import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/types";

const CONFIG: Record<
  ConfidenceLevel,
  { label: string; dot: string; text: string }
> = {
  high: { label: "High confidence", dot: "bg-primary", text: "text-primary" },
  medium: { label: "Medium confidence", dot: "bg-warning", text: "text-warning" },
  low: { label: "Low confidence", dot: "bg-danger", text: "text-danger" },
};

/**
 * Confidence indicator with a pulsing colored dot. Surfaces the AI pipeline's
 * confidence gate to the user — central to the trust model.
 */
export function ConfidenceBadge({
  level,
  className,
}: {
  level: ConfidenceLevel;
  className?: string;
}) {
  const c = CONFIG[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-white/5 px-2.5 py-0.5 text-xs font-medium",
        c.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse-dot", c.dot)} />
      {c.label}
    </span>
  );
}
