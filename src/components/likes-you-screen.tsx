"use client";

import { EmptyState } from "@/components/empty-state";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { useApp } from "@/context/app-provider";
import { LIKED_YOU_PROFILE_IDS, profileById } from "@/lib/mock-data";
import { getProfilePhotos } from "@/lib/profile-photos";
import Image from "next/image";
import Link from "next/link";

export function LikesYouScreen() {
  const { tier } = useApp();
  const paid = tier === "premium" || tier === "premium_plus";
  const profiles = LIKED_YOU_PROFILE_IDS.map((id) => profileById(id)).filter(
    Boolean,
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        {paid
          ? "Premium unlock — see everyone who liked you (demo data)."
          : "Upgrade to see who liked you. Free tier shows blurred teasers."}
      </p>

      {!paid ? (
        <Link
          href="/premium"
          className={`text-center ${buttonPrimaryClassName}`}
        >
          Unlock with Premium
        </Link>
      ) : null}

      <ul className="grid grid-cols-2 gap-3">
        {profiles.map((profile) => {
          if (!profile) return null;
          const photo = getProfilePhotos(profile)[0]!;
          return (
            <li
              key={profile.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
            >
              <div className="relative aspect-[3/4] bg-zinc-800">
                <Image
                  src={photo}
                  alt=""
                  fill
                  className={`object-cover ${paid ? "" : "scale-105 blur-xl"}`}
                  loading="lazy"
                  unoptimized
                />
                {!paid ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-bold text-white">
                      Premium
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="p-3">
                <p
                  className={`font-semibold text-white ${paid ? "" : "blur-sm"}`}
                >
                  {paid ? `${profile.name}, ${profile.age}` : "Someone nearby"}
                </p>
                {paid ? (
                  <Link
                    href="/"
                    className="mt-1 inline-block text-xs font-semibold text-rose-400"
                  >
                    Swipe on Discover →
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {profiles.length === 0 ? (
        <EmptyState
          emoji="💗"
          title="No likes yet"
          description="When someone likes you in this demo, they'll appear here."
          action={{ href: "/", label: "Improve your profile" }}
        />
      ) : null}
    </div>
  );
}
