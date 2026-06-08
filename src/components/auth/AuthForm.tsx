"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/lib/store/toast-store";

const field = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock auth — no real Supabase call in mock mode.
    setLoading(true);
    setTimeout(() => {
      toast(isSignup ? "Account created" : "Signed in", {
        variant: "success",
        description: isSignup
          ? "Let's get you verified."
          : "Welcome back to CarbonGate.",
      });
      router.push(isSignup ? "/onboarding" : "/dashboard");
    }, 900);
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          {isSignup ? "Request verified access" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {isSignup
            ? "Join the gated community of carbon-border professionals."
            : "Sign in to your CarbonGate account."}
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
        className="space-y-4"
      >
        {isSignup && (
          <>
            <motion.div variants={field} className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Jane Doe" className="pl-9" required />
              </div>
            </motion.div>
            <motion.div variants={field} className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="company" placeholder="Acme Steel Imports Ltd" className="pl-9" required />
              </div>
            </motion.div>
          </>
        )}

        <motion.div variants={field} className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="pl-9"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={field} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isSignup && (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
              >
                Forgot?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-9"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={field}>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                {isSignup ? "Creating account…" : "Signing in…"}
              </>
            ) : isSignup ? (
              "Continue to onboarding"
            ) : (
              "Sign in"
            )}
          </Button>
        </motion.div>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        {isSignup ? (
          <>
            Already a member?{" "}
            <Link href="/auth/signin" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Need access?{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Request verification
            </Link>
          </>
        )}
      </motion.p>
    </div>
  );
}
