"use client";

import { ServicesAccordionList } from "@/components/sections/services-content";
import { PageHero } from "@/components/sections/page-hero";
import {
  responsibilitiesEyebrow,
  responsibilitiesHeading,
  responsibilitiesIntro,
} from "@/lib/site-content";

export function ServicesPageContent() {
  return (
    <>
      <PageHero
        breadcrumbLabel={responsibilitiesHeading}
        eyebrow={responsibilitiesEyebrow}
        title={responsibilitiesHeading}
        intro={responsibilitiesIntro}
      />
      <section className="bg-surface-green py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesAccordionList showTopBorder={false} />
        </div>
      </section>
    </>
  );
}
