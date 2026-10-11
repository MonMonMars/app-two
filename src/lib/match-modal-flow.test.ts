import { describe, expect, it } from "vitest";
import { shouldShowMatchCelebration } from "@/lib/match-celebration";
import { createsMutualMatch } from "@/lib/match-logic";
import type { Match } from "@/types";

describe("match modal flow helpers", () => {
  it("shows celebration for demo mutual likes", () => {
    expect(createsMutualMatch("p1")).toBe(true);
    const match: Match = {
      id: "m-new",
      matchedAt: new Date().toISOString(),
      profile: {
        id: "p1",
        name: "Jordan",
        age: 28,
        bio: "",
        location: "",
        interests: [],
        photoUrl: "https://example.com/p.jpg",
      },
    };
    expect(shouldShowMatchCelebration(match)).toBe(true);
  });

  it("does not show when like did not mutual match", () => {
    expect(createsMutualMatch("p2")).toBe(false);
    expect(shouldShowMatchCelebration(null)).toBe(false);
  });
});
