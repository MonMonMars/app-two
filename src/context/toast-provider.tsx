"use client";

import type { ToastItem } from "@/types";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastContextValue = {
  pushToast: (toast: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed left-0 right-0 top-16 z-50 mx-auto flex max-w-lg flex-col gap-2 px-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-match-pop pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
              toast.variant === "match"
                ? "border-emerald-400/40 bg-emerald-950/90 text-emerald-50"
                : toast.variant === "boost"
                  ? "border-amber-400/40 bg-amber-950/90 text-amber-50"
                  : "border-white/10 bg-zinc-900/95 text-zinc-100"
            }`}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{toast.title}</p>
                {toast.body ? (
                  <p className="mt-0.5 text-xs opacity-90">{toast.body}</p>
                ) : null}
                {toast.href ? (
                  <Link
                    href={toast.href}
                    className="mt-2 inline-block text-xs font-semibold underline"
                  >
                    Open
                  </Link>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded-lg px-2 py-1 text-xs opacity-70 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
