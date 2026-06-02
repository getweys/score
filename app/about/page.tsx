import type { Metadata } from "next";
import { AboutContentSection } from "@/components/sections/about-content-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "About Us - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Learn about SCORE Pvt Ltd — construction, operation and maintenance of the Karachi–Hyderabad Motorway (M-9) under PPP on BOT basis.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-secondary">
      <SiteHeader variant="solid" showTopBar={false} />
      <main className="flex-1">
        <AboutContentSection />
      </main>
      <SiteFooter />
    </div>
  );
}
