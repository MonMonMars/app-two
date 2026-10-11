"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";

const NAV = [
  { href: "/", label: "Discover", icon: "🔥" },
  { href: "/matches", label: "Matches", icon: "💬" },
  { href: "/premium", label: "Premium", icon: "✨" },
  { href: "/profile", label: "Profile", icon: "👤" },
] as const;

function tierLabel(tier: string): string {
  switch (tier) {
    case "premium_plus":
      return "Premium+";
    case "premium":
      return "Premium";
    default:
      return "Free";
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { tier, matches } = useApp();
  const { user } = useAuth();
  const { datingProfile } = useProfile();
  const hideNav =
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/profile/edit") ||
    pathname.startsWith("/settings");

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-[#0b0b0f]">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0b0f]/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-rose-400">
              App Two
            </p>
            <h1 className="truncate text-lg font-bold text-white">
              Hi, {datingProfile?.name ?? user?.displayName ?? "there"}
            </h1>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              tier === "free"
                ? "bg-zinc-800 text-zinc-300"
                : "bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-200 ring-1 ring-amber-500/30"
            }`}
          >
            {tierLabel(tier)}
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 pb-24 pt-4">{children}</main>

      {!hideNav ? (
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-[#0b0b0f]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-2 safe-area-pb">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const badge =
                item.href === "/matches" && matches.length > 0
                  ? matches.length
                  : null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[11px] font-medium transition ${
                    active
                      ? "bg-rose-500/15 text-rose-300"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span className="relative text-lg leading-none">
                    {item.icon}
                    {badge !== null ? (
                      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    ) : null}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
