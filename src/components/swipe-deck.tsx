"use client";

import { EmptyState } from "@/components/empty-state";
import { useApp } from "@/context/app-provider";
import { useProfile } from "@/context/profile-provider";
import { useToast } from "@/context/toast-provider";
import { ProfileCard } from "@/components/profile-card";
import { ProfileSafetyMenu } from "@/components/profile-safety-menu";
import { formatCountdown, useBoostCountdown } from "@/lib/use-boost-countdown";
import Link from "next/link";
import { useCallback, useRef, useState, type PointerEvent } from "react";

export function SwipeDeck() {
  const {
    deck,
    deckEmptyReason,
    canLike,
    tier,
    boostsRemaining,
    superLikesRemaining,
    boostActiveUntil,
    likesUsedToday,
    dailyLikeLimit,
    passProfile,
    likeProfile,
    activateBoost,
    rewindLastSwipe,
    hasLastSwipe,
  } = useApp();
  const { settings } = useProfile();
  const { pushToast } = useToast();
  const boostSeconds = useBoostCountdown(boostActiveUntil);
  const [offsetX, setOffsetX] = useState(0);
  const [rewindShake, setRewindShake] = useState(false);
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

  const notifyMatch = useCallback(
    (name: string) => {
      if (!settings.notifications.matches) {
        return;
      }
      pushToast({
        variant: "match",
        title: `It's a match with ${name}!`,
        body: "Send a message while the vibe is hot.",
        href: "/matches",
      });
    },
    [pushToast, settings.notifications.matches],
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
        notifyMatch(match.profile.name);
      }
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
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

  const onBoost = () => {
    const ok = activateBoost();
    if (ok) {
      pushToast({
        variant: "boost",
        title: "Boost activated",
        body: "You're prioritized in discovery for 30 minutes (mock).",
      });
    }
  };

  const paid = tier === "premium" || tier === "premium_plus";

  const onRewind = () => {
    const ok = rewindLastSwipe();
    if (ok) {
      pushToast({
        variant: "info",
        title: "Swipe undone",
        body: "Premium rewind restored your last card.",
      });
      return;
    }
    setRewindShake(true);
    window.setTimeout(() => setRewindShake(false), 450);
    if (!paid) {
      pushToast({
        variant: "info",
        title: "Rewind is Premium",
        body: "Upgrade to undo your last swipe.",
        href: "/premium",
      });
    }
  };

  if (!top) {
    if (deckEmptyReason === "blocked") {
      return (
        <EmptyState
          emoji="🚫"
          title="Blocked profiles hidden"
          description="Everyone left in the demo is blocked or filtered. Unblock someone in Settings to see them again."
          action={{ href: "/settings", label: "Manage block list" }}
        />
      );
    }
    if (deckEmptyReason === "filters") {
      return (
        <EmptyState
          emoji="🎯"
          title="No one fits your filters"
          description="Try widening your distance radius, age range, or clearing interest filters to see more demo profiles."
          action={{ href: "/discover", label: "Adjust filters above" }}
        />
      );
    }
    return (
      <EmptyState
        emoji="🌙"
        title="You're caught up for now"
        description="You've seen everyone in this demo deck. Check Matches or come back after resetting swipes in a future backend version."
        action={{ href: "/premium", label: "Get a boost" }}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {boostSeconds > 0 ? (
        <div
          className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-center text-sm text-amber-100"
          role="status"
        >
          Boost active ·{" "}
          <span className="font-mono font-bold">
            {formatCountdown(boostSeconds)}
          </span>{" "}
          remaining
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

      <div className="relative mx-auto min-h-[420px] w-full max-w-md flex-1">
        <div className="absolute right-2 top-2 z-30 rounded-xl bg-black/40 backdrop-blur-sm">
          <ProfileSafetyMenu
            profileId={top.id}
            profileName={top.name}
            anchorClassName="absolute right-0 top-10 z-40"
          />
        </div>
        {next ? (
          <div className="absolute inset-0 scale-[0.96] opacity-50">
            <ProfileCard profile={next} className="h-full" />
          </div>
        ) : null}
        <ProfileCard
          profile={top}
          className="relative h-full cursor-grab touch-none active:cursor-grabbing"
          style={{
            transform: `translateX(${offsetX}px) rotate(${offsetX / 22}deg)`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {offsetX > 40 ? (
          <span
            className="pointer-events-none absolute left-6 top-8 rotate-[-12deg] rounded-lg border-4 border-emerald-400 px-3 py-1 text-2xl font-black text-emerald-400"
            aria-hidden
          >
            LIKE
          </span>
        ) : null}
        {offsetX < -40 ? (
          <span
            className="pointer-events-none absolute right-6 top-8 rotate-[12deg] rounded-lg border-4 border-zinc-400 px-3 py-1 text-2xl font-black text-zinc-400"
            aria-hidden
          >
            NOPE
          </span>
        ) : null}
      </div>

      <div
        className="flex items-center justify-center gap-3 pb-2"
        role="group"
        aria-label="Swipe actions"
      >
        <button
          type="button"
          onClick={onPass}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-900 text-2xl text-zinc-300 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          aria-label="Pass on this profile"
        >
          <span aria-hidden>✕</span>
        </button>
        <button
          type="button"
          onClick={onRewind}
          disabled={!hasLastSwipe && paid}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
            paid
              ? "bg-violet-500/20 text-violet-300"
              : "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-600"
          } ${rewindShake ? "animate-rewind-shake" : ""}`}
          aria-label={
            paid ? "Rewind last swipe" : "Rewind last swipe (Premium)"
          }
        >
          <span aria-hidden>↩</span>
        </button>
        <button
          type="button"
          onClick={() => onLike(true)}
          disabled={superLikesRemaining <= 0}
          className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-sky-500/20 text-sky-300 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          aria-label={`Super Like. ${superLikesRemaining} remaining`}
        >
          <span className="text-lg leading-none" aria-hidden>
            ★
          </span>
          <span className="text-[10px] font-bold">{superLikesRemaining}</span>
        </button>
        <button
          type="button"
          onClick={() => onLike(false)}
          disabled={!canLike}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 text-3xl text-white shadow-lg shadow-rose-500/30 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          aria-label="Like this profile"
        >
          <span aria-hidden>♥</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span id="super-like-count">
          Super likes left: {superLikesRemaining}
        </span>
        {boostsRemaining > 0 && boostSeconds <= 0 ? (
          <button
            type="button"
            className="font-semibold text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            onClick={onBoost}
          >
            Activate boost ({boostsRemaining})
          </button>
        ) : boostsRemaining <= 0 && boostSeconds <= 0 ? (
          <Link
            href="/premium"
            className="font-semibold text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          >
            Get a boost →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
