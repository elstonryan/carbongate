"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Industries", href: "/industries" },
  { label: "Platform", href: "/#platform" },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Trust", href: "/#trust" },
];

/**
 * Public-site header in the European Commission institutional language:
 * a slim utility strip over a solid white nav with a clear information
 * architecture. The `variant` prop is retained for compatibility.
 */
export function SiteNav(_props: { variant?: "light" | "dark" }) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Official-style utility strip */}
      <div className="ec-band">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 text-[11px] font-medium">
          <span className="flex items-center gap-2 text-white/85">
            <span className="inline-flex h-3.5 w-5 items-center justify-center rounded-[2px] bg-[#003399] text-[8px] text-accent ring-1 ring-white/25">
              ★
            </span>
            Independent carbon-border compliance intelligence
          </span>
          <span className="hidden items-center gap-4 text-white/65 sm:flex">
            <span>EU CBAM live · UK CBAM 2027</span>
            <Link
              href="/auth/signin"
              className="font-semibold text-white/85 underline-offset-2 hover:text-white hover:underline"
            >
              Member sign in
            </Link>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary text-[13px] font-bold tracking-tight text-white">
              CG
              <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-accent" />
            </span>
            <span className="text-[17px] font-bold tracking-tight text-foreground">
              Carbon<span className="text-primary">Gate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ec-grey transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="hidden rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/onboarding"
              className="group inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
            >
              Apply to join
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
