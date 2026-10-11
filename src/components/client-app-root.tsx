"use client";

import { AppProvider } from "@/context/app-provider";
import { ToastProvider } from "@/context/toast-provider";
import { AuthGate } from "@/components/auth-gate";
import { OnboardingGate } from "@/components/onboarding-gate";
import { AppShell } from "@/components/app-shell";
import { DebugPanel } from "@/components/debug-panel";
import { OfflineBanner } from "@/components/offline-banner";
import { PushSoftPrompt } from "@/components/push-soft-prompt";
import { MatchCelebrationModal } from "@/components/match-celebration-modal";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { AppErrorBoundary } from "@/components/app-error-boundary";
import { useApp } from "@/context/app-provider";
import { Suspense } from "react";

function MatchCelebrationLayer() {
  const { celebrationMatch, clearCelebrationMatch } = useApp();
  if (!celebrationMatch) {
    return null;
  }
  return (
    <MatchCelebrationModal
      match={celebrationMatch}
      onKeepSwiping={clearCelebrationMatch}
    />
  );
}

export function ClientAppRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <OnboardingGate>
        <AppProvider>
          <ToastProvider>
            <AppErrorBoundary>
              <AppShell>{children}</AppShell>
            </AppErrorBoundary>
            <MatchCelebrationLayer />
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
