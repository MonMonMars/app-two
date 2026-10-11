import { SettingsPanel } from "@/components/settings-panel";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Settings</h2>
      <SettingsPanel />
    </div>
  );
}
