import type { Metadata } from "next";
import { LegalTextPage } from "@/components/sections/legal-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import {
  privacyPolicyEyebrow,
  privacyPolicyHeading,
  privacyPolicyIntro,
  privacyPolicySections,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Privacy Policy for SCORE Pvt Ltd — how we collect, use, store, and protect visitor information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <LegalTextPage
          eyebrow={privacyPolicyEyebrow}
          heading={privacyPolicyHeading}
          intro={privacyPolicyIntro}
          sections={privacyPolicySections}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
