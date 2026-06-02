"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ContactDetailItem } from "@/lib/site-content";
import {
  contactDetails,
  contactEyebrow,
  contactHeading,
  contactIntro,
  contactMapEmbedUrl,
  contactPageHeroImage,
} from "@/lib/site-content";
import { fadeUp, headerStagger, staggerContainer, viewportOnce } from "@/lib/motion-variants";

function ContactDetailRow({ item }: { item: ContactDetailItem }) {
  return (
    <motion.div variants={fadeUp}>
      <p className="text-sm font-bold text-secondary sm:text-base">{item.label}</p>
      {item.href ? (
        <a
          href={item.href}
          className="mt-1 block text-sm leading-relaxed text-slate-600 transition-colors hover:text-primary sm:text-[15px]"
        >
          {item.value}
        </a>
      ) : (
        <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{item.value}</p>
      )}
    </motion.div>
  );
}

function ContactPageHero() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <Image src={contactPageHeroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
      <motion.div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/75 to-secondary/60" aria-hidden />
      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/40">
              /
            </li>
            <li className="font-medium text-white">{contactHeading}</li>
          </ol>
        </motion.nav>
        <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
          {contactEyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {contactHeading}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          {contactIntro}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function ContactPageContent() {
  return (
    <>
      <ContactPageHero />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="space-y-6 sm:space-y-7" variants={staggerContainer}>
              {contactDetails.map((item) => (
                <ContactDetailRow key={item.label} item={item} />
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="min-h-72 lg:min-h-112">
              <div className="overflow-hidden rounded-md border border-zinc-200/90 bg-white shadow-sm">
                <iframe
                  title="SCORE office location on Google Maps"
                  src={contactMapEmbedUrl}
                  className="h-72 w-full border-0 sm:h-80 lg:h-112"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
