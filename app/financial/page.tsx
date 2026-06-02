import type { Metadata } from "next";
import { FinancialPageContent } from "@/components/sections/financial-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Financial Statements - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Download and preview audited financial statements and reports for SCORE Pvt Ltd.",
};

export default function FinancialPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <FinancialPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
