"use client";

import { EmptyState } from "@/components/empty-state";
import { PageLoading } from "@/components/page-states";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { useApp } from "@/context/app-provider";
import { t } from "@/i18n";
import { LIKED_YOU_PROFILE_IDS, profileById } from "@/lib/mock-data";
import {
  canSeeLikesYouDetails,
  likesYouDisplayName,
} from "@/lib/likes-you-gating";
import { getProfilePhotos } from "@/lib/profile-photos";
import Image from "next/image";
import Link from "next/link";

export function LikesYouScreen() {
  const { tier, hydrated } = useApp();
  const paid = canSeeLikesYouDetails(tier);
  const profiles = LIKED_YOU_PROFILE_IDS.map((id) => profileById(id)).filter(
    Boolean,
  );

  if (!hydrated) {
    return <PageLoading message={t().loading.likesYou} />;
  }

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
          {t().cta.upgradePremium}
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
                  {likesYouDisplayName(tier, profile.name, profile.age)}
                </p>
                {paid ? (
                  <Link
                    href="/discover"
                    className="mt-1 inline-block text-xs font-semibold text-rose-400"
                  >
                    {t().cta.openDiscover} →
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
          action={{ href: "/discover", label: "Improve your profile" }}
        />
      ) : null}
    </div>
  );
}
