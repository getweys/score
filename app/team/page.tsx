import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TeamPageContent } from "@/components/sections/team-page-content";

export const metadata: Metadata = {
  title: "Our Team - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Meet the Board of Directors and Company Management leading SCORE Pvt Ltd on the M-9 Motorway.",
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <TeamPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
