import { SubscriptionManageScreen } from "@/components/subscription-manage-screen";

export default function PremiumManagePage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Manage subscription</h2>
      <SubscriptionManageScreen />
    </div>
  );
}
