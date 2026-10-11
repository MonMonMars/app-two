import { describe, expect, it } from "vitest";
import { profileMatchesDiscoverFilters } from "@/lib/discover-filter";
import type { DiscoverFilters, Profile, UserDatingProfile } from "@/types";

const user: UserDatingProfile = {
  name: "U",
  age: 30,
  bio: "",
  photoUrls: [],
  interests: [],
  gender: "man",
  showMe: ["woman"],
  ageRangeMin: 25,
  ageRangeMax: 35,
  onboardingComplete: true,
};

const baseProfile: Profile = {
  id: "x",
  name: "Test",
  age: 28,
  bio: "",
  location: "1 mi",
  interests: ["Art", "Wine"],
  photoUrl: "https://example.com/p.jpg",
  gender: "woman",
  distanceMiles: 10,
};

const filters: DiscoverFilters = {
  maxDistanceMiles: 15,
  ageMin: 25,
  ageMax: 35,
  interestTags: ["Art"],
};

describe("profileMatchesDiscoverFilters", () => {
  it("accepts profile within distance, age, gender, and interests", () => {
    expect(profileMatchesDiscoverFilters(baseProfile, filters, user)).toBe(
      true,
    );
  });

  it("rejects when distance exceeds max", () => {
    expect(
      profileMatchesDiscoverFilters(
        { ...baseProfile, distanceMiles: 20 },
        filters,
        user,
      ),
    ).toBe(false);
  });

  it("rejects when interest filter has no overlap", () => {
    expect(
      profileMatchesDiscoverFilters(
        { ...baseProfile, interests: ["Running"] },
        filters,
        user,
      ),
    ).toBe(false);
  });
});
