"use client";

import { ServicesSectionHeader } from "@/components/sections/services-content";
import { ResponsibilitiesTimeline } from "@/components/sections/responsibilities-timeline";

export function ResponsibilitiesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ServicesSectionHeader align="left" />
        <ResponsibilitiesTimeline />
      </div>
    </section>
  );
}
