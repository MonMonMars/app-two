"use client";

import { PageLoading } from "@/components/page-states";
import { SwipeDeck } from "@/components/swipe-deck";
import { useApp } from "@/context/app-provider";
import { t } from "@/i18n";

export function DiscoverScreen() {
  const { hydrated } = useApp();

  if (!hydrated) {
    return <PageLoading message={t().loading.discover} />;
  }

  return <SwipeDeck />;
}
