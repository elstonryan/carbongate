"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Users,
  Eye,
  RefreshCw,
} from "lucide-react";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { cn } from "@/lib/utils";

const ADMIN_TABS = ["Verification Queue", "Corpus Management", "Users"] as const;
type AdminTab = (typeof ADMIN_TABS)[number];

// Mock data
const VERIFICATION_QUEUE = [
  { id: "v1", name: "Anna Schmidt", company: "EuroSteel GmbH", role: "Importer", regime: "EU" as const, submitted: "2026-06-04", status: "pending" },
  { id: "v2", name: "Raj Patel", company: "IndiaForge Pvt Ltd", role: "Exporter", regime: "EU" as const, submitted: "2026-06-03", status: "pending" },
  { id: "v3", name: "Sophie Laurent", company: "Carbon Verify SAS", role: "Verifier", regime: "EU" as const, submitted: "2026-06-02", status: "approved" },
  { id: "v4", name: "James O'Brien", company: "HMRC Broker Ltd", role: "Broker", regime: "UK" as const, submitted: "2026-06-01", status: "pending" },
  { id: "v5", name: "Mei Lin", company: "CSR Consulting", role: "Consultant", regime: "EU" as const, submitted: "2026-05-31", status: "rejected" },
];

const CORPUS_DOCS = [
  { id: "cd1", title: "EU Regulation 2023/956 — Establishing CBAM", regime: "EU" as const, status: "live", lastUpdated: "2026-05-20", reviewer: "Sofia Renaud" },
  { id: "cd2", title: "EU Implementing Regulation 2023/1773", regime: "EU" as const, status: "live", lastUpdated: "2026-05-18", reviewer: "Sofia Renaud" },
  { id: "cd3", title: "HMRC CBAM Guidance — UK Implementation", regime: "UK" as const, status: "staged", lastUpdated: "2026-06-05", reviewer: "Pending" },
  { id: "cd4", title: "Steel Sector Guide — Embedded Emissions", regime: "EU" as const, status: "review", lastUpdated: "2026-06-04", reviewer: "Dr. Anke Fischer" },
  { id: "cd5", title: "Aluminium Sector Guide", regime: "EU" as const, status: "live", lastUpdated: "2026-05-15", reviewer: "Sofia Renaud" },
];

const USERS = [
  { id: "u1", name: "Markus Vogel", role: "Importer", regime: "EU" as const, verified: "verified", joined: "2026-05-10" },
  { id: "u2", name: "Priya Nair", role: "Exporter", regime: "EU" as const, verified: "verified", joined: "2026-05-12" },
  { id: "u3", name: "James Chen", role: "Consultant", regime: "EU" as const, verified: "pending", joined: "2026-06-04" },
  { id: "u4", name: "Sara Williams", role: "Verifier", regime: "UK" as const, verified: "verified", joined: "2026-04-20" },
  { id: "u5", name: "Erik Nielsen", role: "Broker", regime: "EU" as const, verified: "unverified", joined: "2026-06-05" },
];

const STATUS_STYLE: Record<string, string> = {
  pending: "border-warning/30 bg-warning/10 text-warning",
  approved: "border-primary/30 bg-primary/10 text-primary",
  rejected: "border-danger/30 bg-danger/10 text-danger",
  live: "border-primary/30 bg-primary/10 text-primary",
  staged: "border-warning/30 bg-warning/10 text-warning",
  review: "border-accent/30 bg-accent/10 text-accent",
  verified: "border-primary/30 bg-primary/10 text-primary",
  unverified: "border-border text-muted-foreground",
};

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("Verification Queue");

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl font-semibold tracking-tight">Admin</h1>
          <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-medium text-danger">
            Restricted
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Verification queue · Corpus management · User admin
        </p>

        {/* Tabs */}
        <div className="mt-4 flex items-center gap-1 rounded-xl border border-border bg-white/[0.03] p-1 w-fit">
          {ADMIN_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {tab === t && (
                <motion.span
                  layoutId="admin-tab-bg"
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span
                className={`relative ${
                  tab === t ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "Verification Queue" && (
              <div className="rounded-xl border border-border bg-surface/60 backdrop-blur-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-white/[0.02]">
                      {["Name", "Company", "Role", "Regime", "Submitted", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VERIFICATION_QUEUE.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/50 hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.role}</td>
                        <td className="px-4 py-3">
                          <RegimeBadge regime={item.regime} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{item.submitted}</td>
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize", STATUS_STYLE[item.status])}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="rounded p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            {item.status === "pending" && (
                              <>
                                <button className="rounded p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </button>
                                <button className="rounded p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger">
                                  <XCircle className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "Corpus Management" && (
              <div className="rounded-xl border border-border bg-surface/60 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Corpus documents</span>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Run golden test set
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-white/[0.02]">
                      {["Document", "Regime", "Status", "Last updated", "Reviewer", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CORPUS_DOCS.map((doc, i) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/50 hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3 font-medium max-w-xs truncate">{doc.title}</td>
                        <td className="px-4 py-3">
                          <RegimeBadge regime={doc.regime} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize", STATUS_STYLE[doc.status])}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{doc.lastUpdated}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{doc.reviewer}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="rounded p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            {doc.status === "staged" && (
                              <button className="rounded p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "Users" && (
              <div className="rounded-xl border border-border bg-surface/60 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-semibold">Verified members</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{USERS.length} total</span>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-white/[0.02]">
                      {["Name", "Role", "Regime", "Verified", "Joined", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((user, i) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/50 hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3 font-medium">{user.name}</td>
                        <td className="px-4 py-3 text-muted-foreground capitalize">{user.role}</td>
                        <td className="px-4 py-3">
                          <RegimeBadge regime={user.regime} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize", STATUS_STYLE[user.verified])}>
                            {user.verified}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{user.joined}</td>
                        <td className="px-4 py-3">
                          <button className="rounded p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
