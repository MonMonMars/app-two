"use client";

import { useApp } from "@/context/app-provider";

export function StreakBanner() {
  const { streakCount } = useApp();

  if (streakCount < 1) {
    return null;
  }

  return (
    <div
      className="mb-3 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/80 to-zinc-900/80 px-4 py-2.5 text-sm text-violet-100"
      role="status"
    >
      <span className="font-bold">🔥 {streakCount}-day streak</span>
      <span className="text-violet-200/80">
        {" "}
        — open App Two daily (mock engagement).
      </span>
    </div>
  );
}
