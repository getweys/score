"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServicesCardsGrid } from "@/components/sections/services-content";
import {
  responsibilitiesEyebrow,
  responsibilitiesHeading,
  responsibilitiesIntro,
  servicesPageHeroImage,
} from "@/lib/site-content";
import { fadeUp, headerStagger } from "@/lib/motion-variants";

function ServicesPageHero() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <Image src={servicesPageHeroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
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
            <li className="font-medium text-white">{responsibilitiesHeading}</li>
          </ol>
        </motion.nav>
        <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
          {responsibilitiesEyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {responsibilitiesHeading}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          {responsibilitiesIntro}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function ServicesPageContent() {
  return (
    <>
      <ServicesPageHero />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesCardsGrid />
        </div>
      </section>
    </>
  );
}
