"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ResponsibilityCard as ResponsibilityCardData } from "@/lib/site-content";
import {
  responsibilityCards,
  responsibilitiesEyebrow,
  responsibilitiesHeading,
  responsibilitiesIntro,
} from "@/lib/site-content";
import { fadeUp, headerStagger, riseSoft, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export const serviceCardClass =
  "group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,background-color] duration-300 hover:border-zinc-300 hover:bg-slate-50/50 sm:p-6";

export function ServiceCardInner({ card }: { card: ResponsibilityCardData }) {
  const serviceIndex = card.number.padStart(2, "0");

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div
          className="relative flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15 sm:size-14"
          aria-hidden
        >
          <div className="relative size-8 sm:size-9">
            <Image src={card.iconSrc} alt="" fill className="object-contain" sizes="72px" />
          </div>
        </div>
        <span className="text-[0.65rem] font-bold tabular-nums tracking-[0.14em] text-slate-400">
          {serviceIndex}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-secondary sm:mt-5 sm:text-lg">{card.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-[15px]">{card.body}</p>
    </>
  );
}

export function ServiceCard({ card }: { card: ResponsibilityCardData }) {
  return (
    <motion.article className={serviceCardClass} variants={riseSoft}>
      <ServiceCardInner card={card} />
    </motion.article>
  );
}

export function ServicesSectionHeader() {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      variants={headerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.p
        className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
        variants={fadeUp}
      >
        {responsibilitiesEyebrow}
      </motion.p>
      <motion.h2
        className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:mt-4 sm:text-3xl lg:text-[2rem] xl:text-4xl"
        variants={fadeUp}
      >
        {responsibilitiesHeading}
      </motion.h2>
      <motion.p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg" variants={fadeUp}>
        {responsibilitiesIntro}
      </motion.p>
    </motion.div>
  );
}

interface ServicesCardsGridProps {
  className?: string;
}

export function ServicesCardsGrid({ className = "" }: ServicesCardsGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4 ${className}`.trim()}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {responsibilityCards.map((card) => (
        <ServiceCard key={card.title} card={card} />
      ))}
    </motion.div>
  );
}
