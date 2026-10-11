import type { GenderIdentity } from "@/types";

export const INTEREST_OPTIONS = [
  "Hiking",
  "Photography",
  "Cooking",
  "Design",
  "Music",
  "Travel",
  "Dogs",
  "Comedy",
  "Yoga",
  "Startups",
  "Surf",
  "Film",
  "Art",
  "Books",
  "Wine",
  "Running",
  "Brunch",
  "Coffee",
  "Gaming",
  "Fitness",
  "Podcasts",
] as const;

export const GENDER_OPTIONS: { value: GenderIdentity; label: string }[] = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "nonbinary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

export const MOCK_PHOTO_PRESETS = [
  {
    label: "Golden hour",
    url: "https://picsum.photos/seed/apptwo-me-1/600/800",
  },
  {
    label: "City walk",
    url: "https://picsum.photos/seed/apptwo-me-2/600/800",
  },
  {
    label: "Coffee shop",
    url: "https://picsum.photos/seed/apptwo-me-3/600/800",
  },
] as const;

export const LEGAL_LINKS = {
  terms: "/legal/terms",
  privacy: "/legal/privacy",
  community: "/legal/community",
} as const;

export const BOOST_DURATION_MS = 30 * 60 * 1000;

/** Free-tier soft paywall interstitial after this many pass+like swipes. */
export const SOFT_PAYWALL_SWIPE_THRESHOLD = 12;

export const MESSAGE_REACTION_EMOJIS = ["❤️", "😂", "🔥"] as const;
