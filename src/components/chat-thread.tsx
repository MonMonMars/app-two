"use client";

import { ChatSafetyMenu } from "@/components/chat-safety-menu";
import { useApp } from "@/context/app-provider";
import { formatRelativeTime } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

type ChatThreadProps = {
  matchId: string;
};

export function ChatThread({ matchId }: ChatThreadProps) {
  const { matches, messages, sendMessage, sendImageMessage, typingMatchId } =
    useApp();
  const [draft, setDraft] = useState("");

  const match = matches.find((m) => m.id === matchId);
  const thread = useMemo(
    () =>
      messages
        .filter((m) => m.matchId === matchId)
        .sort(
          (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
        ),
    [messages, matchId],
  );

  if (!match) {
    return (
      <div className="rounded-2xl bg-zinc-900 p-6 text-center">
        <p className="text-sm text-zinc-400">Match not found.</p>
        <Link href="/matches" className="mt-3 inline-block text-rose-400">
          ← Matches
        </Link>
      </div>
    );
  }

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(matchId, draft);
    setDraft("");
  };

  const typing = typingMatchId === matchId;

  return (
    <div className="relative flex min-h-[70vh] flex-col rounded-2xl border border-white/5 bg-zinc-900/90">
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <Link
          href="/matches"
          className="text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        >
          ←
        </Link>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">{match.profile.name}</p>
          <p className="text-xs text-zinc-500">
            Mock chat · read receipts demo
          </p>
        </div>
        <ChatSafetyMenu
          matchId={matchId}
          profileId={match.profile.id}
          profileName={match.profile.name}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {thread.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">
            You matched with {match.profile.name}. Break the ice!
          </p>
        ) : (
          thread.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-0.5">
              <div
                className={`max-w-[85%] overflow-hidden rounded-2xl text-sm ${
                  msg.sender === "me"
                    ? "ml-auto bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white"
                    : "bg-zinc-800 text-zinc-100"
                }`}
              >
                {msg.kind === "image" && msg.imageUrl ? (
                  <div className="relative aspect-[4/3] w-48">
                    <Image
                      src={msg.imageUrl}
                      alt="Shared photo"
                      fill
                      className="object-cover"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                ) : (
                  <p className="px-3 py-2">{msg.body}</p>
                )}
              </div>
              <span
                className={`text-[10px] text-zinc-600 ${
                  msg.sender === "me" ? "ml-auto pr-1 text-right" : "pl-1"
                }`}
              >
                {formatRelativeTime(msg.sentAt)}
                {msg.sender === "me" && msg.readAt ? (
                  <span className="ml-1 text-sky-400">· Read</span>
                ) : null}
              </span>
            </div>
          ))
        )}
        {typing ? (
          <div
            className="max-w-[40%] rounded-2xl bg-zinc-800 px-3 py-2 text-sm text-zinc-400"
            aria-live="polite"
          >
            {match.profile.name} is typing
            <span className="animate-pulse">…</span>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={onSend}
        className="flex gap-2 border-t border-white/5 p-3"
      >
        <button
          type="button"
          onClick={() => sendImageMessage(matchId)}
          className="rounded-full border border-zinc-700 px-3 py-2 text-sm text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
          aria-label="Send photo stub"
          title="Image message (mock)"
        >
          📷
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white outline-none focus-visible:border-rose-500/50 focus-visible:ring-2 focus-visible:ring-rose-500/30"
        />
        <button
          type="submit"
          className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          Send
        </button>
      </form>
    </div>
  );
}
