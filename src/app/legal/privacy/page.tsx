import { LegalDocument } from "@/components/legal-document";

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy (placeholder)">
      <p>
        App Two is a public-safe demo. We do not operate a production dating
        service in this repository. Any data you enter stays in your browser
        (localStorage) unless you configure optional Stripe test keys.
      </p>
      <p>
        Do not paste real secrets, production API keys, or private credentials
        from sibling or internal projects into this app. This codebase is
        intended for mock UX and QA only.
      </p>
      <p>
        Contact: privacy-demo@app-two.example (placeholder — not monitored).
      </p>
    </LegalDocument>
  );
}
