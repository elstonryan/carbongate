"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Industries", href: "/industries" },
  { label: "Platform", href: "/#platform" },
  { label: "Trust", href: "/#trust" },
];

/**
 * Shared public-site nav. `variant` adapts it to a light editorial section or a
 * dark cinematic industry world.
 */
export function SiteNav({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5",
          dark
            ? "border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            : "glass-light"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-300 to-violet-400 text-sm font-black text-[#06120c] shadow-lg">
            C
          </span>
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-tight",
              dark ? "text-white" : "text-slate-900"
            )}
          >
            Carbon<span className="text-gradient">Gate</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                dark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/signin"
            className={cn(
              "hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:block",
              dark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-slate-900"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5",
              dark
                ? "bg-white text-slate-900 hover:bg-white/90"
                : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            Launch app
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
