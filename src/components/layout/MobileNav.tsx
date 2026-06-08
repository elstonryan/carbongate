"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Factory,
  Menu,
  X,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/industries", label: "Industries", icon: Factory },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin", label: "Admin", icon: Shield, adminOnly: true },
];

/** Compact top bar shown on small screens (lg:hidden). */
export function MobileTopBar() {
  const { setMobileNavOpen, user } = useAppStore();
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-3 lg:hidden">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ec-grey transition-colors hover:bg-muted hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
            CG
            <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-accent" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            Carbon<span className="text-primary">Gate</span>
          </span>
        </Link>
      </div>
      <button
        onClick={() => router.push("/profile")}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
      >
        {initials(user.name)}
      </button>
    </header>
  );
}

/** Off-canvas drawer with the full nav (lg:hidden). */
export function MobileDrawer() {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileNavOpen, setMobileNavOpen, user } = useAppStore();

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute left-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl"
          >
            {/* Brand + close */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                  CG
                  <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-accent" />
                </span>
                <span className="font-display text-base font-bold tracking-tight text-foreground">
                  Carbon<span className="text-primary">Gate</span>
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-md text-ec-grey hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {initials(user.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                <p className="truncate text-xs text-ec-grey-75">{user.company}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
              {NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors",
                      active
                        ? "bg-ec-blue-5 font-semibold text-primary"
                        : "text-ec-grey hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                    {item.adminOnly && (
                      <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-ec-grey-75">
                        ADMIN
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sign out */}
            <div className="border-t border-border p-3">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  router.push("/");
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-ec-grey transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
