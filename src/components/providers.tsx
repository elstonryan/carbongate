"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/shared/Toaster";

/**
 * Global client-side providers. The platform uses the light EC-institutional
 * theme. The Toaster renders mock-action feedback app-wide.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
