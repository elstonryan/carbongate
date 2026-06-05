"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, FileText } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import type { RegDocument } from "@/lib/types";

interface Props {
  doc: RegDocument | null;
  onClose: () => void;
}

export function DocumentModal({ doc, onClose }: Props) {
  return (
    <AnimatePresence>
      {doc && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full"
          >
            {/* Header */}
            <div className="flex items-start gap-3 border-b border-border p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight text-foreground">
                  {doc.title}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <RegimeBadge
                    regime={doc.regime === "GLOBAL" ? "GLOBAL" : doc.regime}
                    size="sm"
                  />
                  {doc.sectors.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto p-5 scrollbar-thin">
              {/* Meta */}
              <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Last reviewed: {doc.lastReviewed}</span>
                <span
                  className={`capitalize ${
                    doc.status === "live"
                      ? "text-primary"
                      : doc.status === "staged"
                      ? "text-warning"
                      : "text-accent"
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {/* Summary */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {doc.summary}
              </p>

              {/* Key points */}
              {doc.keyPoints.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key points
                  </p>
                  <div className="space-y-2">
                    {doc.keyPoints.map((pt, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{pt}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations */}
              {doc.citations.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Source citations
                  </p>
                  <div className="space-y-2">
                    {doc.citations.map((c, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border bg-white/[0.02] p-3"
                      >
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                          {c.ref}
                        </span>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <p className="text-[10px] text-muted-foreground/60">
                Source: {doc.sourceUrl}
              </p>
              <a
                href={doc.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View source
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
