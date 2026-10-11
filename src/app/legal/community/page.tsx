import { LegalDocument } from "@/components/legal-document";

export default function CommunityPage() {
  return (
    <LegalDocument title="Community Guidelines (placeholder)">
      <p>
        Be kind in chat demos. Report and block tools are mock-only but model
        the safety flows we expect in production: no harassment, spam, or fake
        profiles.
      </p>
      <p>
        Do not use App Two to share illegal content or to impersonate others.
        Public profiles (`/u/[id]`) show static mock data only.
      </p>
      <p>
        Violations in a real launch would lead to removal — here, use Settings
        block list to reset your local experience.
      </p>
    </LegalDocument>
  );
}
