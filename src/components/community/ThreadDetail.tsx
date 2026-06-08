"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp, Award, MessageSquare } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { initials, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { ForumThread } from "@/lib/types";

interface Props {
  thread: ForumThread | null;
  onClose: () => void;
}

const ROLE_LABEL: Record<string, string> = {
  importer: "Importer",
  exporter: "Exporter",
  verifier: "Verifier",
  consultant: "Consultant",
  broker: "Broker",
  analyst: "Analyst",
  admin: "Admin",
};

const ROLE_COLOR: Record<string, string> = {
  verifier: "text-primary",
  consultant: "text-secondary",
  importer: "text-muted-foreground",
  exporter: "text-warning",
  broker: "text-accent",
  analyst: "text-cyan-400",
  admin: "text-danger",
};

export function ThreadDetail({ thread, onClose }: Props) {
  return (
    <AnimatePresence>
      {thread && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
          className="fixed inset-0 z-40 flex h-full w-full flex-col border border-border bg-white backdrop-blur-xl md:relative md:inset-auto md:z-auto md:w-80 md:shrink-0 md:rounded-xl md:bg-surface/80"
        >
          {/* Header */}
          <div className="flex shrink-0 items-start gap-2 border-b border-border p-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug text-foreground">
                {thread.title}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <RegimeBadge
                  regime={thread.regime === "GLOBAL" ? "GLOBAL" : thread.regime}
                  size="sm"
                />
                <span className="text-[10px] text-muted-foreground">
                  #{thread.channel}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* OP */}
          <div className="shrink-0 border-b border-border p-4">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-xs font-semibold">
                {initials(thread.authorName)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium">{thread.authorName}</span>
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      ROLE_COLOR[thread.authorRole]
                    )}
                  >
                    {ROLE_LABEL[thread.authorRole]}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {thread.preview}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground/60">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {thread.upvotes}
                  </span>
                  {thread.expertEndorsed && (
                    <span className="flex items-center gap-1 text-warning">
                      <Award className="h-3 w-3" />
                      Expert endorsed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-thin">
            <p className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              {thread.replies.length} repl{thread.replies.length === 1 ? "y" : "ies"}
            </p>

            <div className="space-y-3">
              {thread.replies.map((reply, i) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-lg border border-border bg-white/[0.02] p-3"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold">
                      {initials(reply.authorName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-medium">
                          {reply.authorName}
                        </span>
                        <span
                          className={cn(
                            "text-[10px]",
                            ROLE_COLOR[reply.authorRole]
                          )}
                        >
                          {ROLE_LABEL[reply.authorRole]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {reply.body}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground/60">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {reply.upvotes}
                        </span>
                        {reply.expertEndorsed && (
                          <span className="flex items-center gap-1 text-warning">
                            <Award className="h-3 w-3" />
                            Endorsed
                          </span>
                        )}
                        <span className="ml-auto">
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reply box */}
          <div className="shrink-0 border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-3 py-2">
              <input
                placeholder="Reply to this thread…"
                className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/50"
              />
              <button className="rounded bg-primary/15 px-2 py-1 text-[10px] font-medium text-primary hover:bg-primary/25 transition-colors">
                Post
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
