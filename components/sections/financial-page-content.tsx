"use client";

import { FinancialReportsContent } from "@/components/sections/financial-reports-content";
import { PageHero } from "@/components/sections/page-hero";
import { financialEyebrow, financialHeading, financialIntro } from "@/lib/site-content";

export function FinancialPageContent() {
  return (
    <>
      <PageHero
        breadcrumbLabel={financialHeading}
        eyebrow={financialEyebrow}
        title={financialHeading}
        intro={financialIntro}
      />
      <section className="border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FinancialReportsContent showViewMore={false} />
        </div>
      </section>
    </>
  );
}
