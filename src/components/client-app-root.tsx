"use client";

import { AppProvider } from "@/context/app-provider";
import { ToastProvider } from "@/context/toast-provider";
import { AuthGate } from "@/components/auth-gate";
import { OnboardingGate } from "@/components/onboarding-gate";
import { AppShell } from "@/components/app-shell";
import { DebugPanel } from "@/components/debug-panel";
import { OfflineBanner } from "@/components/offline-banner";
import { PushSoftPrompt } from "@/components/push-soft-prompt";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { Suspense } from "react";

export function ClientAppRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <OnboardingGate>
        <AppProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
            <OfflineBanner />
            <PushSoftPrompt />
            <ServiceWorkerRegister />
            <Suspense fallback={null}>
              <DebugPanel />
            </Suspense>
          </ToastProvider>
        </AppProvider>
      </OnboardingGate>
    </AuthGate>
  );
}
