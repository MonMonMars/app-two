"use client";

import { LEGAL_LINKS } from "@/lib/constants";
import { clearAllUserData } from "@/lib/profile-storage";
import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonSecondaryClassName } from "@/components/ui/field-styles";

export function SettingsPanel() {
  const { user, signOut } = useAuth();
  const { settings, updateSettings, resetProfileForUser } = useProfile();
  const { resetAppState } = useApp();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteAccount = () => {
    if (!user) {
      return;
    }
    clearAllUserData(user.id);
    resetAppState();
    resetProfileForUser();
    signOut();
    router.replace("/login");
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
        <h3 className="text-sm font-semibold text-white">
          Notifications (mock)
        </h3>
        <ul className="mt-3 space-y-3 text-sm">
          {(
            [
              ["matches", "New matches"],
              ["messages", "Messages"],
              ["marketing", "Tips & offers"],
            ] as const
          ).map(([key, label]) => (
            <li key={key} className="flex items-center justify-between">
              <span className="text-zinc-300">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={settings.notifications[key]}
                className={`relative h-7 w-12 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                  settings.notifications[key] ? "bg-rose-500" : "bg-zinc-700"
                }`}
                onClick={() =>
                  updateSettings({
                    notifications: {
                      ...settings.notifications,
                      [key]: !settings.notifications[key],
                    },
                  })
                }
              >
                <span
                  className={`absolute top-0.5 size-6 rounded-full bg-white transition ${
                    settings.notifications[key] ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-sm">
        <h3 className="font-semibold text-white">Legal (placeholders)</h3>
        <ul className="mt-3 space-y-2">
          {Object.entries(LEGAL_LINKS).map(([key, url]) => (
            <li key={key}>
              <a
                href={url}
                className="text-rose-400 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-red-500/20 bg-red-950/20 p-4">
        <h3 className="text-sm font-semibold text-red-200">Delete account</h3>
        <p className="mt-1 text-xs text-red-200/80">
          Mock delete clears local App Two data on this device only.
        </p>
        {!confirmDelete ? (
          <button
            type="button"
            className={`mt-3 ${buttonSecondaryClassName} border-red-500/40 text-red-200`}
            onClick={() => setConfirmDelete(true)}
          >
            Delete my account
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-full bg-red-600 py-2 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              onClick={deleteAccount}
            >
              Confirm delete
            </button>
            <button
              type="button"
              className={buttonSecondaryClassName}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </section>

      <Link
        href="/profile"
        className="block text-center text-sm text-zinc-500 hover:text-zinc-300"
      >
        ← Back to profile
      </Link>
    </div>
  );
}
