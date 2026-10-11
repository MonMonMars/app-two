"use client";

import { AppProvider } from "@/context/app-provider";
import { ToastProvider } from "@/context/toast-provider";
import { AuthGate } from "@/components/auth-gate";
import { OnboardingGate } from "@/components/onboarding-gate";
import { AppShell } from "@/components/app-shell";

export function ClientAppRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <OnboardingGate>
        <AppProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </AppProvider>
      </OnboardingGate>
    </AuthGate>
  );
}
