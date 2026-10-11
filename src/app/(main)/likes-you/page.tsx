import { LikesYouScreen } from "@/components/likes-you-screen";

export default function LikesYouPage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Likes you</h2>
      <LikesYouScreen />
    </div>
  );
}
