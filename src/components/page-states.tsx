"use client";

type PageStateProps = {
  message: string;
};

export function PageLoading({ message }: PageStateProps) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="size-8 animate-pulse rounded-full bg-rose-500/30" />
      <p className="text-sm text-zinc-500">{message}</p>
    </div>
  );
}

type PageErrorProps = PageStateProps & {
  onRetry?: () => void;
};

export function PageError({ message, onRetry }: PageErrorProps) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center"
      role="alert"
    >
      <p className="text-2xl" aria-hidden>
        ⚠️
      </p>
      <p className="text-sm text-zinc-400">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
