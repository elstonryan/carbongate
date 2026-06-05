"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Calculator,
  MessageSquare,
  BookOpen,
  Users,
  Bell,
  User,
  Shield,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin", label: "Admin", icon: Shield, adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 flex h-screen shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur-xl"
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 px-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-background">
            C
          </span>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-nowrap text-lg font-semibold tracking-tight"
            >
              Carbon<span className="text-primary">Gate</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-3">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                />
              )}
              <Icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {item.adminOnly && !sidebarCollapsed && (
                <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                  ADMIN
                </span>
              )}
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 shrink-0 transition-transform",
              sidebarCollapsed && "rotate-180"
            )}
          />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
