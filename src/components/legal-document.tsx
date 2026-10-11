import Link from "next/link";
import type { ReactNode } from "react";

type LegalDocumentProps = {
  title: string;
  children: ReactNode;
};

export function LegalDocument({ title, children }: LegalDocumentProps) {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-[#0b0b0f] px-4 py-8 text-zinc-100">
      <Link
        href="/"
        className="text-sm text-rose-400 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
      >
        ← App Two
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-white">{title}</h1>
      <div className="prose prose-invert mt-4 max-w-none space-y-4 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
      <p className="mt-8 text-xs text-zinc-600">
        Placeholder legal copy for demos only — not legal advice.
      </p>
    </div>
  );
}
