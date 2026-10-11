"use client";

import { OnboardingWizard } from "@/components/onboarding-wizard";
import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OnboardingRoute() {
  const { hydrated: authReady, user } = useAuth();
  const { hydrated: profileReady, datingProfile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!authReady) {
      return;
    }
    if (!user) {
      router.replace("/login");
      return;
    }
    if (profileReady && datingProfile?.onboardingComplete) {
      router.replace("/discover");
    }
  }, [authReady, profileReady, user, datingProfile, router]);

  if (!authReady || !profileReady || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-zinc-400">
        Loading…
      </div>
    );
  }

  if (datingProfile?.onboardingComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f]">
      <OnboardingWizard />
    </div>
  );
}
