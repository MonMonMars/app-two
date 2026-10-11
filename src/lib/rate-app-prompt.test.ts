import { describe, expect, it } from "vitest";
import { shouldShowRateAppPrompt } from "@/lib/rate-app-prompt";
import { RATE_APP_MATCH_THRESHOLD } from "@/lib/constants";

describe("rate app prompt", () => {
  it("uses configured match threshold", () => {
    expect(RATE_APP_MATCH_THRESHOLD).toBe(3);
  });

  it("shows at threshold when not dismissed", () => {
    expect(shouldShowRateAppPrompt(3, false)).toBe(true);
    expect(shouldShowRateAppPrompt(2, false)).toBe(false);
  });

  it("hides when dismissed", () => {
    expect(shouldShowRateAppPrompt(10, true)).toBe(false);
  });
});
