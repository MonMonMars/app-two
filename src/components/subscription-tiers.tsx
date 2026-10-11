"use client";

import { SUBSCRIPTION_PLANS } from "@/lib/subscription-plans";
import type { MonetizationProduct, SubscriptionTier } from "@/types";

type SubscriptionTiersProps = {
  currentTier: SubscriptionTier;
  loadingProduct: MonetizationProduct | null;
  onSelect: (product: MonetizationProduct) => void;
};

export function SubscriptionTiers({
  currentTier,
  loadingProduct,
  onSelect,
}: SubscriptionTiersProps) {
  return (
    <div className="grid gap-3">
      {SUBSCRIPTION_PLANS.map((plan) => {
        const isCurrent = plan.tier === currentTier;
        const canBuy = plan.tier !== "free" && !isCurrent;
        return (
          <article
            key={plan.tier}
            className={`rounded-2xl border p-4 ${
              plan.highlight
                ? "border-rose-500/50 bg-gradient-to-br from-rose-500/10 to-fuchsia-600/5 shadow-lg shadow-rose-500/10"
                : "border-white/10 bg-zinc-900/60"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                <p className="text-sm text-zinc-400">
                  <span className="text-xl font-semibold text-zinc-100">
                    {plan.priceLabel}
                  </span>{" "}
                  {plan.period}
                </p>
              </div>
              {isCurrent ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">
                  Current
                </span>
              ) : null}
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span className="text-rose-400">•</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            {canBuy ? (
              <button
                type="button"
                disabled={loadingProduct !== null}
                onClick={() => onSelect(plan.product)}
                className="mt-4 w-full rounded-full bg-white py-2.5 text-sm font-bold text-zinc-900 disabled:opacity-50"
              >
                {loadingProduct === plan.product
                  ? "Processing…"
                  : `Choose ${plan.title}`}
              </button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
