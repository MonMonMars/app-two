import { DiscoverFiltersPanel } from "@/components/discover-filters-panel";
import { SelfPreviewCard } from "@/components/self-preview-card";
import { StreakBanner } from "@/components/streak-banner";
import { SwipeDeck } from "@/components/swipe-deck";

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 flex-col">
      <StreakBanner />
      <SelfPreviewCard />
      <DiscoverFiltersPanel />
      <SwipeDeck />
    </div>
  );
}
