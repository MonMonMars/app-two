"use client";

import { useProfile } from "@/context/profile-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function OnboardingGate({ children }: { children: ReactNode }) {
  const { hydrated, datingProfile } = useProfile();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated || !datingProfile) {
      return;
    }
    if (
      !datingProfile.onboardingComplete &&
      !pathname.startsWith("/onboarding")
    ) {
      router.replace("/onboarding");
    }
  }, [hydrated, datingProfile, pathname, router]);

  if (!hydrated || !datingProfile) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
        Loading your profile…
      </div>
    );
  }

  if (!datingProfile.onboardingComplete) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
        Finish onboarding to continue…
      </div>
    );
  }

  return children;
}
