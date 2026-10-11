"use client";

import { getProfilePhotos } from "@/lib/profile-photos";
import type { Profile } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { t } from "@/i18n";

type PublicProfileViewProps = {
  profile: Profile;
};

export function PublicProfileView({ profile }: PublicProfileViewProps) {
  const photo = getProfilePhotos(profile)[0]!;

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-[#0b0b0f] px-4 py-8 text-zinc-100">
      <Link
        href="/"
        className="text-sm text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
      >
        ← {t().brand}
      </Link>
      <article className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-xl">
        <div className="relative aspect-[3/4] bg-zinc-800">
          <Image
            src={photo}
            alt={`${profile.name}, ${profile.age}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-white">
            {profile.name}, {profile.age}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">{profile.location}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {profile.bio}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
      <p className="mt-4 text-center text-xs text-zinc-500">
        Public preview (mock) — sign in to swipe on {profile.name}.
      </p>
      <Link href="/login" className={`mt-6 ${buttonPrimaryClassName}`}>
        {t().cta.signIn} on App Two
      </Link>
    </div>
  );
}
