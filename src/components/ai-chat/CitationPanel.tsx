"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Citation {
  ref: string;
  docTitle: string;
  excerpt: string;
  lastReviewed: string;
}

interface Props {
  citations: Citation[];
}

export function CitationPanel({ citations }: Props) {
  const [open, setOpen] = useState(false);

  if (citations.length === 0) return null;

  return (
    <div className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.02]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="flex-1 font-medium">
          {citations.length} source{citations.length > 1 ? "s" : ""} cited
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-2 border-t border-white/[0.06] p-3">
              {citations.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-lg border border-border bg-white/[0.03] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                        {c.ref}
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {c.docTitle}
                      </span>
                    </div>
                    <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                  </div>
                  <p className="mt-2 border-l-2 border-primary/20 pl-2.5 text-[11px] italic leading-relaxed text-muted-foreground">
                    &ldquo;{c.excerpt}&rdquo;
                  </p>
                  <p className="mt-1.5 text-[10px] text-muted-foreground/60">
                    Last reviewed: {c.lastReviewed}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
