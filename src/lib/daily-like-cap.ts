import { hasPaidTier } from "@/lib/premium-gating";
import type { SubscriptionTier } from "@/types";

export function remainingDailyLikes(
  tier: SubscriptionTier,
  likesUsedToday: number,
  freeDailyCap: number,
): number | null {
  if (hasPaidTier(tier)) {
    return null;
  }
  return Math.max(0, freeDailyCap - likesUsedToday);
}

export function isDailyLikeCapReached(
  tier: SubscriptionTier,
  likesUsedToday: number,
  freeDailyCap: number,
): boolean {
  if (hasPaidTier(tier)) {
    return false;
  }
  return likesUsedToday >= freeDailyCap;
}

export function canSwipeLike(
  tier: SubscriptionTier,
  likesUsedToday: number,
  freeDailyCap: number,
): boolean {
  return !isDailyLikeCapReached(tier, likesUsedToday, freeDailyCap);
}

export function dailyLikeCounterLabel(
  tier: SubscriptionTier,
  likesUsedToday: number,
  freeDailyCap: number,
): string {
  const remaining = remainingDailyLikes(tier, likesUsedToday, freeDailyCap);
  if (remaining === null) {
    return "Unlimited likes";
  }
  if (remaining === 0) {
    return "No likes left today";
  }
  return `${remaining} like${remaining === 1 ? "" : "s"} left today`;
}
