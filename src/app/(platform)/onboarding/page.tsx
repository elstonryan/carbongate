"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <h1 className="font-display text-2xl font-semibold tracking-tight">Join CarbonGate</h1>
        <p className="text-sm text-muted-foreground">
          Verification takes up to 72 hours · Gated community · Role + regime-tagged
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="min-h-0 flex-1 overflow-y-auto scrollbar-thin"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OnboardingWizard onComplete={() => setSubmitted(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30"
              >
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold">Application submitted</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Your verification is under review. You&apos;ll receive an email
                within 72 hours. In the meantime, explore the platform — some
                features are available before full verification.
              </p>
              <Button asChild className="mt-6">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
