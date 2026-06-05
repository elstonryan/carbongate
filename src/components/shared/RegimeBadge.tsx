import { cn } from "@/lib/utils";

type RegimeKey = "EU" | "UK" | "US" | "IN" | "GLOBAL" | "ALL" | "CA" | "AU";

const REGIME_STYLES: Record<
  RegimeKey,
  { label: string; className: string }
> = {
  EU: { label: "EU CBAM", className: "bg-primary/15 text-primary border-primary/30" },
  UK: { label: "UK CBAM", className: "bg-secondary/15 text-secondary border-secondary/30" },
  US: { label: "US", className: "bg-warning/15 text-warning border-warning/30" },
  IN: { label: "IN", className: "bg-accent/15 text-accent border-accent/30" },
  CA: { label: "CA", className: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  AU: { label: "AU", className: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
  GLOBAL: { label: "Global", className: "bg-white/5 text-muted-foreground border-border" },
  ALL: { label: "All regimes", className: "bg-white/5 text-foreground border-border" },
};

export function RegimeBadge({
  regime,
  className,
  size = "default",
}: {
  regime: RegimeKey;
  className?: string;
  size?: "default" | "sm";
}) {
  const style = REGIME_STYLES[regime] ?? REGIME_STYLES.GLOBAL;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
        style.className,
        className
      )}
    >
      {style.label}
    </span>
  );
}
