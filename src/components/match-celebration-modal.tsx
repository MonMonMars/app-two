"use client";

import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { celebrationHeadline } from "@/lib/match-celebration";
import type { Match } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MatchCelebrationModalProps = {
  match: Match;
  onKeepSwiping: () => void;
};

export function MatchCelebrationModal({
  match,
  onKeepSwiping,
}: MatchCelebrationModalProps) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-celebration-title"
    >
      <div className="w-full max-w-sm rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-600/30 via-zinc-950 to-zinc-950 p-6 text-center shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-300">
          App Two
        </p>
        <h2
          id="match-celebration-title"
          className="mt-3 text-3xl font-black text-white"
        >
          {celebrationHeadline(match.profile.name)}
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          You and {match.profile.name} liked each other. Say hi while the moment
          is fresh.
        </p>
        <div className="relative mx-auto mt-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-rose-400/50">
          <Image
            src={match.profile.photoUrl}
            alt={match.profile.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={`/chat/${match.id}`}
            className={buttonPrimaryClassName}
            onClick={onKeepSwiping}
          >
            Send message
          </Link>
          <button
            type="button"
            onClick={onKeepSwiping}
            className="rounded-full border border-zinc-600 py-2.5 text-sm font-semibold text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
          >
            Keep swiping
          </button>
        </div>
      </div>
    </div>
  );
}
