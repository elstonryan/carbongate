"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Award, Mail } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { initials } from "@/lib/utils";
import { toast } from "@/lib/store/toast-store";
import type { ExpertProfile } from "@/lib/types";

interface Props {
  expert: ExpertProfile | null;
  onClose: () => void;
}

const TYPE_LABEL: Record<ExpertProfile["profileType"], string> = {
  verifier: "Accredited Verifier",
  consultant: "Consultant",
  broker: "Customs Broker",
  law_firm: "Law Firm",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= Math.round(rating)
              ? "fill-warning text-warning"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export function ExpertSlideOver({ expert, onClose }: Props) {
  return (
    <AnimatePresence>
      {expert && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.12, duration: 0.45 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="shrink-0 border-b border-border p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-lg font-bold">
                  {initials(expert.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{expert.name}</p>
                      <p className="text-sm text-muted-foreground">{expert.company}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {TYPE_LABEL[expert.profileType]}
                    </span>
                    {expert.enhancedListing && (
                      <span className="flex items-center gap-0.5 rounded-full border border-warning/20 bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">
                        <Award className="h-2.5 w-2.5" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {expert.country}
                </span>
                <div className="flex items-center gap-1">
                  <Stars rating={expert.rating} />
                  <span>
                    {expert.rating.toFixed(1)} ({expert.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5 scrollbar-thin">
              {/* Bio */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {expert.bio}
              </p>

              {/* Regimes */}
              <div className="mb-4">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Regimes covered
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {expert.regimes.map((r) => (
                    <RegimeBadge key={r} regime={r} />
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div className="mb-4">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Sectors
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {expert.sectors.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accreditations */}
              {expert.accreditations.length > 0 && (
                <div className="mb-4">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Accreditations
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {expert.accreditations.map((a) => (
                      <span
                        key={a}
                        className="rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {expert.reviews.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Peer reviews
                  </p>
                  <div className="space-y-3">
                    {expert.reviews.map((rev, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-lg border border-border bg-white/[0.02] p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{rev.author}</span>
                          <Stars rating={rev.rating} />
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {rev.body}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground/50">
                          {rev.date}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="shrink-0 border-t border-border p-4">
              <button
                onClick={() => {
                  toast("Introduction requested", {
                    variant: "success",
                    description: `We'll connect you with ${expert.name} shortly.`,
                  });
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Request introduction
              </button>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
                Introductions are routed via the platform — your contact details
                are not shared until you confirm
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
