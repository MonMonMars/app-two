import {
  PRODUCT_AMOUNTS_USD,
  PRODUCT_LABELS,
  priceIdForProduct,
  stripeConfigured,
} from "@/lib/stripe-config";
import type { MonetizationProduct } from "@/types";
import { NextResponse } from "next/server";

type CheckoutBody = {
  product?: MonetizationProduct;
};

const VALID_PRODUCTS: MonetizationProduct[] = [
  "premium_monthly",
  "premium_annual",
  "boost",
  "super_like_pack",
];

function isMonetizationProduct(value: unknown): value is MonetizationProduct {
  return (
    typeof value === "string" &&
    VALID_PRODUCTS.includes(value as MonetizationProduct)
  );
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isMonetizationProduct(body.product)) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const product = body.product;

  if (!stripeConfigured()) {
    return NextResponse.json({
      mode: "mock" as const,
      product,
      message: `Mock checkout: ${PRODUCT_LABELS[product]} ($${PRODUCT_AMOUNTS_USD[product].toFixed(2)}). Grant applied in-app.`,
    });
  }

  // Real Stripe integration hook — install `stripe` and uncomment when keys are set.
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({ ... });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return NextResponse.json({
    mode: "stripe" as const,
    product,
    priceId: priceIdForProduct(product),
    url: `${appUrl}/premium?checkout=stub&product=${product}`,
    message:
      "Stripe secret key detected but server SDK wiring is stubbed in this scaffold. Redirect URL returned for integration testing.",
  });
}
