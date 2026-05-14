"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { ResponsibilityCard as ResponsibilityCardData } from "@/lib/site-content";
import {
  responsibilityCards,
  responsibilitiesEyebrow,
  responsibilitiesHeading,
  responsibilitiesIntro,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const cardShellClass =
  "flex h-full flex-col rounded-md border border-zinc-200/90 bg-white p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md sm:p-5";

function ResponsibilityCardInner({ card }: { card: ResponsibilityCardData }) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-sm sm:size-12">
          <Image src={card.iconSrc} alt="" fill className="object-contain p-1.5" sizes="60px" />
        </div>
      </div>
      <h3 className="text-base font-semibold leading-snug text-secondary sm:text-lg">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-[15px]">{card.body}</p>
    </>
  );
}

function ResponsibilityCardStatic({
  card,
  className,
}: {
  card: ResponsibilityCardData;
  className?: string;
}) {
  return (
    <article className={[cardShellClass, className].filter(Boolean).join(" ")}>
      <ResponsibilityCardInner card={card} />
    </article>
  );
}

function ResponsibilityCardMotion({ card }: { card: ResponsibilityCardData }) {
  return (
    <motion.article className={cardShellClass} variants={fadeUp}>
      <ResponsibilityCardInner card={card} />
    </motion.article>
  );
}

export function ResponsibilitiesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardEl = el.querySelector<HTMLElement>("article");
    const gapPx = parseFloat(getComputedStyle(el).gap) || 12;
    const step = cardEl ? cardEl.getBoundingClientRect().width + gapPx : Math.min(280, el.offsetWidth * 0.88);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{responsibilitiesEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:mt-4 sm:text-3xl lg:text-[2rem] xl:text-4xl">
            {responsibilitiesHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">{responsibilitiesIntro}</p>
        </motion.div>

        <motion.div
          className="relative mt-10 lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <motion.button
            type="button"
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-primary shadow-sm transition hover:border-primary/40 hover:bg-zinc-50"
            aria-label="Previous cards"
            onClick={() => scrollBy(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            type="button"
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-primary shadow-sm transition hover:border-primary/40 hover:bg-zinc-50"
            aria-label="Next cards"
            onClick={() => scrollBy(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight />
          </motion.button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-11 pb-1 sm:gap-4 sm:px-12"
          >
            {responsibilityCards.map((card) => (
              <div
                key={card.title}
                className="w-[min(100%,17.5rem)] shrink-0 snap-center sm:w-[min(100%,18rem)]"
              >
                <ResponsibilityCardStatic card={card} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 hidden grid-cols-2 gap-2 lg:grid xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {responsibilityCards.map((card) => (
            <ResponsibilityCardMotion key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
