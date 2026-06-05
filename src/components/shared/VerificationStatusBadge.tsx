import { BadgeCheck, Clock, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "verified" | "pending" | "unverified";

const CONFIG: Record<
  Status,
  { label: string; icon: typeof BadgeCheck; className: string; spin?: boolean }
> = {
  verified: {
    label: "Verified",
    icon: BadgeCheck,
    className: "bg-primary/15 text-primary border-primary/30",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/15 text-warning border-warning/30",
    spin: true,
  },
  unverified: {
    label: "Unverified",
    icon: ShieldQuestion,
    className: "bg-white/5 text-muted-foreground border-border",
  },
};

export function VerificationStatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const c = CONFIG[status];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        c.className,
        className
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", c.spin && "animate-spin")} />
      {c.label}
    </span>
  );
}
