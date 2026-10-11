type VerificationBadgeProps = {
  compact?: boolean;
};

export function VerificationBadge({ compact = false }: VerificationBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-sky-500/90 font-bold uppercase text-white ${
        compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]"
      }`}
      title="Photo verified (mock)"
    >
      <span aria-hidden>✓</span>
      {compact ? null : <span>Photo verified</span>}
    </span>
  );
}
