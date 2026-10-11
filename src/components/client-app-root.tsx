"use client";

import { AppProvider } from "@/context/app-provider";
import { AuthGate } from "@/components/auth-gate";
import { AppShell } from "@/components/app-shell";

export function ClientAppRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppProvider>
        <AppShell>{children}</AppShell>
      </AppProvider>
    </AuthGate>
  );
}
