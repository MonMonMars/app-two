export const inputClassName =
  "mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus-visible:border-rose-500/60 focus-visible:ring-2 focus-visible:ring-rose-500/30";

export const labelClassName = "block text-sm font-medium text-zinc-300";

export const buttonPrimaryClassName =
  "rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:opacity-50";

export const buttonSecondaryClassName =
  "rounded-full border border-zinc-600 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400";

export const chipClassName = (active: boolean) =>
  `rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
    active
      ? "bg-rose-500/25 text-rose-200 ring-1 ring-rose-500/40"
      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
  }`;
