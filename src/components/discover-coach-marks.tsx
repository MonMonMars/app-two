"use client";

import { useApp } from "@/context/app-provider";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

const TIPS = [
  "Swipe right to like — left to pass.",
  "Tap photo edges to browse multiple pics.",
  "Use ⋮ to report or block if something feels off.",
  "Premium unlocks rewind, Likes You, and unlimited swipes.",
] as const;

export function DiscoverCoachMarks() {
  const { discoverCoachDismissed, dismissDiscoverCoach, hydrated } = useApp();

  if (!hydrated || discoverCoachDismissed) {
    return null;
  }

  return (
    <div
      className="relative z-20 rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4 shadow-lg"
      role="region"
      aria-label="Discover tips"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
        Quick tips
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-sky-100/90">
        {TIPS.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`mt-4 w-full ${buttonPrimaryClassName}`}
        onClick={dismissDiscoverCoach}
      >
        Got it
      </button>
    </div>
  );
}
