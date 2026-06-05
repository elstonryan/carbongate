import { cn } from "@/lib/utils";

/**
 * Glassmorphism skeleton block with a shimmer sweep.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-white/[0.03]",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-white/[0.06] after:to-transparent",
        className
      )}
    />
  );
}

/** Pre-composed card skeleton for grid loading states. */
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-5/6" />
        <Skeleton className="h-2.5 w-4/6" />
      </div>
    </div>
  );
}
