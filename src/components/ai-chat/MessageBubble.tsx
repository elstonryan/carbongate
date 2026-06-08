"use client";

import { motion } from "framer-motion";
import { Flag, ThumbsUp, Bot, AlertTriangle } from "lucide-react";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { toast } from "@/lib/store/toast-store";
import { CitationPanel } from "@/components/ai-chat/CitationPanel";
import { initials, cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface Props {
  message: ChatMessage;
  userName?: string;
}

export function MessageBubble({ message, userName = "You" }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-end gap-2.5"
      >
        <div className="max-w-[72%] rounded-2xl rounded-br-sm bg-primary/15 px-4 py-3 text-sm text-foreground ring-1 ring-primary/20">
          {message.content}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
          {initials(userName)}
        </div>
      </motion.div>
    );
  }

  // Assistant message
  const hasRefused = message.refused;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5"
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          hasRefused
            ? "bg-danger/10 ring-1 ring-danger/20"
            : "bg-primary/10 ring-1 ring-primary/20"
        )}
      >
        {hasRefused ? (
          <AlertTriangle className="h-4 w-4 text-danger/80" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>

      <div className="max-w-[78%] min-w-0">
        {/* Confidence + as-of */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {message.confidence && (
            <ConfidenceBadge level={message.confidence} />
          )}
          {message.asOfDate && (
            <span className="text-[10px] text-muted-foreground/70">
              as of {message.asOfDate}
            </span>
          )}
          {hasRefused && (
            <span className="rounded-full border border-danger/20 bg-danger/10 px-2 py-0.5 text-[10px] font-medium text-danger">
              Refused — not enough data
            </span>
          )}
        </div>

        {/* Body */}
        <div
          className={cn(
            "rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed",
            hasRefused
              ? "border border-danger/15 bg-danger/5 text-foreground"
              : "border border-border bg-surface/80 text-foreground"
          )}
        >
          {message.content}
        </div>

        {/* Key points */}
        {message.keyPoints && message.keyPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.15 }}
            className="mt-2 space-y-1 overflow-hidden"
          >
            {message.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {pt}
              </div>
            ))}
          </motion.div>
        )}

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <CitationPanel citations={message.citations} />
        )}

        {/* Actions */}
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() =>
              toast("Answer endorsed", {
                variant: "success",
                description: "Thanks — expert endorsements improve ranking.",
              })
            }
            className="flex items-center gap-1 text-[10px] text-muted-foreground/60 transition-colors hover:text-primary"
          >
            <ThumbsUp className="h-3 w-3" />
            Endorse
          </button>
          <button
            onClick={() =>
              toast("Flagged for review", {
                variant: "warning",
                description: "Sent to the review queue — corrections fix the corpus.",
              })
            }
            className="flex items-center gap-1 text-[10px] text-muted-foreground/60 transition-colors hover:text-danger"
          >
            <Flag className="h-3 w-3" />
            Flag
          </button>
        </div>

        {/* Disclaimer */}
        {!hasRefused && (
          <p className="mt-1.5 text-[9px] text-muted-foreground/40">
            AI-generated from curated corpus · Verify against primary sources
            before acting
          </p>
        )}
      </div>
    </motion.div>
  );
}
