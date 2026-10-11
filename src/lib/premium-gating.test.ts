import { describe, expect, it } from "vitest";
import {
  canLikeUnlimited,
  canPurchaseTier,
  canUseRewind,
  dailyLikeCap,
  hasPaidTier,
} from "@/lib/premium-gating";

describe("premium gating", () => {
  it("detects paid tiers", () => {
    expect(hasPaidTier("free")).toBe(false);
    expect(hasPaidTier("premium")).toBe(true);
    expect(hasPaidTier("premium_plus")).toBe(true);
  });

  it("gates rewind", () => {
    expect(canUseRewind("free", true)).toBe(false);
    expect(canUseRewind("premium", false)).toBe(false);
    expect(canUseRewind("premium", true)).toBe(true);
  });

  it("caps daily likes for free", () => {
    expect(canLikeUnlimited("free")).toBe(false);
    expect(dailyLikeCap("free", 25)).toBe(25);
    expect(dailyLikeCap("premium", 25)).toBe(Number.POSITIVE_INFINITY);
  });

  it("blocks repurchasing current tier", () => {
    expect(canPurchaseTier("premium", "premium")).toBe(false);
    expect(canPurchaseTier("free", "premium")).toBe(true);
  });
});
