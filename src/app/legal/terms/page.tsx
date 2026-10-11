import { LegalDocument } from "@/components/legal-document";

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service (placeholder)">
      <p>
        By using the App Two demo you agree this is mock software with no
        warranty. Matches, messages, and purchases are simulated unless you
        wire real Stripe test mode yourself.
      </p>
      <p>
        You must be 18+ in a real product; this demo does not verify age beyond
        onboarding fields stored locally.
      </p>
      <p>
        App Two branding and copy in this repo are for demonstration — not a
        binding contract.
      </p>
    </LegalDocument>
  );
}
