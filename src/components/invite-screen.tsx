"use client";

import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { useApp } from "@/context/app-provider";
import { buildInviteUrl, DEMO_REFERRAL_CODE } from "@/lib/referral";
import Link from "next/link";
import { useMemo, useState } from "react";

export function InviteScreen() {
  const { referralSignupCount, recordReferralShare } = useApp();
  const [copied, setCopied] = useState(false);

  const inviteUrl = useMemo(() => {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
    return buildInviteUrl(base, DEMO_REFERRAL_CODE);
  }, []);

  const copyLink = async () => {
    recordReferralShare();
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        Mock referral loop — copy your link; counts are stored locally only.
      </p>
      <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
        <p className="text-xs text-zinc-500">Your invite link</p>
        <p className="mt-2 break-all text-sm text-zinc-200">{inviteUrl}</p>
        <button
          type="button"
          className={`mt-4 w-full ${buttonPrimaryClassName}`}
          onClick={() => void copyLink()}
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
      <p className="text-center text-sm text-zinc-400">
        Mock referrals sent:{" "}
        <strong className="text-white">{referralSignupCount}</strong>
      </p>
      <Link
        href="/settings"
        className="text-center text-sm text-rose-400 underline"
      >
        ← Settings
      </Link>
    </div>
  );
}
