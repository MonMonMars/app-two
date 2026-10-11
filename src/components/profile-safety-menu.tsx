"use client";

import { ReportModal } from "@/components/report-modal";
import { useApp } from "@/context/app-provider";
import { useToast } from "@/context/toast-provider";
import type { ReportReason } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProfileSafetyMenuProps = {
  profileId: string;
  profileName: string;
  matchId?: string;
  /** Where the menu anchor sits in the layout */
  anchorClassName?: string;
};

export function ProfileSafetyMenu({
  profileId,
  profileName,
  matchId,
  anchorClassName = "absolute right-4 top-12 z-20",
}: ProfileSafetyMenuProps) {
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const { blockProfile, unmatch, reportProfile, passProfile } = useApp();
  const { pushToast } = useToast();
  const router = useRouter();

  const onReport = (reason: ReportReason) => {
    reportProfile(profileId, reason);
    pushToast({
      variant: "info",
      title: "Report submitted (mock)",
      body: `Thanks — ${reason.replace("_", " ")} was recorded locally only.`,
    });
  };

  const afterBlock = () => {
    blockProfile(profileId);
    if (matchId) {
      unmatch(matchId);
      router.push("/matches");
    } else {
      passProfile(profileId);
    }
    pushToast({
      variant: "info",
      title: `${profileName} blocked`,
      body: "They won't appear in Discover or Matches.",
    });
  };

  return (
    <>
      <button
        type="button"
        className="rounded-lg px-2 py-1 text-sm text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        aria-label={`Safety options for ${profileName}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        ⋮
      </button>
      {open ? (
        <div
          className={`${anchorClassName} min-w-[160px] rounded-xl border border-white/10 bg-zinc-950 py-1 shadow-xl`}
        >
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
            onClick={() => {
              setReportOpen(true);
              setOpen(false);
            }}
          >
            Report
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
            onClick={() => {
              afterBlock();
              setOpen(false);
            }}
          >
            Block
          </button>
          {matchId ? (
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-red-300 hover:bg-zinc-800"
              onClick={() => {
                unmatch(matchId);
                router.push("/matches");
                setOpen(false);
              }}
            >
              Unmatch
            </button>
          ) : null}
        </div>
      ) : null}
      <ReportModal
        profileName={profileName}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={onReport}
      />
    </>
  );
}
