import { InviteScreen } from "@/components/invite-screen";

export default function InvitePage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Invite friends</h2>
      <InviteScreen />
    </div>
  );
}
