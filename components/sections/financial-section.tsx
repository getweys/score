"use client";

import { FinancialReportsContent } from "@/components/sections/financial-reports-content";

export function FinancialSection() {
  return (
    <section
      id="financial"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FinancialReportsContent />
      </div>
    </section>
  );
}
