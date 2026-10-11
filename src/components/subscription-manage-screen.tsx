"use client";

import { PageLoading } from "@/components/page-states";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { useApp } from "@/context/app-provider";
import {
  formatRenewalLabel,
  planLabelForTier,
} from "@/lib/subscription-manage";
import Link from "next/link";

export function SubscriptionManageScreen() {
  const {
    hydrated,
    tier,
    subscriptionStatus,
    subscriptionRenewalAt,
    boostsRemaining,
    superLikesRemaining,
    cancelSubscription,
    reactivateSubscription,
  } = useApp();

  if (!hydrated) {
    return <PageLoading message="Loading subscription…" />;
  }

  const paid = tier !== "free";

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
        <h3 className="text-lg font-bold text-white">Current plan</h3>
        <p className="mt-1 text-sm text-zinc-400">{planLabelForTier(tier)}</p>
        <p className="mt-2 text-sm text-zinc-300">
          {formatRenewalLabel(subscriptionRenewalAt, subscriptionStatus)}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-zinc-950/50 p-3">
            <dt className="text-zinc-500">Boosts</dt>
            <dd className="text-xl font-bold text-white">{boostsRemaining}</dd>
          </div>
          <div className="rounded-xl bg-zinc-950/50 p-3">
            <dt className="text-zinc-500">Super Likes</dt>
            <dd className="text-xl font-bold text-white">
              {superLikesRemaining}
            </dd>
          </div>
        </dl>
      </section>

      {paid ? (
        <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <h3 className="font-semibold text-white">Manage subscription</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Cancel and reactivate are mock-only — no Stripe billing portal.
          </p>
          {subscriptionStatus === "active" ? (
            <button
              type="button"
              className="mt-3 w-full rounded-full border border-zinc-600 py-2.5 text-sm font-semibold text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
              onClick={cancelSubscription}
            >
              Cancel renewal (stub)
            </button>
          ) : (
            <button
              type="button"
              className={`mt-3 w-full ${buttonPrimaryClassName}`}
              onClick={reactivateSubscription}
            >
              Reactivate (stub)
            </button>
          )}
        </section>
      ) : (
        <Link
          href="/premium"
          className={`text-center ${buttonPrimaryClassName}`}
        >
          View Premium plans
        </Link>
      )}

      <Link
        href="/premium"
        className="text-center text-sm text-rose-400 underline"
      >
        ← Back to Premium shop
      </Link>
    </div>
  );
}
