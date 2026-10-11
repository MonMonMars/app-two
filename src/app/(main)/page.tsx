import { SwipeDeck } from "@/components/swipe-deck";

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-3 text-sm text-zinc-400">
        Swipe or tap actions. Demo matches when you like Jordan, Riley, Casey,
        or Taylor.
      </p>
      <SwipeDeck />
    </div>
  );
}
