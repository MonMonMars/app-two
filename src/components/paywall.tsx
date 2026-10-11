"use client";

import { ConsumableShop } from "@/components/consumable-shop";
import { SubscriptionTiers } from "@/components/subscription-tiers";
import { useApp } from "@/context/app-provider";
import type { MonetizationProduct } from "@/types";
import Link from "next/link";
import { useState } from "react";

function purchaseStatusMessage(product: MonetizationProduct): string {
  switch (product) {
    case "premium_monthly":
      return "Premium activated (mock). Rewind and unlimited likes unlocked.";
    case "premium_annual":
      return "Premium+ activated (mock). Best value tier applied.";
    case "boost":
      return "Boost added — inventory updated below.";
    case "super_like_pack":
      return "Super Like pack added — inventory updated below.";
    default: {
      const _exhaustive: never = product;
      return _exhaustive;
    }
  }
}

export function Paywall() {
  const { tier, applyProductPurchase } = useApp();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<MonetizationProduct | null>(null);

  const checkout = async (product: MonetizationProduct) => {
    setLoading(product);
    setStatus(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = (await res.json()) as {
        mode: "mock" | "stripe";
        message?: string;
        url?: string;
        product?: MonetizationProduct;
      };

      if (data.mode === "mock") {
        applyProductPurchase(product);
        setStatus(data.message ?? purchaseStatusMessage(product));
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus("Checkout could not be started.");
      }
    } catch {
      setStatus("Network error — try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-600/25 via-zinc-900 to-fuchsia-900/30 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-rose-300">
          Monetization MVP
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">
          Upgrade your dating game
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          Stripe test-mode is stubbed via env placeholders. Default setup runs
          mock checkout — grants apply instantly in the browser.
        </p>
        <Link
          href="/premium/manage"
          className="mt-3 inline-block text-sm font-semibold text-rose-200 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        >
          Manage subscription →
        </Link>
      </section>

      <SubscriptionTiers
        currentTier={tier}
        loadingProduct={loading}
        onSelect={checkout}
      />

      <ConsumableShop
        loadingProduct={loading}
        onPurchase={checkout}
        lastPurchaseMessage={status}
      />
    </div>
  );
}
