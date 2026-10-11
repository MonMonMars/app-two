"use client";

import { useApp } from "@/context/app-provider";
import { formatRelativeTime } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export function MatchList() {
  const { matches } = useApp();

  if (matches.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/50 p-8 text-center">
        <p className="text-3xl">💫</p>
        <h2 className="mt-2 text-lg font-semibold text-white">
          No matches yet
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Like Jordan, Riley, Casey, or Taylor in Discover to match instantly.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Start swiping
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {matches.map((match) => (
        <li key={match.id}>
          <Link
            href={`/chat/${match.id}`}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/80 p-3 transition hover:border-rose-500/30"
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
            <span className="text-zinc-600">›</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
