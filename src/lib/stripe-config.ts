import type { MonetizationProduct } from "@/types";

const PLACEHOLDER_MARKERS = ["your_key_here", "placeholder", "xxx"];

function isPlaceholder(value: string | undefined): boolean {
  if (!value || value.trim() === "") {
    return true;
  }
  const lower = value.toLowerCase();
  return PLACEHOLDER_MARKERS.some((m) => lower.includes(m));
}

export function stripeConfigured(): boolean {
  return !isPlaceholder(process.env.STRIPE_SECRET_KEY);
}

export function getStripePublishableKey(): string | null {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (isPlaceholder(key)) {
    return null;
  }
  return key ?? null;
}

export function priceIdForProduct(product: MonetizationProduct): string {
  switch (product) {
    case "premium_monthly":
      return (
        process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? "price_premium_monthly_test"
      );
    case "premium_annual":
      return (
        process.env.STRIPE_PRICE_PREMIUM_ANNUAL ?? "price_premium_annual_test"
      );
    case "boost":
      return process.env.STRIPE_PRICE_BOOST ?? "price_boost_test";
    case "super_like_pack":
      return process.env.STRIPE_PRICE_SUPER_LIKES ?? "price_super_likes_test";
    default: {
      const _exhaustive: never = product;
      return _exhaustive;
    }
  }
}

export const PRODUCT_LABELS: Record<MonetizationProduct, string> = {
  premium_monthly: "App Two Premium — Monthly",
  premium_annual: "App Two Premium+ — Annual",
  boost: "Profile Boost",
  super_like_pack: "Super Like Pack (5)",
};

export const PRODUCT_AMOUNTS_USD: Record<MonetizationProduct, number> = {
  premium_monthly: 14.99,
  premium_annual: 119.99,
  boost: 4.99,
  super_like_pack: 2.99,
};
