import { describe, expect, it } from "vitest";
import { MOCK_PROFILES } from "@/lib/mock-data";
import { buildDiscoverDeck } from "@/lib/deck-logic";
import type { DiscoverFilters, UserDatingProfile } from "@/types";

const demoUser: UserDatingProfile = {
  name: "Demo",
  age: 28,
  bio: "",
  photoUrls: [],
  interests: ["Hiking"],
  gender: "woman",
  showMe: "everyone",
  ageRangeMin: 21,
  ageRangeMax: 40,
  onboardingComplete: true,
};

const defaultFilters: DiscoverFilters = {
  maxDistanceMiles: 50,
  ageMin: 21,
  ageMax: 40,
  interestTags: [],
};

describe("buildDiscoverDeck", () => {
  it("excludes passed, liked, and blocked ids", () => {
    const { deck, emptyReason } = buildDiscoverDeck(
      MOCK_PROFILES,
      ["p1"],
      ["p2"],
      ["p3"],
      demoUser,
      defaultFilters,
    );
    const ids = deck.map((p) => p.id);
    expect(ids).not.toContain("p1");
    expect(ids).not.toContain("p2");
    expect(ids).not.toContain("p3");
    expect(emptyReason).toBeNull();
  });

  it("returns filters empty reason when unseen remain but none pass filters", () => {
    const tightFilters: DiscoverFilters = {
      ...defaultFilters,
      maxDistanceMiles: 1,
      interestTags: ["UnderwaterBasketweaving"],
    };
    const { deck, emptyReason } = buildDiscoverDeck(
      MOCK_PROFILES,
      [],
      [],
      [],
      demoUser,
      tightFilters,
    );
    expect(deck.length).toBe(0);
    expect(emptyReason).toBe("filters");
  });

  it("returns blocked empty reason when only blocked profiles remain", () => {
    const { emptyReason } = buildDiscoverDeck(
      MOCK_PROFILES,
      ["p4", "p5", "p6", "p7", "p8"],
      [],
      ["p1", "p2", "p3"],
      demoUser,
      defaultFilters,
    );
    expect(emptyReason).toBe("blocked");
  });
});
