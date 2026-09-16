"use client";

import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/contact-section";
import { contactMapEmbedUrl } from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function ContactPageContent() {
  return (
    <>
      <ContactSection />

      <section className="border-t border-brand-green/15 bg-surface-green pb-10 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="overflow-hidden rounded-xl border border-brand-green/30 bg-brand-green/9 shadow-[0_8px_28px_-14px_rgba(74,93,66,0.3)] ring-1 ring-secondary/6 sm:rounded-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <iframe
              title="SCORE office location on Google Maps"
              src={contactMapEmbedUrl}
              className="h-64 w-full border-0 sm:h-96 lg:h-[32rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
