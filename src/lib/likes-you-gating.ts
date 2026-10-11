import type { SubscriptionTier } from "@/types";

export function canSeeLikesYouDetails(tier: SubscriptionTier): boolean {
  return tier === "premium" || tier === "premium_plus";
}

export function likesYouDisplayName(
  tier: SubscriptionTier,
  name: string,
  age: number,
): string {
  if (canSeeLikesYouDetails(tier)) {
    return `${name}, ${age}`;
  }
  return "Someone nearby";
}
