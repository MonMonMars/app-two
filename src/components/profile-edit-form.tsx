"use client";

import { ProfileFormFields } from "@/components/profile-form-fields";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";
import { useProfile } from "@/context/profile-provider";
import Link from "next/link";
import { useState } from "react";

export function ProfileEditForm() {
  const { datingProfile, updateDatingProfile } = useProfile();
  const [saved, setSaved] = useState(false);

  if (!datingProfile) {
    return null;
  }

  const onSave = () => {
    updateDatingProfile(datingProfile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <ProfileFormFields
        value={datingProfile}
        onChange={(patch) => updateDatingProfile(patch)}
        showPreferences
      />
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          className={buttonPrimaryClassName}
          onClick={onSave}
        >
          Save profile
        </button>
        {saved ? (
          <p className="text-center text-xs text-emerald-400">
            Saved — Discover preview updated.
          </p>
        ) : null}
        <Link href="/profile" className="text-center text-sm text-zinc-500">
          Cancel
        </Link>
      </div>
    </div>
  );
}
