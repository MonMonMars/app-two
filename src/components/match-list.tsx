"use client";

import { EmptyState } from "@/components/empty-state";
import { PageLoading } from "@/components/page-states";
import { useApp } from "@/context/app-provider";
import { t } from "@/i18n";
import { formatRelativeTime } from "@/lib/format";
import {
  countUnreadForMatch,
  inboxActivityTimestamp,
} from "@/lib/match-inbox";
import type { ChatMessage, Match } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MatchRowProps = {
  match: Match;
  messages: ChatMessage[];
  lastReadAt: string | undefined;
};

function MatchRow({ match, messages, lastReadAt }: MatchRowProps) {
  const unread = countUnreadForMatch(match.id, messages, lastReadAt);
  const activityTs = inboxActivityTimestamp(match, messages);

  return (
    <li>
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
          {unread > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-semibold text-white">
              {match.profile.name}
            </p>
            <span className="shrink-0 text-xs text-zinc-500">
              {formatRelativeTime(new Date(activityTs).toISOString())}
            </span>
          </div>
          <p
            className={`truncate text-sm ${unread > 0 ? "font-medium text-zinc-200" : "text-zinc-400"}`}
          >
            {match.lastMessagePreview ?? "Start the conversation"}
          </p>
        </div>
        <span className="text-zinc-600" aria-hidden>
          ›
        </span>
      </Link>
    </li>
  );
}

export function MatchList() {
  const { inboxMatches, messages, matchLastReadAt, hydrated } = useApp();

  if (!hydrated) {
    return <PageLoading message={t().loading.matches} />;
  }

  if (inboxMatches.length === 0) {
    return (
      <EmptyState
        emoji="💫"
        title="No matches yet"
        description="When you and someone both like each other, they'll show up here. In this demo, liking Jordan, Riley, Casey, or Taylor always matches."
        action={{ href: "/discover", label: "Back to Discover" }}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {inboxMatches.map((match) => (
        <MatchRow
          key={match.id}
          match={match}
          messages={messages}
          lastReadAt={matchLastReadAt[match.id]}
        />
      ))}
    </ul>
  );
}
