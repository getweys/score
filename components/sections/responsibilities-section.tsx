"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  responsibilityCards,
  responsibilitiesHeading,
  responsibilitiesIntro,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export function ResponsibilitiesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(280, el.offsetWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section id="services" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h3
          className="text-center text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {responsibilitiesHeading}
        </motion.h3>
        <motion.div
          className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-zinc-600 sm:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          {responsibilitiesIntro}
        </motion.div>

        <div className="relative mt-12">
          <motion.button
            type="button"
            className="absolute left-0 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-md transition hover:border-primary/40 md:left-1"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            type="button"
            className="absolute right-0 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-md transition hover:border-primary/40 md:right-1"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <ChevronRight />
          </motion.button>

          <motion.div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:gap-5 md:px-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {responsibilityCards.map((card, i) => (
              <motion.article
                key={card.title}
                className="group relative w-[min(100%,340px)] shrink-0 snap-center rounded-2xl border border-zinc-100 bg-white p-6 shadow-md shadow-zinc-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[min(100%,300px)] lg:w-[calc((100%-2.5rem)/3)]"
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-zinc-50 ring-1 ring-zinc-100 transition group-hover:ring-primary/25">
                    <Image src={card.iconSrc} alt="" fill className="object-contain p-1.5" sizes="56px" />
                  </div>
                  <span className="text-2xl font-bold text-primary/90">{card.number}</span>
                </div>
                <h4 className="text-lg font-semibold text-secondary">{card.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">{card.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
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
