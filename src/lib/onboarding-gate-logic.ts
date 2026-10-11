import type { UserDatingProfile } from "@/types";

export function requiresOnboardingRedirect(
  profile: UserDatingProfile | null,
  pathname: string,
): boolean {
  if (!profile?.onboardingComplete && !pathname.startsWith("/onboarding")) {
    return true;
  }
  return false;
}

export function isOnboardingRoute(pathname: string): boolean {
  return pathname.startsWith("/onboarding");
}

export function canAccessMainApp(profile: UserDatingProfile | null): boolean {
  return profile?.onboardingComplete === true;
}
