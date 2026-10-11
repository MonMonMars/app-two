import { describe, expect, it } from "vitest";
import {
  showPhotoVerifiedOnProfile,
  showPhotoVerifiedOnSelf,
  verificationBadgeLabel,
} from "@/lib/verification-badge";
import type { Profile, UserDatingProfile } from "@/types";

const profile: Profile = {
  id: "p1",
  name: "A",
  age: 25,
  bio: "",
  location: "",
  interests: [],
  photoUrl: "https://example.com/p.jpg",
  verified: true,
};

describe("verification badge helpers", () => {
  it("shows on verified profiles", () => {
    expect(showPhotoVerifiedOnProfile(profile)).toBe(true);
    expect(showPhotoVerifiedOnProfile({ ...profile, verified: false })).toBe(
      false,
    );
  });

  it("shows on self when photos exist", () => {
    const self: UserDatingProfile = {
      name: "Me",
      age: 25,
      bio: "",
      photoUrls: ["https://example.com/me.jpg"],
      interests: [],
      gender: "woman",
      showMe: "everyone",
      ageRangeMin: 21,
      ageRangeMax: 35,
      onboardingComplete: true,
    };
    expect(showPhotoVerifiedOnSelf(self)).toBe(true);
    expect(showPhotoVerifiedOnSelf({ ...self, photoUrls: [] })).toBe(false);
  });

  it("has stable label", () => {
    expect(verificationBadgeLabel()).toContain("Photo verified");
  });
});
