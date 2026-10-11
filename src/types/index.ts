export type GenderIdentity = "woman" | "man" | "nonbinary" | "other";

export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  photoUrl: string;
  photoUrls?: string[];
  verified?: boolean;
  gender?: GenderIdentity;
  distanceMiles?: number;
};

export type Match = {
  id: string;
  profile: Profile;
  matchedAt: string;
  lastMessagePreview?: string;
};

export type ChatMessageKind = "text" | "image";

export type ChatMessage = {
  id: string;
  matchId: string;
  sender: "me" | "them";
  body: string;
  sentAt: string;
  kind?: ChatMessageKind;
  imageUrl?: string;
  readAt?: string | null;
};

export type ReportReason =
  "fake_profile" | "harassment" | "spam" | "underage" | "other";

export type SubscriptionTier = "free" | "premium" | "premium_plus";

export type MonetizationProduct =
  "premium_monthly" | "premium_annual" | "boost" | "super_like_pack";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type UserDatingProfile = {
  name: string;
  age: number;
  bio: string;
  photoUrls: string[];
  interests: string[];
  gender: GenderIdentity;
  showMe: GenderIdentity[] | "everyone";
  ageRangeMin: number;
  ageRangeMax: number;
  onboardingComplete: boolean;
};

export type DiscoverFilters = {
  maxDistanceMiles: number;
  ageMin: number;
  ageMax: number;
  interestTags: string[];
};

export type NotificationSettings = {
  matches: boolean;
  messages: boolean;
  marketing: boolean;
};

export type AppSettings = {
  notifications: NotificationSettings;
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
  boostActiveUntil: string | null;
  blockedProfileIds: string[];
  streakCount: number;
  streakDayKey: string;
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

export type ToastItem = {
  id: string;
  title: string;
  body?: string;
  href?: string;
  variant: "match" | "info" | "boost";
};
