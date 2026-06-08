import { CeoMessageSection } from "@/components/sections/ceo-message-section";

import { ContactSection } from "@/components/sections/contact-section";

import { FinancialSection } from "@/components/sections/financial-section";

import { HeroSection } from "@/components/sections/hero-section";

import { LaybySection } from "@/components/sections/layby-section";

import { MapShowcaseSection } from "@/components/sections/map-showcase-section";
import { MtagSection } from "@/components/sections/mtag-section";

import { ProjectSection } from "@/components/sections/project-section";

import { ResponsibilitiesSection } from "@/components/sections/responsibilities-section";

import { SiteFooter } from "@/components/sections/site-footer";

import { SiteHeader } from "@/components/sections/site-header";

import { TeamSection } from "@/components/sections/team-section";

import { WeighStationSection } from "@/components/sections/weigh-station-section";



export default function Home() {

  return (

    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">

      <SiteHeader />

      <main className="flex-1">

        <HeroSection />

        <MapShowcaseSection />

        <ProjectSection />

        <ResponsibilitiesSection />

        <MtagSection />

        <WeighStationSection />

        <TeamSection />

        <CeoMessageSection />

        <ContactSection />

        <FinancialSection />

        <LaybySection />

      </main>

      <SiteFooter />

    </div>

  );

}

