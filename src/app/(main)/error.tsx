"use client";

type MainErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MainError({ reset }: MainErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-lg font-semibold text-white">Page error</h2>
      <p className="max-w-sm text-sm text-zinc-400">
        This screen failed to render. Retry or return to Discover.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
        >
          Retry
        </button>
        <a
          href="/discover"
          className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-200"
        >
          Discover
        </a>
      </div>
    </div>
  );
}
