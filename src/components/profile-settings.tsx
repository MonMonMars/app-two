"use client";

import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import Link from "next/link";
import { useState } from "react";

export function ProfileSettings() {
  const { user, signOut, updateDisplayName } = useAuth();
  const { tier, likesUsedToday, dailyLikeLimit, boostsRemaining } = useApp();
  const [name, setName] = useState(user?.displayName ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) {
    return null;
  }

  const onSave = () => {
    updateDisplayName(name);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Account
        </p>
        <p className="mt-2 text-sm text-zinc-400">{user.email}</p>
        <label className="mt-4 block text-sm font-medium text-zinc-300">
          Display name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-rose-500/50"
        />
        <button
          type="button"
          onClick={onSave}
          className="mt-3 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
        {saved ? (
          <p className="mt-2 text-xs text-emerald-400">Saved locally.</p>
        ) : null}
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
        className="w-full rounded-full border border-zinc-700 py-3 text-sm font-semibold text-zinc-300"
      >
        Sign out
      </button>
    </div>
  );
}
