"use client";

import type { Profile } from "@/types";
import Image from "next/image";
import type { CSSProperties, PointerEventHandler } from "react";

type ProfileCardProps = {
  profile: Profile;
  style?: CSSProperties;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLElement>;
  onPointerMove?: PointerEventHandler<HTMLElement>;
  onPointerUp?: PointerEventHandler<HTMLElement>;
  onPointerCancel?: PointerEventHandler<HTMLElement>;
};

export function ProfileCard({
  profile,
  style,
  className = "",
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: ProfileCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 transition-transform duration-200 ease-out ${className}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="relative aspect-[3/4] w-full h-full min-h-[420px]">
        <Image
          src={profile.photoUrl}
          alt={`${profile.name}, ${profile.age}`}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 480px"
          unoptimized
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            {profile.verified ? (
              <span
                className="rounded-full bg-sky-500/90 px-2 py-0.5 text-[10px] font-bold uppercase"
                title="Verified (mock)"
              >
                ✓
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-zinc-300">{profile.location}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-100">
            {profile.bio}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
