import { describe, expect, it } from "vitest";
import {
  canSeeLikesYouDetails,
  likesYouDisplayName,
} from "@/lib/likes-you-gating";

describe("likes you gating", () => {
  it("gates detail visibility by tier", () => {
    expect(canSeeLikesYouDetails("free")).toBe(false);
    expect(canSeeLikesYouDetails("premium")).toBe(true);
    expect(canSeeLikesYouDetails("premium_plus")).toBe(true);
  });

  it("masks display name on free tier", () => {
    expect(likesYouDisplayName("free", "Jordan", 28)).toBe("Someone nearby");
    expect(likesYouDisplayName("premium", "Jordan", 28)).toBe("Jordan, 28");
  });
});
