"use client";

import { useProfile } from "@/context/profile-provider";
import Image from "next/image";
import Link from "next/link";

export function SelfPreviewCard() {
  const { datingProfile } = useProfile();

  if (!datingProfile) {
    return null;
  }

  const photo = datingProfile.photoUrls[0];
  if (!photo) {
    return null;
  }

  return (
    <Link
      href="/profile/edit"
      className="mb-4 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-gradient-to-r from-rose-500/10 to-transparent p-3 transition hover:border-rose-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-500/40">
        <Image src={photo} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
          Your card preview
        </p>
        <p className="truncate font-semibold text-white">
          {datingProfile.name}, {datingProfile.age}
        </p>
        <p className="truncate text-xs text-zinc-400">
          {datingProfile.bio || "Add a bio in profile edit"}
        </p>
      </div>
      <span className="text-sm text-rose-400">Edit</span>
    </Link>
  );
}
