"use client";

import { useApp } from "@/context/app-provider";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

export function PushSoftPrompt() {
  const { pushSoftPrompt, dismissPushSoftPrompt, hydrated } = useApp();

  if (!hydrated || pushSoftPrompt !== "eligible") {
    return null;
  }

  const onEnable = () => {
    dismissPushSoftPrompt();
  };

  return (
    <div
      className="fixed inset-x-0 bottom-24 z-40 mx-auto max-w-lg px-4"
      role="dialog"
      aria-labelledby="push-prompt-title"
      aria-modal="false"
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4 shadow-2xl">
        <p id="push-prompt-title" className="font-semibold text-white">
          Never miss a match?
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          Mock push prompt — App Two does not register real notifications in
          this demo.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`flex-1 ${buttonPrimaryClassName}`}
            onClick={onEnable}
          >
            Enable alerts (stub)
          </button>
          <button
            type="button"
            className="flex-1 rounded-full border border-zinc-600 px-4 py-2.5 text-sm font-semibold text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
            onClick={dismissPushSoftPrompt}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
