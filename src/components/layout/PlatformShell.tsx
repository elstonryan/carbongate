"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileTopBar, MobileDrawer } from "./MobileNav";
import { PageTransition } from "./PageTransition";

/**
 * Responsive app shell.
 * - lg+ : collapsible sidebar + header + fixed-height animated main panel.
 * - <lg : compact top bar + off-canvas drawer; main scrolls vertically.
 * Onboarding renders full-bleed (its own wizard chrome).
 */
export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");

  if (isOnboarding) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <MobileDrawer />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar />
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto bg-surface p-4 sm:p-5 lg:overflow-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
