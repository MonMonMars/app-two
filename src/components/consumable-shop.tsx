"use client";

import { useApp } from "@/context/app-provider";
import type { MonetizationProduct } from "@/types";

type ConsumableShopProps = {
  loadingProduct: MonetizationProduct | null;
  onPurchase: (product: MonetizationProduct) => void;
  lastPurchaseMessage: string | null;
};

export function ConsumableShop({
  loadingProduct,
  onPurchase,
  lastPurchaseMessage,
}: ConsumableShopProps) {
  const { boostsRemaining, superLikesRemaining } = useApp();

  return (
    <section className="flex flex-col gap-3" aria-labelledby="shop-heading">
      <h3 id="shop-heading" className="text-sm font-semibold text-white">
        Consumable shop (mock)
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <h4 className="font-semibold text-white">Boost pack</h4>
          <p className="mt-1 text-sm text-zinc-400">
            +1 Boost · 30 min priority in Discover.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Inventory:{" "}
            <strong className="text-amber-200">{boostsRemaining}</strong> boost
            {boostsRemaining === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            disabled={loadingProduct !== null}
            onClick={() => onPurchase("boost")}
            className="mt-3 w-full rounded-full border border-rose-500/50 bg-rose-950/30 py-2.5 text-sm font-semibold text-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:opacity-50"
          >
            {loadingProduct === "boost" ? "Processing…" : "Buy boost — $4.99"}
          </button>
        </article>
        <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <h4 className="font-semibold text-white">Super Like pack</h4>
          <p className="mt-1 text-sm text-zinc-400">+5 Super Likes.</p>
          <p className="mt-2 text-xs text-zinc-500">
            Inventory:{" "}
            <strong className="text-sky-200">{superLikesRemaining}</strong>{" "}
            Super Like{superLikesRemaining === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            disabled={loadingProduct !== null}
            onClick={() => onPurchase("super_like_pack")}
            className="mt-3 w-full rounded-full border border-rose-500/50 bg-rose-950/30 py-2.5 text-sm font-semibold text-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:opacity-50"
          >
            {loadingProduct === "super_like_pack"
              ? "Processing…"
              : "Buy pack — $2.99"}
          </button>
        </article>
      </div>
      {lastPurchaseMessage ? (
        <p
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
          role="status"
        >
          {lastPurchaseMessage}
        </p>
      ) : null}
    </section>
  );
}
