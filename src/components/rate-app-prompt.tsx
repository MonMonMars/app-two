"use client";

import { useApp } from "@/context/app-provider";
import { track } from "@/lib/analytics";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

export function RateAppPrompt() {
  const { showRateAppPrompt, dismissRateAppPrompt } = useApp();

  if (!showRateAppPrompt) {
    return null;
  }

  return (
    <div
      className="fixed bottom-20 left-0 right-0 z-40 mx-auto max-w-lg px-4"
      role="dialog"
      aria-labelledby="rate-app-title"
      aria-modal="false"
    >
      <div className="rounded-2xl border border-amber-500/30 bg-zinc-900/95 p-4 shadow-xl backdrop-blur-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
          App Two
        </p>
        <h2 id="rate-app-title" className="mt-1 text-base font-bold text-white">
          Enjoying App Two?
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Mock store rating prompt — no app store APIs. Tap rate to log a demo
          event, or dismiss for this device.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`flex-1 ${buttonPrimaryClassName} py-2.5 text-sm`}
            onClick={() => {
              track("rate_app_mock");
              dismissRateAppPrompt();
            }}
          >
            Rate App Two ⭐
          </button>
          <button
            type="button"
            className="rounded-full border border-zinc-600 px-4 py-2.5 text-sm font-semibold text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
            onClick={dismissRateAppPrompt}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
