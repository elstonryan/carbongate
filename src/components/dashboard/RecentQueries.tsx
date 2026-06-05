"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CONVERSATIONS } from "@/lib/mock-data/conversations";
import type { ConfidenceLevel } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export function RecentQueries() {
  const recent = CONVERSATIONS.map((c) => {
    const lastAssistant = [...c.messages]
      .reverse()
      .find((m) => m.role === "assistant");
    const firstUser = c.messages.find((m) => m.role === "user");
    return {
      id: c.id,
      title: firstUser?.content ?? c.title,
      regime: c.regime === "ALL" ? ("GLOBAL" as const) : c.regime,
      confidence: (lastAssistant?.confidence ?? "high") as ConfidenceLevel,
      refused: lastAssistant?.refused ?? false,
    };
  });

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Recent AI queries</h3>
        </div>
        <Link
          href="/ai-assistant"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Open assistant
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2 pr-3"
        >
          {recent.map((q) => (
            <motion.div key={q.id} variants={item}>
              <Link
                href="/ai-assistant"
                className="block rounded-lg border border-border bg-white/[0.02] p-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <p className="line-clamp-1 text-sm text-foreground">
                  {q.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <RegimeBadge regime={q.regime} size="sm" />
                  {q.refused ? (
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                      Refused (out of scope)
                    </span>
                  ) : (
                    <ConfidenceBadge level={q.confidence} />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </Card>
  );
}
