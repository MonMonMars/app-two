import Link from "next/link";

export default function PublicProfileNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0b0b0f] px-4 text-center">
      <p className="text-lg font-semibold text-white">Profile not found</p>
      <p className="text-sm text-zinc-500">
        This demo link may be outdated. Try a profile from Discover.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-rose-400 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
      >
        Back to App Two
      </Link>
    </div>
  );
}
