"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Citation {
  ref: string;
  docTitle: string;
  excerpt: string;
  lastReviewed: string;
}

/**
 * Expandable citation card. Surfaces citation integrity (step 10 of the answer
 * pipeline): article ref, source document, supporting excerpt, "last reviewed".
 */
export function CitationCard({
  citation,
  index = 0,
}: {
  citation: Citation;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg border border-border bg-white/[0.03] overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <FileText className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
              {citation.ref}
            </span>
            <span className="truncate text-xs font-medium text-foreground">
              {citation.docTitle}
            </span>
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3 py-3">
              <p className="text-xs italic leading-relaxed text-muted-foreground">
                &ldquo;{citation.excerpt}&rdquo;
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <CalendarClock className="h-3 w-3" />
                Last reviewed {citation.lastReviewed}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
