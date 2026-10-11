import { describe, expect, it } from "vitest";
import {
  computeBoostSecondsLeft,
  formatCountdown,
} from "@/lib/boost-countdown";

describe("boost countdown", () => {
  it("computes seconds until boost ends", () => {
    const now = 1_000_000;
    const until = new Date(now + 90_000).toISOString();
    expect(computeBoostSecondsLeft(until, now)).toBe(90);
    expect(computeBoostSecondsLeft(null, now)).toBe(0);
  });

  it("formats mm:ss", () => {
    expect(formatCountdown(125)).toBe("2:05");
    expect(formatCountdown(5)).toBe("0:05");
  });
});
