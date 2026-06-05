"use client";

import { motion } from "framer-motion";
import { Hash, Lock, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  label: string;
  regime: "EU" | "UK" | "GLOBAL";
  locked?: boolean;
  unread?: number;
}

const CHANNELS: Channel[] = [
  // EU
  { id: "eu-importers", label: "eu-importers", regime: "EU", unread: 3 },
  { id: "eu-exporters", label: "eu-exporters", regime: "EU" },
  { id: "eu-verifiers", label: "eu-verifiers", regime: "EU" },
  { id: "eu-calculations", label: "eu-calculations", regime: "EU", unread: 7 },
  { id: "eu-policy", label: "eu-policy", regime: "EU" },
  // UK
  { id: "uk-importers", label: "uk-importers", regime: "UK", locked: true },
  { id: "uk-policy", label: "uk-policy", regime: "UK", locked: true },
  // General
  { id: "announcements", label: "announcements", regime: "GLOBAL" },
  { id: "introductions", label: "introductions", regime: "GLOBAL", unread: 1 },
  { id: "tools-resources", label: "tools-resources", regime: "GLOBAL" },
];

const GROUPS = [
  { label: "EU Channels", regime: "EU" as const },
  { label: "UK Channels", regime: "UK" as const },
  { label: "General", regime: "GLOBAL" as const },
];

const REGIME_DOT: Record<"EU" | "UK" | "GLOBAL", string> = {
  EU: "bg-primary",
  UK: "bg-secondary",
  GLOBAL: "bg-muted-foreground/50",
};

interface Props {
  activeChannel: string;
  onSelect: (id: string) => void;
}

export function ChannelSidebar({ activeChannel, onSelect }: Props) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border px-3 py-3">
        <Volume2 className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Community</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-2 scrollbar-thin">
        {GROUPS.map((group) => {
          const groupChannels = CHANNELS.filter((c) => c.regime === group.regime);
          return (
            <div key={group.label} className="mb-3 px-2">
              <div className="mb-1 flex items-center gap-1.5 px-2 py-0.5">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    REGIME_DOT[group.regime]
                  )}
                />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </span>
              </div>
              {groupChannels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => !ch.locked && onSelect(ch.id)}
                  disabled={ch.locked}
                  className={cn(
                    "group relative mb-0.5 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors",
                    ch.id === activeChannel
                      ? "bg-primary/10 text-foreground"
                      : ch.locked
                      ? "cursor-not-allowed text-muted-foreground/40"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {ch.id === activeChannel && (
                    <motion.span
                      layoutId="channel-active"
                      className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                    />
                  )}
                  {ch.locked ? (
                    <Lock className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span className="flex-1 truncate">{ch.label}</span>
                  {ch.unread && !ch.locked && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                      {ch.unread}
                    </span>
                  )}
                  {ch.locked && (
                    <span className="ml-auto rounded bg-secondary/10 px-1 py-0.5 text-[9px] text-secondary">
                      Jan 27
                    </span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
