import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Regime } from "@/lib/types";

type RegimeContext = Regime | "ALL";

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Mobile off-canvas nav (lg-down)
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  regimeContext: RegimeContext;
  setRegimeContext: (regime: RegimeContext) => void;

  // Mock authenticated user (mock-data mode).
  user: {
    name: string;
    role: string;
    company: string;
    verification: "verified" | "pending" | "unverified";
    primaryRegime: Regime;
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      regimeContext: "EU",
      setRegimeContext: (regime) => set({ regimeContext: regime }),

      user: {
        name: "Elston Ryan",
        role: "Importer",
        company: "CarbonGate Demo Co.",
        verification: "verified",
        primaryRegime: "EU",
      },
    }),
    {
      name: "carbongate-app-state",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        regimeContext: state.regimeContext,
      }),
    }
  )
);
