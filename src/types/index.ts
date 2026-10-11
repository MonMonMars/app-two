export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  photoUrl: string;
  verified?: boolean;
};

export type Match = {
  id: string;
  profile: Profile;
  matchedAt: string;
  lastMessagePreview?: string;
};

export type ChatMessage = {
  id: string;
  matchId: string;
  sender: "me" | "them";
  body: string;
  sentAt: string;
};

/** Monetization tiers shown in UI (Free is implicit). */
export type SubscriptionTier = "free" | "premium" | "premium_plus";

export type MonetizationProduct =
  "premium_monthly" | "premium_annual" | "boost" | "super_like_pack";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type AppPersistedState = {
  passedIds: string[];
  likedIds: string[];
  matchIds: string[];
  tier: SubscriptionTier;
  boostsRemaining: number;
  superLikesRemaining: number;
  likesUsedToday: number;
  likesDayKey: string;
};

export type SubscriptionPlan = {
  tier: SubscriptionTier;
  product: MonetizationProduct;
  title: string;
  priceLabel: string;
  period: string;
  highlight?: boolean;
  perks: string[];
};
