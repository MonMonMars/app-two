import { ProfileEditForm } from "@/components/profile-edit-form";

export default function ProfileEditPage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Edit profile</h2>
      <ProfileEditForm />
    </div>
  );
}
