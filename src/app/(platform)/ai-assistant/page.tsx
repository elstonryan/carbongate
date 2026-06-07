"use client";

import { motion } from "framer-motion";
import { ChatInterface } from "@/components/ai-chat/ChatInterface";

export default function AIAssistantPage() {
  return (
    <div className="flex h-full flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              13-step anti-hallucination pipeline · Citation-grounded · Temperature 0
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
            Corpus v2026.1 live
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="min-h-0 flex-1"
      >
        <ChatInterface />
      </motion.div>
    </div>
  );
}
