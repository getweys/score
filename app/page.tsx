import { ContactSection } from "@/components/sections/contact-section";
import { FinancialSection } from "@/components/sections/financial-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LaybySection } from "@/components/sections/layby-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ProjectSection } from "@/components/sections/project-section";
import { ResponsibilitiesSection } from "@/components/sections/responsibilities-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TeamSection } from "@/components/sections/team-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-secondary">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProjectSection />
        <ResponsibilitiesSection />
        <TeamSection />
        <MissionSection />
        <ContactSection />
        <FinancialSection />
        <LaybySection />
      </main>
      <SiteFooter />
    </div>
  );
}
