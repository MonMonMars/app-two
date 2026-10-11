import { describe, expect, it } from "vitest";
import { DEFAULT_PERSISTED_STATE } from "@/lib/storage";
import {
  activateSubscription,
  cancelSubscriptionMock,
  formatRenewalLabel,
  mockRenewalDateFromNow,
  planLabelForTier,
  reactivateSubscriptionMock,
} from "@/lib/subscription-manage";

describe("subscription manage", () => {
  it("sets renewal on activate", () => {
    const next = activateSubscription(DEFAULT_PERSISTED_STATE, "monthly");
    expect(next.subscriptionStatus).toBe("active");
    expect(next.subscriptionRenewalAt).toBeTruthy();
    expect(
      mockRenewalDateFromNow(30, new Date("2026-01-01T00:00:00.000Z")),
    ).toContain("2026-");
  });

  it("cancels and reactivates", () => {
    const active = activateSubscription(DEFAULT_PERSISTED_STATE, "monthly");
    const canceled = cancelSubscriptionMock(active);
    expect(canceled.subscriptionStatus).toBe("canceled");
    const again = reactivateSubscriptionMock(canceled);
    expect(again.subscriptionStatus).toBe("active");
  });

  it("formats renewal label", () => {
    const iso = "2026-06-15T12:00:00.000Z";
    expect(formatRenewalLabel(iso, "active")).toContain("Renews");
    expect(formatRenewalLabel(iso, "canceled")).toContain("canceled");
    expect(formatRenewalLabel(null, "none")).toContain("No active");
  });

  it("labels tiers", () => {
    expect(planLabelForTier("free")).toContain("Free");
    expect(planLabelForTier("premium")).toContain("Premium");
  });
});
