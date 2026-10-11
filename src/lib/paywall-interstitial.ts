import { hasPaidTier } from "@/lib/premium-gating";
import type { SubscriptionTier } from "@/types";

export function totalSwipeCount(
  passedIds: string[],
  likedIds: string[],
): number {
  return passedIds.length + likedIds.length;
}

export function shouldShowSoftPaywall(
  tier: SubscriptionTier,
  passedIds: string[],
  likedIds: string[],
  threshold: number,
  dismissedDayKey: string | null,
  todayKey: string,
): boolean {
  if (hasPaidTier(tier)) {
    return false;
  }
  if (dismissedDayKey === todayKey) {
    return false;
  }
  return totalSwipeCount(passedIds, likedIds) >= threshold;
}
