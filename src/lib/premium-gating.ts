import type { SubscriptionTier } from "@/types";

export function hasPaidTier(tier: SubscriptionTier): boolean {
  return tier === "premium" || tier === "premium_plus";
}

export function canUseRewind(
  tier: SubscriptionTier,
  hasLastSwipe: boolean,
): boolean {
  return hasPaidTier(tier) && hasLastSwipe;
}

export function canLikeUnlimited(tier: SubscriptionTier): boolean {
  return hasPaidTier(tier);
}

export function dailyLikeCap(tier: SubscriptionTier, freeCap: number): number {
  return canLikeUnlimited(tier) ? Number.POSITIVE_INFINITY : freeCap;
}

export function canPurchaseTier(
  current: SubscriptionTier,
  target: SubscriptionTier,
): boolean {
  if (target === "free") {
    return false;
  }
  return current !== target;
}
