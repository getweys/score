"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { responsibilityCards } from "@/lib/site-content";
import {
  ServiceCardInner,
  ServicesCardsGrid,
  ServicesSectionHeader,
  serviceCardClass,
} from "@/components/sections/services-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

function ResponsibilityCardStatic({
  card,
  className,
}: {
  card: (typeof responsibilityCards)[number];
  className?: string;
}) {
  return (
    <article className={[serviceCardClass, className].filter(Boolean).join(" ")}>
      <ServiceCardInner card={card} />
    </article>
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
    <section id="services" className="scroll-mt-24 bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServicesSectionHeader />

        <motion.div
          className="relative mt-10 lg:hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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

        <ServicesCardsGrid className="mt-10 hidden lg:grid" />
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
