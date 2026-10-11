import { describe, expect, it } from "vitest";
import {
  canAccessMainApp,
  isOnboardingRoute,
  requiresOnboardingRedirect,
} from "@/lib/onboarding-gate-logic";
import type { UserDatingProfile } from "@/types";

const complete: UserDatingProfile = {
  name: "A",
  age: 25,
  bio: "",
  photoUrls: [],
  interests: [],
  gender: "woman",
  showMe: "everyone",
  ageRangeMin: 21,
  ageRangeMax: 35,
  onboardingComplete: true,
};

const incomplete = { ...complete, onboardingComplete: false };

describe("onboarding gate logic", () => {
  it("redirects when onboarding incomplete outside wizard", () => {
    expect(requiresOnboardingRedirect(incomplete, "/discover")).toBe(true);
    expect(requiresOnboardingRedirect(incomplete, "/onboarding")).toBe(false);
  });

  it("allows main app when complete", () => {
    expect(canAccessMainApp(complete)).toBe(true);
    expect(canAccessMainApp(incomplete)).toBe(false);
  });

  it("detects onboarding routes", () => {
    expect(isOnboardingRoute("/onboarding")).toBe(true);
    expect(isOnboardingRoute("/discover")).toBe(false);
  });
});
