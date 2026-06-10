"use client";

import { motion } from "framer-motion";
import type { ContactDetailItem } from "@/lib/site-content";
import { PageHero } from "@/components/sections/page-hero";
import {
  contactDetails,
  contactEyebrow,
  contactHeading,
  contactIntro,
  contactMapEmbedUrl,
} from "@/lib/site-content";
import { listRowReveal, slideInRight, viewportOnce, viewportRow } from "@/lib/motion-variants";

function ContactDetailRow({ item }: { item: ContactDetailItem }) {
  return (
    <div className="border-b border-brand-green/25 py-5 last:border-b-0 sm:py-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
      {item.href ? (
        <a
          href={item.href}
          className="mt-2 block text-sm font-medium leading-snug text-secondary transition-colors hover:text-primary sm:text-base sm:text-lg"
        >
          {item.value}
        </a>
      ) : (
        <p className="mt-2 text-sm font-medium leading-snug text-secondary sm:text-base sm:text-lg">{item.value}</p>
      )}
    </div>
  );
}

export function ContactPageContent() {
  return (
    <>
      <PageHero breadcrumbLabel={contactHeading} eyebrow={contactEyebrow} title={contactHeading} intro={contactIntro} />
      <section className="border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
            <ul className="list-none border-t border-brand-green/25" role="list">
              {contactDetails.map((item) => (
                <motion.li
                  key={item.label}
                  variants={listRowReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportRow}
                >
                  <ContactDetailRow item={item} />
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="min-h-72 lg:min-h-112"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="overflow-hidden rounded-lg border border-brand-green/30 bg-brand-green/9 shadow-[0_8px_28px_-14px_rgba(74,93,66,0.3)] ring-1 ring-secondary/6">
                <iframe
                  title="SCORE office location on Google Maps"
                  src={contactMapEmbedUrl}
                  className="h-56 w-full border-0 sm:h-80 lg:h-112"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
