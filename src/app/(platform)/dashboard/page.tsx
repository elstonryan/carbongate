"use client";

import { motion } from "framer-motion";
import { ETSPriceCard } from "@/components/dashboard/ETSPriceCard";
import { ComplianceCountdown } from "@/components/dashboard/ComplianceCountdown";
import { RecentQueries } from "@/components/dashboard/RecentQueries";
import { AlertsTicker } from "@/components/dashboard/AlertsTicker";
import { VerificationStatusBadge } from "@/components/shared/VerificationStatusBadge";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { useAppStore } from "@/lib/store/app-store";

export default function DashboardPage() {
  const { user } = useAppStore();

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Your carbon border compliance, at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RegimeBadge regime={user.primaryRegime} />
          <VerificationStatusBadge status={user.verification} />
        </div>
      </motion.div>

      {/* 4-quadrant grid */}
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-2">
        <ETSPriceCard />
        <ComplianceCountdown />
        <RecentQueries />
        <AlertsTicker />
      </div>
    </div>
  );
}
