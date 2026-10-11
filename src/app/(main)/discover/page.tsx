import { DiscoverCoachMarks } from "@/components/discover-coach-marks";
import { DiscoverFiltersPanel } from "@/components/discover-filters-panel";
import { DiscoverScreen } from "@/components/discover-screen";
import { SelfPreviewCard } from "@/components/self-preview-card";
import { StreakBanner } from "@/components/streak-banner";

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 flex-col">
      <StreakBanner />
      <DiscoverCoachMarks />
      <SelfPreviewCard />
      <DiscoverFiltersPanel />
      <DiscoverScreen />
    </div>
  );
}
