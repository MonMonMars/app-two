import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  applyThemePreference,
  isThemePreference,
  normalizeThemePreference,
} from "@/lib/theme-preference";

describe("theme preference", () => {
  const attrs = new Map<string, string>();

  beforeEach(() => {
    attrs.clear();
    vi.stubGlobal("document", {
      documentElement: {
        setAttribute: (key: string, value: string) => {
          attrs.set(key, value);
        },
        getAttribute: (key: string) => attrs.get(key) ?? null,
      },
    });
  });
  it("recognizes dark and light", () => {
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("system")).toBe(false);
  });

  it("normalizes unknown values", () => {
    expect(normalizeThemePreference("light")).toBe("light");
    expect(normalizeThemePreference("nope", "dark")).toBe("dark");
  });

  it("sets data-theme on document", () => {
    applyThemePreference("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    applyThemePreference("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
