import { describe, expect, it } from "vitest";
import { isDebugMode } from "@/lib/debug-mode";

describe("isDebugMode", () => {
  it("enables when debug query is 1", () => {
    expect(isDebugMode("1")).toBe(true);
  });

  it("is off without flag outside development", () => {
    expect(isDebugMode(null)).toBe(false);
    expect(isDebugMode("0")).toBe(false);
  });
});
