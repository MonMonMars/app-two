import { describe, expect, it } from "vitest";
import {
  buildInviteUrl,
  DEMO_REFERRAL_CODE,
  mockReferralCountFromStorage,
} from "@/lib/referral";

describe("referral stub", () => {
  it("builds invite URLs", () => {
    expect(buildInviteUrl("https://app.example.com", DEMO_REFERRAL_CODE)).toBe(
      "https://app.example.com/invite?ref=APP-TWO-DEMO",
    );
  });

  it("normalizes referral counts", () => {
    expect(mockReferralCountFromStorage(undefined)).toBe(0);
    expect(mockReferralCountFromStorage(3)).toBe(3);
    expect(mockReferralCountFromStorage(-1)).toBe(0);
  });
});
