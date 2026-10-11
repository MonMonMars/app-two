"use client";

import { track } from "@/lib/analytics";
import {
  displayNameFromEmail,
  loadAuthUser,
  PENDING_MAGIC_EMAIL_KEY,
  saveAuthUser,
} from "@/lib/auth-storage";
import type { AuthUser } from "@/types";
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  hydrated: boolean;
  user: AuthUser | null;
  pendingMagicEmail: string | null;
  requestMagicLink: (email: string) => Promise<{ ok: boolean; error?: string }>;
  completeMagicLink: () => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  updateDisplayName: (name: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingMagicEmail, setPendingMagicEmail] = useState<string | null>(
    null,
  );

  useEffect(() => {
    startTransition(() => {
      setUser(loadAuthUser());
      setPendingMagicEmail(
        sessionStorage.getItem(PENDING_MAGIC_EMAIL_KEY) ?? null,
      );
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    saveAuthUser(user);
  }, [user]);

  const requestMagicLink = useCallback(async (email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      return { ok: false, error: "Enter a valid email address." };
    }

    try {
      await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
    } catch {
      /* mock-first: still proceed locally */
    }

    sessionStorage.setItem(PENDING_MAGIC_EMAIL_KEY, trimmed);
    setPendingMagicEmail(trimmed);
    return { ok: true };
  }, []);

  const completeMagicLink = useCallback(async () => {
    const email =
      pendingMagicEmail ??
      sessionStorage.getItem(PENDING_MAGIC_EMAIL_KEY) ??
      null;
    if (!email) {
      return { ok: false, error: "No pending sign-in. Request a link first." };
    }

    try {
      await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: "mock-token" }),
      });
    } catch {
      /* local mock auth */
    }

    const nextUser: AuthUser = {
      id: `user-${email.replace(/[^a-z0-9]/gi, "").slice(0, 24)}`,
      email,
      displayName: displayNameFromEmail(email),
      createdAt: new Date().toISOString(),
    };
    setUser(nextUser);
    track("signup", { userId: nextUser.id });
    sessionStorage.removeItem(PENDING_MAGIC_EMAIL_KEY);
    setPendingMagicEmail(null);
    return { ok: true };
  }, [pendingMagicEmail]);

  const signOut = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(PENDING_MAGIC_EMAIL_KEY);
    setPendingMagicEmail(null);
  }, []);

  const updateDisplayName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    setUser((prev) => (prev ? { ...prev, displayName: trimmed } : prev));
  }, []);

  const value = useMemo(
    () => ({
      hydrated,
      user,
      pendingMagicEmail,
      requestMagicLink,
      completeMagicLink,
      signOut,
      updateDisplayName,
    }),
    [
      hydrated,
      user,
      pendingMagicEmail,
      requestMagicLink,
      completeMagicLink,
      signOut,
      updateDisplayName,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
