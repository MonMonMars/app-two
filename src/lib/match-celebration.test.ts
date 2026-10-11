import { describe, expect, it } from "vitest";
import {
  celebrationHeadline,
  shouldShowMatchCelebration,
} from "@/lib/match-celebration";
import type { Match } from "@/types";

const demoMatch: Match = {
  id: "m1",
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

describe("match celebration", () => {
  it("triggers when match exists", () => {
    expect(shouldShowMatchCelebration(null)).toBe(false);
    expect(shouldShowMatchCelebration(demoMatch)).toBe(true);
  });

  it("builds headline copy", () => {
    expect(celebrationHeadline("Jordan")).toContain("Jordan");
    expect(celebrationHeadline("Jordan")).toContain("Match");
  });
});
