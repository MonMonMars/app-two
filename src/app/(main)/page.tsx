import { DiscoverFiltersPanel } from "@/components/discover-filters-panel";
import { SelfPreviewCard } from "@/components/self-preview-card";
import { SwipeDeck } from "@/components/swipe-deck";

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SelfPreviewCard />
      <DiscoverFiltersPanel />
      <SwipeDeck />
    </div>
  );
}
