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

export function ServicesSectionHeader({ align = "center" }: { align?: "center" | "left" }) {
  const alignClass = align === "left" ? "mx-0 max-w-2xl text-left" : "mx-auto max-w-3xl text-center";

  return (
    <motion.div
      className={alignClass}
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
      <motion.p className="mt-5 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg" variants={fadeUp}>
        {responsibilitiesIntro}
      </motion.p>
    </motion.div>
  );
}

const serviceHoverEase = "ease-[cubic-bezier(0.4,0,0.2,1)]";
const serviceHoverDuration = "duration-500";

function ServiceRowArrow() {
  return (
    <svg
      className={`size-5 shrink-0 text-secondary/70 transition-colors ${serviceHoverDuration} ${serviceHoverEase} group-hover:text-on-green-dark group-focus-within:text-on-green-dark sm:size-6`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceAccordionRow({ card }: { card: ResponsibilityCardData }) {
  const serviceIndex = card.number.padStart(2, "0");

  return (
    <div
      className={`group grid cursor-default grid-cols-[auto_1fr_auto] items-start gap-5 px-3 py-9 transition-colors ${serviceHoverDuration} ${serviceHoverEase} hover:bg-brand-green-dark focus-within:bg-brand-green-dark sm:gap-8 sm:px-6 sm:py-11 lg:px-8 lg:py-12`}
      tabIndex={0}
      role="group"
      aria-label={card.title}
    >
      <span
        className={`pt-1 text-sm font-medium tabular-nums text-secondary/60 transition-colors ${serviceHoverDuration} ${serviceHoverEase} group-hover:text-on-green-dark group-focus-within:text-on-green-dark sm:text-base`}
      >
        ({serviceIndex})
      </span>

      <div className="min-w-0">
        <h3
          className={`text-xl font-medium leading-snug text-secondary transition-colors ${serviceHoverDuration} ${serviceHoverEase} group-hover:text-on-green-dark group-focus-within:text-on-green-dark sm:text-2xl lg:text-[1.75rem] lg:leading-tight`}
        >
          {card.title}
        </h3>
        <div
          className={`grid grid-rows-[0fr] transition-[grid-template-rows] ${serviceHoverDuration} ${serviceHoverEase} group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]`}
        >
          <div className="overflow-hidden">
            <p
              className={`pt-0 text-sm leading-relaxed text-on-green-dark/90 opacity-0 transition-[opacity,padding] delay-75 ${serviceHoverDuration} ${serviceHoverEase} group-hover:pt-5 group-hover:opacity-100 group-focus-within:pt-5 group-focus-within:opacity-100 sm:text-[15px]`}
            >
              {card.body}
            </p>
          </div>
        </div>
      </div>

      <ServiceRowArrow />
    </div>
  );
}

interface ServicesAccordionListProps {
  showTopBorder?: boolean;
}

export function ServicesAccordionList({ showTopBorder = true }: ServicesAccordionListProps) {
  const listBorderClass = showTopBorder ? "border-t border-brand-green/25 pt-2 sm:pt-3" : "";

  return (
    <motion.ul
      className={listBorderClass}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {responsibilityCards.map((card) => (
        <motion.li
          key={card.title}
          variants={fadeUp}
          className="border-b border-brand-green/25 last:border-b-0"
        >
          <ServiceAccordionRow card={card} />
        </motion.li>
      ))}
    </motion.ul>
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
