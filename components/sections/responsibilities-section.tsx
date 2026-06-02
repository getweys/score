"use client";

import { ServicesAccordionList, ServicesSectionHeader } from "@/components/sections/services-content";

export function ResponsibilitiesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServicesSectionHeader align="left" />
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <ServicesAccordionList />
        </div>
      </div>
    </section>
  );
}
