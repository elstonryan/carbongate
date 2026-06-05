"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  BookOpen,
  FileSpreadsheet,
  HelpCircle,
  Download,
  ChevronRight,
} from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { DOCUMENTS } from "@/lib/mock-data/documents";
import { cn } from "@/lib/utils";
import type { RegDocument, Regime } from "@/lib/types";

interface Props {
  regimeFilter: Regime | "ALL";
  typeFilter: string;
  onSelect: (doc: RegDocument) => void;
}

const DOC_ICONS: Record<RegDocument["docType"], React.ElementType> = {
  regulation: Scale,
  guidance: BookOpen,
  template: FileSpreadsheet,
  faq: HelpCircle,
  "sector-guide": FileText,
};

const DOC_TYPE_LABELS: Record<RegDocument["docType"], string> = {
  regulation: "Regulation",
  guidance: "Guidance",
  template: "Template",
  faq: "FAQ",
  "sector-guide": "Sector Guide",
};

const STATUS_STYLE: Record<RegDocument["status"], string> = {
  live: "bg-primary/10 text-primary border-primary/20",
  staged: "bg-warning/10 text-warning border-warning/20",
  review: "bg-accent/10 text-accent border-accent/20",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export function DocumentGrid({ regimeFilter, typeFilter, onSelect }: Props) {
  const docs = DOCUMENTS.filter((d) => {
    if (regimeFilter !== "ALL" && d.regime !== regimeFilter) return false;
    if (typeFilter !== "all" && d.docType !== typeFilter) return false;
    return true;
  });

  if (docs.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <FileText className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No documents match this filter.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid h-full auto-rows-max grid-cols-1 gap-3 overflow-y-auto p-1 scrollbar-thin sm:grid-cols-2 lg:grid-cols-3"
    >
      {docs.map((doc) => {
        const Icon = DOC_ICONS[doc.docType];
        return (
          <motion.button
            key={doc.id}
            variants={item}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(doc)}
            className="group flex flex-col rounded-xl border border-border bg-white/[0.02] p-4 text-left transition-colors hover:border-primary/20 hover:bg-primary/[0.03]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                  STATUS_STYLE[doc.status]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <RegimeBadge
                  regime={doc.regime === "GLOBAL" ? "GLOBAL" : doc.regime}
                  size="sm"
                />
              </div>
            </div>

            {/* Title */}
            <p className="mt-3 text-sm font-semibold leading-snug text-foreground line-clamp-2">
              {doc.title}
            </p>

            {/* Type + sectors */}
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                {DOC_TYPE_LABELS[doc.docType]}
              </span>
              {doc.sectors.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {doc.summary}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/60">
                Reviewed: {doc.lastReviewed}
              </span>
              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Download className="h-3.5 w-3.5 text-muted-foreground" />
                <ChevronRight className="h-3.5 w-3.5 text-primary" />
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
