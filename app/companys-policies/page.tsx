import type { Metadata } from "next";
import { LegalDocumentList } from "@/components/sections/legal-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import {
  companyPoliciesEyebrow,
  companyPoliciesHeading,
  companyPoliciesIntro,
  companyPolicyRows,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Company’s Policies - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Download SCORE Anti Corruption, Conflict of Interest, and Code of Conduct policies.",
};

export default function CompanyPoliciesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <LegalDocumentList
          eyebrow={companyPoliciesEyebrow}
          heading={companyPoliciesHeading}
          intro={companyPoliciesIntro}
          rows={companyPolicyRows}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
