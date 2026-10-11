"use client";

import { ProfileFormFields } from "@/components/profile-form-fields";
import {
  buttonPrimaryClassName,
  buttonSecondaryClassName,
} from "@/components/ui/field-styles";
import { useProfile } from "@/context/profile-provider";
import { defaultUserDatingProfile } from "@/lib/profile-storage";
import type { UserDatingProfile } from "@/types";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const STEPS = [
  { id: "basics", title: "Basics", subtitle: "Name & age" },
  { id: "photos", title: "Photos", subtitle: "Show your vibe" },
  { id: "story", title: "Story", subtitle: "Bio & interests" },
  { id: "prefs", title: "Preferences", subtitle: "Who you want to meet" },
] as const;

export function OnboardingWizard() {
  const { user } = useAuth();
  const { datingProfile, completeOnboarding } = useProfile();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<UserDatingProfile>(
    () => datingProfile ?? defaultUserDatingProfile(user?.displayName ?? "You"),
  );

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step],
  );

  const patch = (p: Partial<UserDatingProfile>) => {
    setDraft((d) => ({ ...d, ...p }));
  };

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    if (!draft.name.trim() || draft.photoUrls.length === 0) {
      return;
    }
    completeOnboarding({
      ...draft,
      bio: draft.bio.trim() || "Hey — I'm new on App Two.",
    });
    router.replace("/");
  };

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
        App Two · Setup
      </p>
      <h1 className="mt-2 text-center text-2xl font-bold text-white">
        {STEPS[step]?.title}
      </h1>
      <p className="text-center text-sm text-zinc-400">
        {STEPS[step]?.subtitle} · Step {step + 1} of {STEPS.length}
      </p>
      <div
        className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-fuchsia-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900/80 p-5">
        {step === 0 ? (
          <ProfileFormFields value={draft} onChange={patch} section="basics" />
        ) : null}
        {step === 1 ? (
          <ProfileFormFields value={draft} onChange={patch} section="photos" />
        ) : null}
        {step === 2 ? (
          <ProfileFormFields value={draft} onChange={patch} section="story" />
        ) : null}
        {step === 3 ? (
          <ProfileFormFields value={draft} onChange={patch} section="prefs" />
        ) : null}
      </div>

      <div className="mt-6 flex gap-3">
        {step > 0 ? (
          <button
            type="button"
            className={buttonSecondaryClassName}
            onClick={back}
          >
            Back
          </button>
        ) : (
          <span className="flex-1" />
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            className={`flex-1 ${buttonPrimaryClassName}`}
            onClick={next}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            className={`flex-1 ${buttonPrimaryClassName}`}
            onClick={finish}
            disabled={!draft.name.trim() || draft.photoUrls.length === 0}
          >
            Start swiping
          </button>
        )}
      </div>
    </div>
  );
}
