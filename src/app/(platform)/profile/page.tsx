"use client";

import { motion } from "framer-motion";
import {
  User,
  Building2,
  Globe2,
  ShieldCheck,
  Bell,
  CreditCard,
  LogOut,
  Edit3,
} from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { VerificationStatusBadge } from "@/components/shared/VerificationStatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { initials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TABS = ["Profile", "Verification", "Notifications", "Billing"] as const;
type Tab = (typeof TABS)[number];

export default function ProfilePage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <h1 className="text-xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your account, verification status, and preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="flex min-h-0 flex-1 gap-4"
      >
        <ProfileSidebar />
        <ProfileMain />
      </motion.div>
    </div>
  );
}

function ProfileSidebar() {
  const { user } = useAppStore();

  return (
    <div className="flex w-60 shrink-0 flex-col gap-3">
      {/* Avatar card */}
      <div className="rounded-xl border border-border bg-surface/60 p-5 text-center backdrop-blur-xl">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-xl font-bold ring-2 ring-primary/20">
          {initials(user.name)}
        </div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
        <p className="text-xs text-muted-foreground/60">{user.company}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <RegimeBadge regime={user.primaryRegime} size="sm" />
          <VerificationStatusBadge status={user.verification} />
        </div>
      </div>

      {/* Nav */}
      <div className="rounded-xl border border-border bg-surface/60 p-2 backdrop-blur-xl">
        {[
          { icon: User, label: "Profile" },
          { icon: ShieldCheck, label: "Verification" },
          { icon: Bell, label: "Notifications" },
          { icon: CreditCard, label: "Billing" },
        ].map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              i === 0
                ? "bg-primary/10 text-foreground font-medium"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
        <div className="my-1 border-t border-border" />
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-danger transition-colors hover:bg-danger/5">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

function ProfileMain() {
  const { user } = useAppStore();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto scrollbar-thin">
      {/* Personal info */}
      <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Personal information</h3>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Full name", value: user.name },
            { label: "Role", value: user.role },
            { label: "Email", value: "elstonryan491@gmail.com" },
            { label: "Company", value: user.company },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regime exposure */}
      <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-secondary" />
          <h3 className="text-sm font-semibold">Regime exposure</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <RegimeBadge regime="EU" />
          <RegimeBadge regime="UK" />
          <button className="flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
            + Add regime
          </button>
        </div>
      </div>

      {/* Company */}
      <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Company</h3>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Company name", value: user.company },
            { label: "Country", value: "Ireland" },
            { label: "VAT / EORI", value: "IE9876543B" },
            { label: "Verified company", value: "Yes" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verification */}
      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Verification status</h3>
          <VerificationStatusBadge status={user.verification} />
        </div>
        <p className="text-xs text-muted-foreground">
          Your identity and role have been verified. Re-verification is due
          annually. Documents are retained for 5 years then deleted per GDPR.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground/60">
          <span>Verified: 2026-03-15</span>
          <span>·</span>
          <span>Expires: 2027-03-15</span>
        </div>
      </div>
    </div>
  );
}
