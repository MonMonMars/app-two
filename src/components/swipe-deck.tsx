"use client";

import { useApp } from "@/context/app-provider";
import { ProfileCard } from "@/components/profile-card";
import Link from "next/link";
import { useCallback, useRef, useState, type PointerEvent } from "react";

export function SwipeDeck() {
  const {
    deck,
    canLike,
    tier,
    boostsRemaining,
    superLikesRemaining,
    likesUsedToday,
    dailyLikeLimit,
    passProfile,
    likeProfile,
    activateBoost,
    rewindLastSwipe,
  } = useApp();
  const [offsetX, setOffsetX] = useState(0);
  const [matchFlash, setMatchFlash] = useState<string | null>(null);
  const dragStartX = useRef<number | null>(null);

  const top = deck[0];
  const next = deck[1];

  const flyOut = useCallback(
    (direction: "left" | "right", onDone: () => void) => {
      setOffsetX(direction === "left" ? -420 : 420);
      window.setTimeout(() => {
        setOffsetX(0);
        onDone();
      }, 220);
    },
    [],
  );

  const onPass = () => {
    if (!top) return;
    flyOut("left", () => passProfile(top.id));
  };

  const onLike = (superLike = false) => {
    if (!top) return;
    if (!canLike && !superLike) return;
    flyOut("right", () => {
      const match = likeProfile(top.id, { super: superLike });
      if (match) {
        setMatchFlash(match.profile.name);
        window.setTimeout(() => setMatchFlash(null), 2500);
      }
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) return;
    setOffsetX(e.clientX - dragStartX.current);
  };

  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    if (offsetX > 100) {
      onLike(false);
    } else if (offsetX < -100) {
      onPass();
    } else {
      setOffsetX(0);
    }
    dragStartX.current = null;
  };

  const paid = tier === "premium" || tier === "premium_plus";

  if (!top) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/50 p-8 text-center">
        <p className="text-4xl">🌙</p>
        <h2 className="text-xl font-semibold text-white">
          You&apos;re caught up
        </h2>
        <p className="text-sm text-zinc-400">
          More profiles tomorrow — or boost to jump the queue.
        </p>
        <Link
          href="/premium"
          className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Premium & Boosts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {matchFlash ? (
        <div className="animate-match-pop rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg">
          It&apos;s a match with {matchFlash}!{" "}
          <Link href="/matches" className="underline">
            Message them
          </Link>
        </div>
      ) : null}

      {!canLike && !paid ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Daily likes used ({likesUsedToday}/{dailyLikeLimit}).{" "}
          <Link href="/premium" className="font-semibold underline">
            Upgrade
          </Link>{" "}
          for unlimited swipes.
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-md flex-1 min-h-[420px]">
        {next ? (
          <div className="absolute inset-0 scale-[0.96] opacity-50">
            <ProfileCard profile={next} className="h-full" />
          </div>
        ) : null}
        <ProfileCard
          profile={top}
          className="relative h-full cursor-grab active:cursor-grabbing touch-none"
          style={{
            transform: `translateX(${offsetX}px) rotate(${offsetX / 22}deg)`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {offsetX > 40 ? (
          <span className="pointer-events-none absolute left-6 top-8 rotate-[-12deg] rounded-lg border-4 border-emerald-400 px-3 py-1 text-2xl font-black text-emerald-400">
            LIKE
          </span>
        ) : null}
        {offsetX < -40 ? (
          <span className="pointer-events-none absolute right-6 top-8 rotate-[12deg] rounded-lg border-4 border-zinc-400 px-3 py-1 text-2xl font-black text-zinc-400">
            NOPE
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-center gap-3 pb-2">
        <button
          type="button"
          onClick={onPass}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-900 text-2xl text-zinc-300 shadow-lg"
          aria-label="Pass"
        >
          ✕
        </button>
        {paid ? (
          <button
            type="button"
            onClick={() => rewindLastSwipe()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 text-lg text-violet-300"
            aria-label="Rewind"
          >
            ↩
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onLike(true)}
          disabled={superLikesRemaining <= 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-lg text-sky-300 disabled:opacity-30"
          aria-label="Super like"
        >
          ★
        </button>
        <button
          type="button"
          onClick={() => onLike(false)}
          disabled={!canLike}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 text-3xl text-white shadow-lg shadow-rose-500/30 disabled:opacity-40"
          aria-label="Like"
        >
          ♥
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Super likes: {superLikesRemaining}</span>
        {boostsRemaining > 0 ? (
          <button
            type="button"
            className="font-semibold text-rose-400"
            onClick={() => activateBoost()}
          >
            Activate boost ({boostsRemaining})
          </button>
        ) : (
          <Link href="/premium" className="font-semibold text-rose-400">
            Get a boost →
          </Link>
        )}
      </div>
    </div>
  );
}
