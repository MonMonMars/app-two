"use client";

import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";
import { t } from "@/i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

export function LandingPage() {
  const { hydrated, user } = useAuth();
  const { datingProfile, hydrated: profileHydrated } = useProfile();
  const router = useRouter();
  const copy = t().landing;
  const cta = t().cta;

  useEffect(() => {
    if (!hydrated || !user) {
      return;
    }
    if (!profileHydrated) {
      return;
    }
    router.replace(
      datingProfile?.onboardingComplete ? "/discover" : "/onboarding",
    );
  }, [hydrated, profileHydrated, user, datingProfile, router]);

  if (hydrated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-sm text-zinc-500">
        Opening App Two…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-zinc-100">
      <div className="mx-auto flex max-w-lg flex-col px-4 pb-16 pt-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400">
          {t().brand}
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-white">
          {copy.heroTitle}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          {copy.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className={buttonPrimaryClassName}>
            {cta.getStarted}
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-zinc-700 px-6 py-3 text-center text-sm font-semibold text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
          >
            {cta.signIn}
          </Link>
        </div>

        <ul className="mt-12 space-y-4">
          {copy.features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"
            >
              <h2 className="font-semibold text-white">{feature.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{feature.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-zinc-600">
          {copy.footerNote}
        </p>
        <p className="mt-4 text-center text-xs text-zinc-600">
          <Link href="/u/p1" className="text-rose-400/80 underline">
            Sample profile link
          </Link>
        </p>
      </div>
    </div>
  );
}
