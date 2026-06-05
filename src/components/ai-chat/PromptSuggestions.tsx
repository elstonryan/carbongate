"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PROMPT_SUGGESTIONS } from "@/lib/mock-data/conversations";

interface Props {
  onSelect: (prompt: string) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function PromptSuggestions({ onSelect }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/20"
      >
        <Sparkles className="h-7 w-7 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="mb-1.5 text-center text-lg font-semibold"
      >
        Carbon border compliance AI
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="mb-8 max-w-sm text-center text-sm text-muted-foreground"
      >
        Every answer is grounded in a citable corpus. When I don&apos;t have
        reliable data, I say so — and route you somewhere that does.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid w-full max-w-xl grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <motion.button
            key={suggestion}
            variants={item}
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect(suggestion)}
            className="group rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/[0.04] hover:text-foreground"
          >
            <span className="block leading-snug">{suggestion}</span>
            <span className="mt-1.5 block text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Ask this →
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
