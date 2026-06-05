"use client";

import { ThemeProvider } from "next-themes";

/**
 * Global client-side providers. The app is dark-only, so the theme provider is
 * locked to "dark" and switching is disabled.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
