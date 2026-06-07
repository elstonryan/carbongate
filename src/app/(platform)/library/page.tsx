"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DocumentGrid } from "@/components/library/DocumentGrid";
import { DocumentModal } from "@/components/library/DocumentModal";
import { cn } from "@/lib/utils";
import type { RegDocument, Regime } from "@/lib/types";

const REGIME_FILTERS: { id: Regime | "ALL"; label: string }[] = [
  { id: "ALL", label: "All regimes" },
  { id: "EU", label: "EU CBAM" },
  { id: "UK", label: "UK CBAM" },
];

const TYPE_FILTERS = [
  { id: "all", label: "All types" },
  { id: "regulation", label: "Regulation" },
  { id: "guidance", label: "Guidance" },
  { id: "sector-guide", label: "Sector Guide" },
  { id: "template", label: "Template" },
  { id: "faq", label: "FAQ" },
];

export default function LibraryPage() {
  const [regimeFilter, setRegimeFilter] = useState<Regime | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<RegDocument | null>(null);

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Regulation Library</h1>
            <p className="text-sm text-muted-foreground">
              Curated regulatory documents · Human-reviewed · Regime-tagged
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {/* Regime filter */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-white/[0.03] p-1">
            {REGIME_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setRegimeFilter(f.id)}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  regimeFilter === f.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {regimeFilter === f.id && (
                  <motion.span
                    layoutId="lib-regime-bg"
                    className="absolute inset-0 rounded-lg bg-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap items-center gap-1">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setTypeFilter(f.id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
                  typeFilter === f.id
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="min-h-0 flex-1"
      >
        <DocumentGrid
          regimeFilter={regimeFilter}
          typeFilter={typeFilter}
          onSelect={setSelectedDoc}
        />
      </motion.div>

      {/* Document modal */}
      <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}
