"use client";

import { EmptyState } from "@/components/empty-state";
import { useApp } from "@/context/app-provider";
import { formatRelativeTime } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export function MatchList() {
  const { matches } = useApp();

  if (matches.length === 0) {
    return (
      <EmptyState
        emoji="💫"
        title="No matches yet"
        description="When you and someone both like each other, they'll show up here. In this demo, liking Jordan, Riley, Casey, or Taylor always matches."
        action={{ href: "/", label: "Back to Discover" }}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {matches.map((match) => (
        <li key={match.id}>
          <Link
            href={`/chat/${match.id}`}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/80 p-3 transition hover:border-rose-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-500/30">
              <Image
                src={match.profile.photoUrl}
                alt={match.profile.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-semibold text-white">
                  {match.profile.name}
                </p>
                <span className="shrink-0 text-xs text-zinc-500">
                  {formatRelativeTime(match.matchedAt)}
                </span>
              </div>
              <p className="truncate text-sm text-zinc-400">
                {match.lastMessagePreview ?? "Start the conversation"}
              </p>
            </div>
            <span className="text-zinc-600" aria-hidden>
              ›
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
