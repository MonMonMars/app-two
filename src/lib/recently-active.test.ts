import { describe, expect, it } from "vitest";
import {
  isProfileRecentlyActive,
  recentlyActiveLabel,
} from "@/lib/recently-active";

describe("recently active mock", () => {
  it("returns stable boolean per profile id", () => {
    const a = isProfileRecentlyActive("p1");
    expect(isProfileRecentlyActive("p1")).toBe(a);
    expect(typeof a).toBe("boolean");
  });

  it("varies across ids", () => {
    const flags = ["p1", "p2", "p3", "p4", "p5"].map(isProfileRecentlyActive);
    expect(flags.some(Boolean)).toBe(true);
    expect(flags.some((f) => !f)).toBe(true);
  });

  it("exposes label copy", () => {
    expect(recentlyActiveLabel()).toBe("Recently active");
  });
});
