import { describe, expect, it } from "vitest";
import {
  canSwipeLike,
  dailyLikeCounterLabel,
  isDailyLikeCapReached,
  remainingDailyLikes,
} from "@/lib/daily-like-cap";

describe("daily like cap", () => {
  it("computes remaining for free tier", () => {
    expect(remainingDailyLikes("free", 10, 25)).toBe(15);
    expect(remainingDailyLikes("free", 25, 25)).toBe(0);
    expect(remainingDailyLikes("premium", 25, 25)).toBeNull();
  });

  it("detects cap reached", () => {
    expect(isDailyLikeCapReached("free", 25, 25)).toBe(true);
    expect(isDailyLikeCapReached("free", 24, 25)).toBe(false);
    expect(isDailyLikeCapReached("premium_plus", 999, 25)).toBe(false);
  });

  it("gates swipe like", () => {
    expect(canSwipeLike("free", 25, 25)).toBe(false);
    expect(canSwipeLike("free", 0, 25)).toBe(true);
  });

  it("formats counter label", () => {
    expect(dailyLikeCounterLabel("free", 20, 25)).toContain("5 likes");
    expect(dailyLikeCounterLabel("free", 25, 25)).toContain("No likes");
    expect(dailyLikeCounterLabel("premium", 0, 25)).toContain("Unlimited");
  });
});
