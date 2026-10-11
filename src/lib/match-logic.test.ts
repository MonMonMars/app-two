import { describe, expect, it } from "vitest";
import {
  createsMutualMatch,
  deckProfileIdsAfterSwipe,
} from "@/lib/match-logic";

describe("createsMutualMatch", () => {
  it("matches demo ids in MATCH_ON_LIKE_IDS", () => {
    expect(createsMutualMatch("p1")).toBe(true);
    expect(createsMutualMatch("p2")).toBe(false);
  });
});

describe("deckProfileIdsAfterSwipe", () => {
  it("filters seen profile ids", () => {
    const all = ["a", "b", "c", "d"];
    expect(deckProfileIdsAfterSwipe(all, ["a"], ["b"], ["c"])).toEqual(["d"]);
  });
});
