import Link from "next/link";
import type { ReactNode } from "react";
import { buttonPrimaryClassName } from "@/components/ui/field-styles";

type EmptyStateProps = {
  emoji: string;
  title: string;
  description: string;
  action?: { href: string; label: string };
  children?: ReactNode;
};

export function EmptyState({
  emoji,
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-10 text-center">
      <p className="text-4xl" aria-hidden>
        {emoji}
      </p>
      <h2 className="mt-3 text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      {action ? (
        <Link
          href={action.href}
          className={`mt-5 inline-block ${buttonPrimaryClassName}`}
        >
          {action.label}
        </Link>
      ) : null}
      {children}
    </div>
  );
}
