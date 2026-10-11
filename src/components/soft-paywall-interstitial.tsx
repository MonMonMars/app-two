"use client";

import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import Link from "next/link";

type SoftPaywallInterstitialProps = {
  swipeCount: number;
  threshold: number;
  onDismiss: () => void;
};

export function SoftPaywallInterstitial({
  swipeCount,
  threshold,
  onDismiss,
}: SoftPaywallInterstitialProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="soft-paywall-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-zinc-950 p-6 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-wider text-rose-400">
          App Two Premium
        </p>
        <h2
          id="soft-paywall-title"
          className="mt-2 text-2xl font-bold text-white"
        >
          You&apos;re on a roll
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          You&apos;ve swiped {swipeCount} times (demo threshold {threshold}).
          Upgrade for unlimited likes, rewind, and Likes You.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link href="/premium" className={buttonPrimaryClassName}>
            See Premium plans
          </Link>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full border border-zinc-600 py-2.5 text-sm font-semibold text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
          >
            Keep swiping for now
          </button>
        </div>
      </div>
    </div>
  );
}
