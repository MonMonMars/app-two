"use client";

import { EmptyState } from "@/components/empty-state";
import { MatchCelebrationModal } from "@/components/match-celebration-modal";
import { PageError, PageLoading } from "@/components/page-states";
import { isDebugMode } from "@/lib/debug-mode";
import { INITIAL_MATCHES } from "@/lib/mock-data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function DevKitchenScreen() {
  const searchParams = useSearchParams();
  const allowed = useMemo(
    () => isDebugMode(searchParams.get("debug")),
    [searchParams],
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const demoMatch = INITIAL_MATCHES[0]!;

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0b0b0f] px-4 text-center text-zinc-400">
        <p>Kitchen is debug-gated. Open with ?debug=1 or run in development.</p>
        <Link href="/discover" className="text-rose-400 underline">
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-8 text-zinc-100">
      <Link href="/discover" className="text-sm text-rose-400 underline">
        ← Discover
      </Link>
      <h1 className="mt-4 text-2xl font-bold">App Two UI kitchen</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Visual QA without Storybook — static component states.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-400">Loading</h2>
          <PageLoading message="Sample loading…" />
        </section>
        <section>
          <h2 className="text-sm font-semibold text-zinc-400">Error</h2>
          <PageError message="Sample error state" onRetry={() => undefined} />
        </section>
        <section>
          <h2 className="text-sm font-semibold text-zinc-400">Empty</h2>
          <EmptyState
            emoji="🧪"
            title="Kitchen empty state"
            description="Placeholder copy."
            action={{ href: "/discover", label: "Go" }}
          />
        </section>
        <section>
          <h2 className="text-sm font-semibold text-zinc-400">
            Match celebration
          </h2>
          <button
            type="button"
            className="rounded-full border border-zinc-600 px-4 py-2 text-sm"
            onClick={() => setShowCelebration(true)}
          >
            Preview modal
          </button>
        </section>
      </div>

      {showCelebration ? (
        <MatchCelebrationModal
          match={demoMatch}
          onKeepSwiping={() => setShowCelebration(false)}
        />
      ) : null}
    </div>
  );
}
