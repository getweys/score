import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Our Services - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "SCORE services on Motorway M-9 — tolling operations, routine repair, row management, and plantation & road cleaning.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-secondary">
      <SiteHeader variant="solid" showTopBar={false} />
      <main className="flex-1">
        <ServicesPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
