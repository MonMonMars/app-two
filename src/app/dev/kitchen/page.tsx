import { DevKitchenScreen } from "@/components/dev-kitchen-screen";
import { Suspense } from "react";

export default function DevKitchenPage() {
  return (
    <Suspense fallback={<p className="p-8 text-zinc-500">Loading kitchen…</p>}>
      <DevKitchenScreen />
    </Suspense>
  );
}
