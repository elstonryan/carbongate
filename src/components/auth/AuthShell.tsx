"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ShieldCheck } from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";

/**
 * Split-screen auth shell: branded left panel + animated form panel on the right.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/90" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-base font-bold text-background">
              C
            </span>
            <span className="text-xl font-semibold tracking-tight">
              Carbon<span className="text-primary">Gate</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <Quote className="h-8 w-8 text-primary/60" />
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground">
            An AI that says &ldquo;I don&apos;t have reliable data on this&rdquo;
            is worth more than one that always answers.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            The verified source of truth for carbon border compliance — across
            every regime you&apos;re exposed to.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <RegimeBadge regime="EU" />
            <RegimeBadge regime="UK" />
            <RegimeBadge regime="US" />
            <RegimeBadge regime="IN" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          Gated to verified professionals · GDPR &amp; UK-GDPR compliant
        </motion.div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
