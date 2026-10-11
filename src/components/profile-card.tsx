"use client";

import { VerificationBadge } from "@/components/verification-badge";
import { getProfilePhotos } from "@/lib/profile-photos";
import { showPhotoVerifiedOnProfile } from "@/lib/verification-badge";
import type { Profile } from "@/types";
import Image from "next/image";
import {
  useCallback,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEventHandler,
} from "react";

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
  const photos = getProfilePhotos(profile);
  const [photoIndex, setPhotoIndex] = useState(0);
  const activePhoto = photos[photoIndex] ?? photos[0]!;

  const goPhoto = useCallback(
    (delta: number) => {
      setPhotoIndex((i) => {
        const next = i + delta;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    [photos.length],
  );

  const onPhotoTap = (e: MouseEvent, delta: number) => {
    e.stopPropagation();
    goPhoto(delta);
  };

  return (
    <article
      className={`relative overflow-hidden rounded-3xl bg-zinc-800 shadow-2xl ring-1 ring-white/10 transition-transform duration-200 ease-out ${className}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="relative aspect-[3/4] w-full min-h-[420px] bg-zinc-800">
        <Image
          key={activePhoto}
          src={activePhoto}
          alt={`${profile.name}, ${profile.age}`}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 480px"
          loading="lazy"
          unoptimized
          draggable={false}
        />
        {photos.length > 1 ? (
          <>
            <div
              className="absolute left-0 top-0 z-10 flex h-[55%] w-1/3"
              data-photo-zone="true"
              onClick={(e) => onPhotoTap(e, -1)}
              aria-label="Previous photo"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goPhoto(-1);
              }}
            />
            <div
              className="absolute right-0 top-0 z-10 flex h-[55%] w-1/3"
              data-photo-zone="true"
              onClick={(e) => onPhotoTap(e, 1)}
              aria-label="Next photo"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goPhoto(1);
              }}
            />
            <div
              className="absolute left-0 right-0 top-3 z-20 flex justify-center gap-1.5 px-4"
              aria-hidden
            >
              {photos.map((_, i) => (
                <span
                  key={`dot-${profile.id}-${i}`}
                  className={`h-1.5 flex-1 max-w-8 rounded-full transition ${
                    i === photoIndex ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            {showPhotoVerifiedOnProfile(profile) ? (
              <VerificationBadge compact />
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
