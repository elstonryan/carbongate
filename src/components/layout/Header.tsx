"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Globe2, LogOut, Settings, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { VerificationStatusBadge } from "@/components/shared/VerificationStatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store/app-store";
import { initials } from "@/lib/utils";
import { ALERTS } from "@/lib/mock-data/alerts";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "ai-assistant": "AI Assistant",
  calculator: "Calculator",
  community: "Community",
  library: "Library",
  directory: "Directory",
  alerts: "Alerts",
  profile: "Profile",
  admin: "Admin",
  onboarding: "Onboarding",
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { regimeContext, setRegimeContext, user } = useAppStore();

  const segment = pathname.split("/").filter(Boolean)[0] ?? "dashboard";
  const crumbs = ["CarbonGate", LABELS[segment] ?? "Dashboard"];
  const criticalCount = ALERTS.filter(
    (a) => a.urgency === "critical" || a.urgency === "high"
  ).length;

  return (
    <header className="hidden h-16 shrink-0 items-center justify-between border-b border-border bg-white px-5 lg:flex">
      <Breadcrumb items={crumbs} />

      <div className="flex items-center gap-2.5">
        {/* Regime context chip */}
        <div className="hidden items-center gap-2 sm:flex">
          <Globe2 className="h-4 w-4 text-ec-grey-75" />
          <Select
            value={regimeContext}
            onValueChange={(v) => setRegimeContext(v as typeof regimeContext)}
          >
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All regimes</SelectItem>
              <SelectItem value="EU">EU CBAM</SelectItem>
              <SelectItem value="UK">UK CBAM</SelectItem>
              <SelectItem value="US">US (monitor)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-ec-grey transition-colors hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
              {criticalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                  {criticalCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Recent alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ALERTS.slice(0, 4).map((a) => (
              <DropdownMenuItem
                key={a.id}
                onClick={() => router.push("/alerts")}
                className="flex flex-col items-start gap-0.5"
              >
                <span className="text-xs font-medium text-foreground">
                  {a.title}
                </span>
                <span className="line-clamp-1 text-[11px] text-ec-grey-75">
                  {a.summary}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/alerts")}
              className="justify-center text-xs text-primary"
            >
              View all alerts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border border-border bg-white py-1 pl-1 pr-2 transition-colors hover:bg-muted">
              <Avatar className="h-7 w-7">
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
              </Avatar>
              <span className="hidden text-xs font-medium md:inline">
                {user.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-ec-grey-75" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-ec-grey-75">{user.company}</p>
              <div className="mt-2">
                <VerificationStatusBadge status={user.verification} />
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <Settings className="text-ec-grey-75" />
              Profile &amp; settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/")}>
              <LogOut className="text-ec-grey-75" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
