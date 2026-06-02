"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AboutPillar } from "@/lib/site-content";
import { PageHero } from "@/components/sections/page-hero";
import {
  aboutEyebrow,
  aboutHeading,
  aboutHeroSubtitle,
  aboutParagraphs,
  aboutPillars,
  aboutPillarsEyebrow,
  aboutPillarsHeading,
  aboutServicesCtaHref,
  aboutServicesCtaLabel,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, listRowReveal, staggerContainer, viewportOnce, viewportRow } from "@/lib/motion-variants";

const pillarHoverEase = "ease-[cubic-bezier(0.4,0,0.2,1)]";
const pillarHoverDuration = "duration-500";

function AboutPillarIcon({ icon, className }: { icon: AboutPillar["icon"]; className: string }) {
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

function AboutPillarRow({ pillar, index }: { pillar: AboutPillar; index: number }) {
  const pillarIndex = String(index + 1).padStart(2, "0");
  const iconClass = `size-9 text-primary transition-colors ${pillarHoverDuration} ${pillarHoverEase} group-hover:text-on-green-dark group-focus-within:text-on-green-dark sm:size-10`;

  return (
    <article
      className={`group grid cursor-default grid-cols-1 gap-4 px-4 py-7 transition-colors max-lg:active:bg-brand-green-dark sm:px-5 sm:py-8 ${pillarHoverDuration} ${pillarHoverEase} lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-8 lg:px-8 lg:py-12 lg:hover:bg-brand-green-dark lg:focus-within:bg-brand-green-dark`}
      tabIndex={0}
      aria-label={pillar.title}
    >
      <div className="flex items-start justify-between gap-3 lg:contents">
        <span
          className={`pt-0.5 text-sm font-medium tabular-nums text-secondary/60 transition-colors sm:text-base ${pillarHoverDuration} ${pillarHoverEase} lg:pt-1 lg:group-hover:text-on-green-dark lg:group-focus-within:text-on-green-dark`}
        >
          ({pillarIndex})
        </span>
        <div className="flex shrink-0 items-start lg:hidden" aria-hidden>
          <AboutPillarIcon icon={pillar.icon} className={iconClass} />
        </div>
      </div>

      <div className="min-w-0">
        <h3
          className={`text-lg font-medium leading-snug text-secondary transition-colors sm:text-xl lg:text-[1.75rem] lg:leading-tight ${pillarHoverDuration} ${pillarHoverEase} lg:group-hover:text-on-green-dark lg:group-focus-within:text-on-green-dark`}
        >
          {pillar.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed text-slate-600 transition-colors sm:mt-4 sm:text-[15px] lg:mt-5 ${pillarHoverDuration} ${pillarHoverEase} lg:group-hover:text-on-green-dark/90 lg:group-focus-within:text-on-green-dark/90`}
        >
          {pillar.body}
        </p>
      </div>

      <div className="hidden shrink-0 items-start pt-1 lg:flex" aria-hidden>
        <AboutPillarIcon icon={pillar.icon} className={iconClass} />
      </div>
    </article>
  );
}

export function AboutContentSection() {
  return (
    <>
      <PageHero
        breadcrumbLabel={aboutEyebrow}
        eyebrow={aboutEyebrow}
        title={aboutHeading}
        intro={aboutHeroSubtitle}
      />

      <section className="border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24">
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
            <motion.h2
              variants={fadeUpBlur}
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl"
            >
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
                className="inline-flex min-h-11 w-full max-w-xs items-center justify-center border-2 border-primary px-8 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:max-w-none"
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
            <motion.div className="relative mb-8 max-w-2xl sm:mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                {aboutPillarsEyebrow}
              </p>
              <motion.h2
                variants={fadeUpBlur}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl"
              >
                {aboutPillarsHeading}
              </motion.h2>
            </motion.div>

            <ul className="border-t border-brand-green/25" role="list">
              {aboutPillars.map((pillar, index) => (
                <motion.li
                  key={pillar.title}
                  className="border-b border-brand-green/25 last:border-b-0"
                  variants={listRowReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportRow}
                >
                  <AboutPillarRow pillar={pillar} index={index} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
