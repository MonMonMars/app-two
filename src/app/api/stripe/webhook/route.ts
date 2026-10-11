import { NextResponse } from "next/server";

/**
 * Stripe webhook stub — verify signature with STRIPE_WEBHOOK_SECRET when wiring production.
 * No secrets are committed; this route acknowledges test pings only.
 */
export async function POST(request: Request) {
  const configured = Boolean(
    process.env.STRIPE_WEBHOOK_SECRET &&
    !process.env.STRIPE_WEBHOOK_SECRET.includes("your_webhook_secret"),
  );

  if (!configured) {
    return NextResponse.json({
      received: true,
      mode: "mock",
      message:
        "Webhook secret not configured — event ignored (safe for local dev).",
    });
  }

  const payload = await request.text();
  return NextResponse.json({
    received: true,
    mode: "stub",
    bytes: payload.length,
    message: "Add Stripe SDK signature verification here before going live.",
  });
}
