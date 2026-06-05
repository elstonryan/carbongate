"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChannelSidebar } from "@/components/community/ChannelSidebar";
import { ThreadList } from "@/components/community/ThreadList";
import { ThreadDetail } from "@/components/community/ThreadDetail";
import type { ForumThread } from "@/lib/types";

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState("eu-importers");
  const [activeThread, setActiveThread] = useState<ForumThread | null>(null);

  return (
    <div className="flex h-full flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <h1 className="text-xl font-bold tracking-tight">Community</h1>
        <p className="text-sm text-muted-foreground">
          Verified professionals · Regime-gated channels · Expert-endorsed answers
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="flex min-h-0 flex-1 gap-3"
      >
        {/* Channel sidebar */}
        <div className="w-52 shrink-0">
          <ChannelSidebar
            activeChannel={activeChannel}
            onSelect={(id) => {
              setActiveChannel(id);
              setActiveThread(null);
            }}
          />
        </div>

        {/* Thread list */}
        <div className="flex-1 min-w-0 rounded-xl border border-border bg-surface/60 backdrop-blur-xl">
          <div className="flex items-center border-b border-border px-4 py-3">
            <span className="text-xs font-semibold text-muted-foreground">
              #{activeChannel}
            </span>
            <button className="ml-auto rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              + New thread
            </button>
          </div>
          <ThreadList
            channelId={activeChannel}
            activeThreadId={activeThread?.id ?? null}
            onSelect={setActiveThread}
          />
        </div>

        {/* Thread detail panel */}
        <ThreadDetail thread={activeThread} onClose={() => setActiveThread(null)} />
      </motion.div>
    </div>
  );
}
