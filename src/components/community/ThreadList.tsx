"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Award, Clock } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { FORUM_THREADS } from "@/lib/mock-data/forum-threads";
import { initials, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { ForumThread } from "@/lib/types";

interface Props {
  channelId: string;
  activeThreadId: string | null;
  onSelect: (thread: ForumThread) => void;
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function ThreadList({ channelId, activeThreadId, onSelect }: Props) {
  const threads = FORUM_THREADS.filter((t) => t.channel === channelId);

  if (threads.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center px-6">
        <MessageSquare className="mb-3 h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No threads yet in this channel.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="h-full overflow-y-auto p-3 scrollbar-thin space-y-2"
    >
      {threads.map((thread) => (
        <motion.button
          key={thread.id}
          variants={item}
          whileHover={{ scale: 1.005 }}
          onClick={() => onSelect(thread)}
          className={cn(
            "w-full rounded-xl border p-4 text-left transition-colors",
            thread.id === activeThreadId
              ? "border-primary/30 bg-primary/[0.06]"
              : "border-border bg-white/[0.02] hover:border-border hover:bg-white/[0.04]"
          )}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-xs font-semibold">
              {initials(thread.authorName)}
            </div>

            <div className="min-w-0 flex-1">
              {/* Title row */}
              <div className="flex items-start gap-2">
                <p className="flex-1 text-sm font-semibold leading-snug text-foreground">
                  {thread.title}
                </p>
                {thread.expertEndorsed && (
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                )}
              </div>

              {/* Meta */}
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <RegimeBadge regime={thread.regime === "GLOBAL" ? "GLOBAL" : thread.regime} size="sm" />
                <span className="text-[11px] text-muted-foreground">
                  {thread.authorName} ·{" "}
                  <span className="text-muted-foreground/60">
                    {ROLE_LABEL[thread.authorRole]}
                  </span>
                </span>
              </div>

              {/* Preview */}
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {thread.preview}
              </p>

              {/* Stats */}
              <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {thread.replyCount}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {thread.upvotes}
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(thread.lastActivity), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
