"use client";

import type { ReportReason } from "@/types";
import { buttonSecondaryClassName } from "@/components/ui/field-styles";

const REASONS: { value: ReportReason; label: string }[] = [
  { value: "fake_profile", label: "Fake profile" },
  { value: "harassment", label: "Harassment or hate" },
  { value: "spam", label: "Spam or scam" },
  { value: "underage", label: "Underage concern" },
  { value: "other", label: "Something else" },
];

type ReportModalProps = {
  profileName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: ReportReason) => void;
};

export function ReportModal({
  profileName,
  open,
  onClose,
  onSubmit,
}: ReportModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-5 shadow-2xl">
        <h2 id="report-title" className="text-lg font-bold text-white">
          Report {profileName}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Mock report — nothing is sent off-device.
        </p>
        <ul className="mt-4 space-y-2">
          {REASONS.map((r) => (
            <li key={r.value}>
              <button
                type="button"
                className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm text-zinc-200 hover:border-rose-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
                onClick={() => {
                  onSubmit(r.value);
                  onClose();
                }}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`mt-4 w-full ${buttonSecondaryClassName}`}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
