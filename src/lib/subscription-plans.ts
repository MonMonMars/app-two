import type { SubscriptionPlan } from "@/types";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: "free",
    product: "premium_monthly",
    title: "Free",
    priceLabel: "$0",
    period: "forever",
    perks: [
      "25 likes per day",
      "1 Super Like",
      "Match & chat (demo)",
      "Ads in discovery (mock)",
    ],
  },
  {
    tier: "premium",
    product: "premium_monthly",
    title: "Premium",
    priceLabel: "$14.99",
    period: "per month",
    highlight: true,
    perks: [
      "Unlimited likes",
      "5 Super Likes / week",
      "Rewind last swipe",
      "1 Boost / month",
      "See who liked you (soon)",
    ],
  },
  {
    tier: "premium_plus",
    product: "premium_annual",
    title: "Premium+",
    priceLabel: "$119.99",
    period: "per year",
    perks: [
      "Everything in Premium",
      "2 Boosts / month",
      "Priority likes",
      "Travel mode (soon)",
      "Best value — save 33%",
    ],
  },
];
