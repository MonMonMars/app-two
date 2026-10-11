"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/app-provider";
import { useAuth } from "@/context/auth-provider";
import { useProfile } from "@/context/profile-provider";
import { t } from "@/i18n";

const NAV = [
  { href: "/discover", labelKey: "discover" as const, icon: "🔥" },
  { href: "/likes-you", labelKey: "likes" as const, icon: "💗" },
  { href: "/matches", labelKey: "matches" as const, icon: "💬" },
  { href: "/premium", labelKey: "premium" as const, icon: "✨" },
  { href: "/profile", labelKey: "profile" as const, icon: "👤" },
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
  const { tier, unreadMessageCount } = useApp();
  const { user } = useAuth();
  const { datingProfile } = useProfile();
  const hideNav =
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/profile/edit") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/premium/manage");
  const navLabels = t().nav;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-[#0b0b0f]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rose-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <header
        role="banner"
        className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0b0f]/90 px-4 py-3 backdrop-blur-md"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-rose-400">
              {t().brand}
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

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex flex-1 flex-col px-4 pb-24 pt-4 focus:outline-none"
      >
        {children}
      </main>

      {!hideNav ? (
        <nav
          aria-label="Primary"
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-[#0b0b0f]/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-lg items-stretch justify-between px-0.5 py-2 safe-area-pb">
            {NAV.map((item) => {
              const active =
                item.href === "/discover"
                  ? pathname === "/discover"
                  : pathname.startsWith(item.href);
              const badge =
                item.href === "/matches" && unreadMessageCount > 0
                  ? unreadMessageCount
                  : null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-0.5 py-2 text-[10px] font-medium transition ${
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
                  {navLabels[item.labelKey]}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
