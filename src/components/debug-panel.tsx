"use client";

import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import { isDebugMode } from "@/lib/debug-mode";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function DebugPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enabled = useMemo(
    () => isDebugMode(searchParams.get("debug")),
    [searchParams],
  );
  const { user } = useAuth();
  const {
    debugResetLocalData,
    debugGrantPremium,
    debugRefillConsumables,
    tier,
    boostsRemaining,
    superLikesRemaining,
  } = useApp();
  const [open, setOpen] = useState(true);

  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-2 right-2 z-50 mx-auto max-w-lg">
      {open ? (
        <div className="rounded-2xl border border-violet-500/40 bg-zinc-950/95 p-3 text-xs shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold uppercase tracking-wider text-violet-300">
              QA debug
            </p>
            <button
              type="button"
              className="text-zinc-500 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Hide debug panel"
            >
              ✕
            </button>
          </div>
          <p className="mt-1 text-zinc-500">
            {user?.email ?? "No user"} · tier {tier} · boosts {boostsRemaining}{" "}
            · super {superLikesRemaining}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-violet-600 px-2 py-1 font-semibold text-white"
              onClick={() => debugGrantPremium()}
            >
              Grant Premium
            </button>
            <button
              type="button"
              className="rounded-lg border border-zinc-600 px-2 py-1 text-zinc-200"
              onClick={() => debugRefillConsumables()}
            >
              Refill boosts & Super Likes
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-500/50 px-2 py-1 text-red-200"
              onClick={() => {
                debugResetLocalData();
                router.push("/login");
              }}
            >
              Reset localStorage
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-lg"
          onClick={() => setOpen(true)}
        >
          Debug
        </button>
      )}
    </div>
  );
}
