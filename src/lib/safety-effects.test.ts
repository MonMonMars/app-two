import { describe, expect, it } from "vitest";
import {
  addBlockedProfileId,
  filterMatchIdsAfterUnmatch,
  filterMatchesAfterBlock,
  recordMockReport,
  removeBlockedProfileId,
} from "@/lib/safety-effects";
import type { Match } from "@/types";

const match = (id: string, profileId: string): Match => ({
  id,
  profile: {
    id: profileId,
    name: "X",
    age: 20,
    bio: "",
    location: "",
    interests: [],
    photoUrl: "https://example.com/p.jpg",
  },
  matchedAt: new Date().toISOString(),
});

describe("safety side effects", () => {
  it("adds and removes blocked ids idempotently", () => {
    expect(addBlockedProfileId(["a"], "b")).toEqual(["a", "b"]);
    expect(addBlockedProfileId(["a", "b"], "b")).toEqual(["a", "b"]);
    expect(removeBlockedProfileId(["a", "b"], "b")).toEqual(["a"]);
  });

  it("hides blocked matches", () => {
    const matches = [match("m1", "p1"), match("m2", "p2")];
    expect(filterMatchesAfterBlock(matches, ["p2"])).toHaveLength(1);
    expect(filterMatchesAfterBlock(matches, ["p2"])[0]?.profile.id).toBe("p1");
  });

  it("removes match id on unmatch", () => {
    expect(filterMatchIdsAfterUnmatch(["a", "b", "c"], "b")).toEqual([
      "a",
      "c",
    ]);
  });

  it("records mock report", () => {
    const result = recordMockReport("spam");
    expect(result.ok).toBe(true);
    expect(result.reason).toBe("spam");
  });
});
