"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

/**
 * The VS-Code-inspired app shell: fixed sidebar + header + animated main panel.
 * Onboarding renders full-bleed (its own wizard chrome), so we skip the shell there.
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
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-hidden bg-surface p-5">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
