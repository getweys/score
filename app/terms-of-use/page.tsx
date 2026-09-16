import type { Metadata } from "next";
import { LegalTextPage } from "@/components/sections/legal-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import {
  termsOfUseEyebrow,
  termsOfUseHeading,
  termsOfUseIntro,
  termsOfUseSections,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Terms & Conditions - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Terms and Conditions for accessing and using the SCORE Pvt Ltd website and services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <LegalTextPage
          eyebrow={termsOfUseEyebrow}
          heading={termsOfUseHeading}
          intro={termsOfUseIntro}
          sections={termsOfUseSections}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
