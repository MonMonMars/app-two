"use client";

import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";
import Link from "next/link";
import { buttonSecondaryClassName } from "@/components/ui/field-styles";

export function ProfileSettings() {
  const { user, signOut } = useAuth();
  const { datingProfile } = useProfile();
  const { tier, likesUsedToday, dailyLikeLimit, boostsRemaining } = useApp();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Account
        </p>
        <p className="mt-2 text-sm text-zinc-400">{user.email}</p>
        <p className="mt-2 text-lg font-semibold text-white">
          {datingProfile?.name ?? user.displayName}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Link href="/profile/edit" className={buttonSecondaryClassName}>
            Edit dating profile
          </Link>
          <Link href="/settings" className={buttonSecondaryClassName}>
            Settings & legal
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Plan & usage (mock)
        </p>
        <dl className="mt-3 space-y-2 text-zinc-300">
          <div className="flex justify-between">
            <dt>Tier</dt>
            <dd className="font-medium text-white">{tier}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Likes today</dt>
            <dd>
              {likesUsedToday} / {tier === "free" ? dailyLikeLimit : "∞"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Boosts left</dt>
            <dd>{boostsRemaining}</dd>
          </div>
        </dl>
        <Link
          href="/premium"
          className="mt-4 inline-block text-sm font-semibold text-rose-400"
        >
          Manage subscription →
        </Link>
      </section>

      <button
        type="button"
        onClick={signOut}
        className="w-full rounded-full border border-zinc-700 py-3 text-sm font-semibold text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
      >
        Sign out
      </button>
    </div>
  );
}
