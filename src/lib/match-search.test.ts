import { describe, expect, it } from "vitest";
import { filterMatchesByName } from "@/lib/match-search";
import type { Match } from "@/types";

const m = (name: string): Match => ({
  id: name,
  matchedAt: new Date().toISOString(),
  profile: {
    id: "p",
    name,
    age: 25,
    bio: "",
    location: "",
    interests: [],
    photoUrl: "https://example.com/p.jpg",
  },
});

describe("filterMatchesByName", () => {
  it("returns all when query empty", () => {
    const list = [m("Sam"), m("Jordan")];
    expect(filterMatchesByName(list, "")).toHaveLength(2);
    expect(filterMatchesByName(list, "   ")).toHaveLength(2);
  });

  it("filters case-insensitively", () => {
    const list = [m("Sam"), m("Jordan")];
    expect(filterMatchesByName(list, "sam")).toHaveLength(1);
    expect(filterMatchesByName(list, "JORD")).toHaveLength(1);
  });

  it("returns empty when no match", () => {
    expect(filterMatchesByName([m("A")], "zzz")).toHaveLength(0);
  });
});
