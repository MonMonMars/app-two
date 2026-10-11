"use client";

import { track } from "@/lib/analytics";
import { addWaitlistEmail, isValidWaitlistEmail } from "@/lib/waitlist";
import { useState } from "react";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "success" | "duplicate" | "invalid"
  >("idle");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = addWaitlistEmail(email);
    if (result.ok) {
      track("waitlist_join", { emailDomain: email.split("@")[1] ?? "unknown" });
      setStatus("success");
      setEmail("");
      return;
    }
    if (result.reason === "duplicate") {
      setStatus("duplicate");
      return;
    }
    setStatus("invalid");
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-sm text-emerald-100"
        role="status"
      >
        <p className="font-semibold text-emerald-200">You&apos;re on the list!</p>
        <p className="mt-1 text-emerald-100/90">
          Mock waitlist saved in this browser only — no email was sent.
        </p>
        <button
          type="button"
          className="mt-3 text-xs font-semibold text-emerald-300 underline"
          onClick={() => setStatus("idle")}
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"
      aria-labelledby="waitlist-heading"
    >
      <h2 id="waitlist-heading" className="text-base font-semibold text-white">
        Join the waitlist (mock)
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        Get launch updates — stored locally for demos, no backend.
      </p>
      <label className="mt-3 block text-xs font-medium text-zinc-400">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") {
              setStatus("idle");
            }
          }}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        />
      </label>
      {status === "invalid" ? (
        <p className="mt-2 text-xs text-rose-300" role="alert">
          Enter a valid email address.
        </p>
      ) : null}
      {status === "duplicate" ? (
        <p className="mt-2 text-xs text-amber-300" role="status">
          That email is already on this device&apos;s waitlist.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!isValidWaitlistEmail(email)}
        className={`mt-4 w-full ${buttonPrimaryClassName} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Join waitlist
      </button>
    </form>
  );
}
