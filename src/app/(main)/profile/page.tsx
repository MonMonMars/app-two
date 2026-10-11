import { ProfileSettings } from "@/components/profile-settings";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Your profile</h2>
      <ProfileSettings />
    </div>
  );
}
