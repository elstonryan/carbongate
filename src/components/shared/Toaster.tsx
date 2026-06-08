"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, XCircle, Bell, X } from "lucide-react";
import { useToastStore, type ToastVariant } from "@/lib/store/toast-store";

const ICONS: Record<ToastVariant, React.ElementType> = {
  default: Bell,
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const ACCENT: Record<ToastVariant, string> = {
  default: "#004494",
  success: "#2f7d33",
  info: "#006fb4",
  warning: "#f29527",
  error: "#da2130",
};

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:bottom-4 sm:right-4 sm:left-auto sm:items-end">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.variant];
          const color = ACCENT[t.variant];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-lg border border-border bg-white p-3.5 shadow-card"
            >
              <span
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: color }}
              />
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-ec-grey-75">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="rounded p-1 text-ec-grey-50 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
