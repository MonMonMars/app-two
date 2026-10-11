"use client";

import { useAuth } from "@/context/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AuthGate({ children }: { children: ReactNode }) {
  const { hydrated, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!user && pathname !== "/login") {
      router.replace("/login");
    }
    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [hydrated, user, pathname, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-zinc-400">
        <p className="animate-pulse text-sm">Loading App Two…</p>
      </div>
    );
  }

  if (!user && pathname !== "/login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-zinc-400">
        <p className="text-sm">Redirecting to sign in…</p>
      </div>
    );
  }

  return children;
}
