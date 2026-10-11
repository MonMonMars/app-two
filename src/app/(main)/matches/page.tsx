import { MatchList } from "@/components/match-list";

export default function MatchesPage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Your matches</h2>
      <MatchList />
    </div>
  );
}
