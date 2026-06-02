"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { AboutPillar } from "@/lib/site-content";
import {
  aboutEyebrow,
  aboutHeading,
  aboutHeroImage,
  aboutHeroSubtitle,
  aboutParagraphs,
  aboutPillars,
  aboutPillarsEyebrow,
  aboutPillarsHeading,
  aboutServicesCtaHref,
  aboutServicesCtaLabel,
} from "@/lib/site-content";
import { fadeUp, headerStagger, riseSoft, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const simpleCardClass =
  "flex h-full flex-col rounded-md border border-zinc-200/90 bg-white p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md sm:p-5 lg:p-6";

function AboutPillarIcon({ icon }: { icon: AboutPillar["icon"] }) {
  const className = "size-10 text-primary sm:size-11";
  if (icon === "objective") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M4 22V10l8-5 8 5v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5V2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "vision") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path
          d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14.5 5 22h14l-2.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AboutPillarCard({ pillar }: { pillar: AboutPillar }) {
  return (
    <motion.article variants={riseSoft} className={simpleCardClass}>
      <div className="mb-3 sm:mb-4">
        <AboutPillarIcon icon={pillar.icon} />
      </div>
      <h3 className="text-base font-semibold leading-snug text-secondary sm:text-lg">{pillar.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-[15px]">{pillar.body}</p>
    </motion.article>
  );
}

function AboutPageHero() {
  return (
    <section className="relative isolate min-h-[min(52vh,28rem)] overflow-hidden bg-secondary">
      <Image
        src={aboutHeroImage}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-secondary/92 via-secondary/75 to-secondary/55"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-secondary/30"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto flex min-h-[min(52vh,28rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
            <li className="font-medium text-white">{aboutEyebrow}</li>
          </ol>
        </motion.nav>
        <motion.p
          variants={fadeUp}
          className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm"
        >
          {aboutEyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {aboutHeading}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {aboutHeroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function AboutContentSection() {
  return (
    <>
      <AboutPageHero />

      <section className="relative bg-linear-to-b from-slate-50/80 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Who we are
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold text-secondary sm:text-3xl">
              A subsidiary of FWO, built for the M-9 corridor
            </motion.h2>
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-4xl space-y-6 sm:mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {aboutParagraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 48)}
                variants={fadeUp}
                className="text-center text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="flex justify-center pt-4">
              <Link
                href={aboutServicesCtaHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-[0_10px_32px_-8px_rgba(225,29,72,0.55)] transition hover:bg-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {aboutServicesCtaLabel}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-16 sm:mt-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="relative mb-8 text-center sm:mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                {aboutPillarsEyebrow}
              </p>
              <h2 className="mt-2 text-xl font-bold text-secondary sm:text-2xl">{aboutPillarsHeading}</h2>
            </motion.div>

            <motion.div
              className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {aboutPillars.map((pillar) => (
                <AboutPillarCard key={pillar.title} pillar={pillar} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
