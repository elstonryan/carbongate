import { create } from "zustand";

export type ToastVariant = "default" | "success" | "info" | "warning" | "error";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }));
    }, 4200);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));

/**
 * Fire a toast from anywhere (event handlers, mock actions) without a hook.
 * `toast("Saved", { variant: "success", description: "..." })`
 */
export function toast(
  title: string,
  opts?: { description?: string; variant?: ToastVariant }
) {
  useToastStore.getState().push({
    title,
    description: opts?.description,
    variant: opts?.variant ?? "default",
  });
}
