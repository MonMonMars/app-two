import type { AppPersistedState, SubscriptionStatus } from "@/types";

const RENEWAL_DAYS_MONTHLY = 30;
const RENEWAL_DAYS_ANNUAL = 365;

export function mockRenewalDateFromNow(
  days: number,
  now: Date = new Date(),
): string {
  const next = new Date(now);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function activateSubscription(
  state: AppPersistedState,
  plan: "monthly" | "annual",
): AppPersistedState {
  const days = plan === "annual" ? RENEWAL_DAYS_ANNUAL : RENEWAL_DAYS_MONTHLY;
  return {
    ...state,
    subscriptionStatus: "active",
    subscriptionRenewalAt: mockRenewalDateFromNow(days),
  };
}

export function cancelSubscriptionMock(
  state: AppPersistedState,
): AppPersistedState {
  return {
    ...state,
    subscriptionStatus: "canceled",
  };
}

export function reactivateSubscriptionMock(
  state: AppPersistedState,
): AppPersistedState {
  if (!state.subscriptionRenewalAt) {
    return {
      ...state,
      subscriptionStatus: "active",
      subscriptionRenewalAt: mockRenewalDateFromNow(RENEWAL_DAYS_MONTHLY),
    };
  }
  return {
    ...state,
    subscriptionStatus: "active",
  };
}

export function formatRenewalLabel(
  renewalAt: string | null,
  status: SubscriptionStatus,
): string {
  if (status === "none" || !renewalAt) {
    return "No active subscription";
  }
  const date = new Date(renewalAt);
  if (Number.isNaN(date.getTime())) {
    return "Renewal date unavailable";
  }
  const formatted = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (status === "canceled") {
    return `Access until ${formatted} (canceled)`;
  }
  return `Renews ${formatted}`;
}

export function planLabelForTier(tier: AppPersistedState["tier"]): string {
  switch (tier) {
    case "premium_plus":
      return "Premium+ (annual mock)";
    case "premium":
      return "Premium (monthly mock)";
    default:
      return "Free";
  }
}
