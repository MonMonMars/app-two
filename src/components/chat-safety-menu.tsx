"use client";

import { ProfileSafetyMenu } from "@/components/profile-safety-menu";

type ChatSafetyMenuProps = {
  matchId: string;
  profileId: string;
  profileName: string;
};

export function ChatSafetyMenu({
  matchId,
  profileId,
  profileName,
}: ChatSafetyMenuProps) {
  return (
    <ProfileSafetyMenu
      matchId={matchId}
      profileId={profileId}
      profileName={profileName}
      anchorClassName="absolute right-4 top-12 z-20"
    />
  );
}
