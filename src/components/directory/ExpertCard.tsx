"use client";

import { motion } from "framer-motion";
import { Star, Award, MapPin, ChevronRight } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { initials } from "@/lib/utils";
import type { ExpertProfile } from "@/lib/types";

interface Props {
  expert: ExpertProfile;
  onClick: () => void;
}

const TYPE_LABEL: Record<ExpertProfile["profileType"], string> = {
  verifier: "Accredited Verifier",
  consultant: "Consultant",
  broker: "Customs Broker",
  law_firm: "Law Firm",
};

const TYPE_COLOR: Record<ExpertProfile["profileType"], string> = {
  verifier: "text-primary border-primary/20 bg-primary/5",
  consultant: "text-secondary border-secondary/20 bg-secondary/5",
  broker: "text-warning border-warning/20 bg-warning/5",
  law_firm: "text-accent border-accent/20 bg-accent/5",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3 w-3 ${
            n <= Math.round(rating)
              ? "fill-warning text-warning"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export function ExpertCard({ expert, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col rounded-xl border border-border bg-white/[0.02] p-4 text-left transition-all hover:border-primary/20 hover:bg-primary/[0.03]"
    >
      {/* Enhanced badge */}
      {expert.enhancedListing && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-warning/20 bg-warning/10 px-2 py-0.5">
          <Award className="h-3 w-3 text-warning" />
          <span className="text-[10px] font-medium text-warning">Featured</span>
        </div>
      )}

      {/* Avatar + name */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-bold">
          {initials(expert.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground truncate">{expert.name}</p>
          <p className="text-xs text-muted-foreground truncate">{expert.company}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${TYPE_COLOR[expert.profileType]}`}
            >
              {TYPE_LABEL[expert.profileType]}
            </span>
          </div>
        </div>
      </div>

      {/* Location + rating */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {expert.country}
        </div>
        <div className="flex items-center gap-1.5">
          <Stars rating={expert.rating} />
          <span className="text-[11px] text-muted-foreground">
            {expert.rating.toFixed(1)} ({expert.reviewCount})
          </span>
        </div>
      </div>

      {/* Regimes */}
      <div className="mt-2.5 flex flex-wrap gap-1">
        {expert.regimes.map((r) => (
          <RegimeBadge key={r} regime={r} size="sm" />
        ))}
      </div>

      {/* Sectors */}
      <div className="mt-2 flex flex-wrap gap-1">
        {expert.sectors.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
        {expert.sectors.length > 3 && (
          <span className="text-[10px] text-muted-foreground/60">
            +{expert.sectors.length - 3} more
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {expert.accreditations.slice(0, 2).map((a) => (
            <span
              key={a}
              className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
      </div>
    </motion.button>
  );
}
