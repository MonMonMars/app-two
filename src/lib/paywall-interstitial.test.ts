import { describe, expect, it } from "vitest";
import {
  shouldShowSoftPaywall,
  totalSwipeCount,
} from "@/lib/paywall-interstitial";

describe("soft paywall interstitial", () => {
  it("counts swipes as pass plus like", () => {
    expect(totalSwipeCount(["a", "b"], ["c"])).toBe(3);
  });

  it("shows for free tier at threshold", () => {
    const passed = Array.from({ length: 8 }, (_, i) => `p${i}`);
    const liked = Array.from({ length: 4 }, (_, i) => `l${i}`);
    expect(
      shouldShowSoftPaywall("free", passed, liked, 12, null, "2026-01-01"),
    ).toBe(true);
  });

  it("hides when dismissed today or paid", () => {
    expect(
      shouldShowSoftPaywall(
        "free",
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
        [],
        12,
        "2026-01-01",
        "2026-01-01",
      ),
    ).toBe(false);
    expect(
      shouldShowSoftPaywall(
        "premium",
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
        [],
        12,
        null,
        "2026-01-01",
      ),
    ).toBe(false);
  });
});
