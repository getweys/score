import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/contact-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Contact Us - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "Contact SCORE Pvt Ltd — address, phone, emergency line, fax, email, and office hours at Zenith Plaza, Bahria Town Karachi.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-green text-secondary">
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <ContactPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
