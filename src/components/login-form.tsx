"use client";

import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

export function LoginForm() {
  const { user, requestMagicLink, completeMagicLink, pendingMagicEmail } =
    useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/discover");
    }
  }, [user, router]);

  const onSend = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await requestMagicLink(email);
    setSending(false);
    if (!result.ok) {
      setError(result.error ?? "Could not send link.");
    }
  };

  const onOpenLink = async () => {
    setOpening(true);
    setError(null);
    const result = await completeMagicLink();
    setOpening(false);
    if (!result.ok) {
      setError(result.error ?? "Sign-in failed.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
          App Two
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Mock magic-link auth — no email leaves this device.
        </p>
      </div>

      {!pendingMagicEmail ? (
        <form
          onSubmit={onSend}
          className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur"
        >
          <label className="block text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none ring-rose-500/0 transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/30"
          />
          <button
            type="submit"
            disabled={sending}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send magic link"}
          </button>
        </form>
      ) : (
        <div className="rounded-3xl border border-emerald-500/30 bg-zinc-900/90 p-6 text-center shadow-2xl">
          <p className="text-3xl">✉️</p>
          <h2 className="mt-3 text-lg font-semibold text-white">
            Check your inbox (mock)
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            We pretended to send a link to{" "}
            <span className="font-medium text-zinc-200">
              {pendingMagicEmail}
            </span>
            . Tap below to complete sign-in.
          </p>
          <button
            type="button"
            onClick={onOpenLink}
            disabled={opening}
            className="mt-5 w-full rounded-full bg-emerald-500 py-3 text-sm font-bold text-zinc-950 disabled:opacity-60"
          >
            {opening ? "Signing in…" : "Open magic link"}
          </button>
          <p className="mt-4 text-xs text-zinc-500">
            API stubs:{" "}
            <code className="text-zinc-400">POST /api/auth/magic-link</code> &{" "}
            <code className="text-zinc-400">/verify</code>
          </p>
        </div>
      )}

      {error ? (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
