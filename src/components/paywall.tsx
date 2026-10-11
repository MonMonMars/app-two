"use client";

import { SubscriptionTiers } from "@/components/subscription-tiers";
import { useApp } from "@/context/app-provider";
import type { MonetizationProduct } from "@/types";
import { useState } from "react";

export function Paywall() {
  const { tier, boostsRemaining, applyProductPurchase } = useApp();
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
        setStatus(data.message ?? "Purchase simulated (test mode).");
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
      </section>

      <SubscriptionTiers
        currentTier={tier}
        loadingProduct={loading}
        onSelect={checkout}
      />

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <h3 className="font-semibold text-white">Profile Boost</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Be seen first for 30 minutes.{" "}
            <strong className="text-zinc-200">{boostsRemaining}</strong>{" "}
            available.
          </p>
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => checkout("boost")}
            className="mt-3 w-full rounded-full border border-rose-500/40 py-2.5 text-sm font-semibold text-rose-300"
          >
            {loading === "boost" ? "…" : "Buy boost — $4.99"}
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <h3 className="font-semibold text-white">Super Like Pack</h3>
          <p className="mt-1 text-sm text-zinc-400">
            5 Super Likes to stand out.
          </p>
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => checkout("super_like_pack")}
            className="mt-3 w-full rounded-full border border-rose-500/40 py-2.5 text-sm font-semibold text-rose-300"
          >
            {loading === "super_like_pack" ? "…" : "Buy pack — $2.99"}
          </button>
        </div>
      </section>

      {status ? (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {status}
        </p>
      ) : null}
    </div>
  );
}
