import { Paywall } from "@/components/paywall";

export default function PremiumPage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Premium & boosts</h2>
      <Paywall />
    </div>
  );
}
