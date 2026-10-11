"use client";

import { useApp } from "@/context/app-provider";
import { dailyLikeCounterLabel, isDailyLikeCapReached } from "@/lib/daily-like-cap";
import Link from "next/link";

export function DailyLikeCounter() {
  const { tier, likesUsedToday, dailyLikeLimit, hydrated } = useApp();

  if (!hydrated || tier !== "free") {
    return null;
  }

  const capped = isDailyLikeCapReached(tier, likesUsedToday, dailyLikeLimit);
  const label = dailyLikeCounterLabel(tier, likesUsedToday, dailyLikeLimit);

  return (
    <div
      className={`rounded-2xl border px-4 py-2 text-sm ${
        capped
          ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
          : "border-white/10 bg-zinc-900/60 text-zinc-300"
      }`}
      role="status"
    >
      <span className="font-semibold">{label}</span>
      <span className="text-zinc-500">
        {" "}
        · {likesUsedToday}/{dailyLikeLimit} used
      </span>
      {capped ? (
        <>
          {" "}
          <Link href="/premium" className="font-bold text-rose-300 underline">
            Upgrade for unlimited
          </Link>
        </>
      ) : null}
    </div>
  );
}
