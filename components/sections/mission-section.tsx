"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  missionEyebrow,
  missionHeading,
  missionIntro,
  missionParagraphs,
  missionSignature,
} from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

/** Section-level stagger: header → prose block → signature */
const missionReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

/** Inner stagger for each paragraph (scroll-linked narrative reveal) */
const proseReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.04,
    },
  },
};

export function MissionSection() {
  const [opening, ...following] = missionParagraphs;

  const bodyClass =
    "text-[0.9375rem] leading-[1.88] text-slate-700 antialiased sm:text-[1.0625rem] sm:leading-[1.84]";

  const dropCapClass =
    `${bodyClass} after:block after:h-0 after:clear-both after:content-[''] [&:first-letter]:float-left [&:first-letter]:mr-3 [&:first-letter]:mt-1 [&:first-letter]:font-serif [&:first-letter]:font-semibold [&:first-letter]:text-[3.35rem] [&:first-letter]:leading-[0.92] [&:first-letter]:text-primary sm:[&:first-letter]:mr-4 sm:[&:first-letter]:text-[4rem]`;

  return (
    <section
      id="mission"
      className="relative scroll-mt-24 overflow-hidden border-t border-zinc-100 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[min(22rem,55vw)] w-[min(22rem,55vw)] -translate-x-1/3 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full text-left"
          variants={missionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.header variants={fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{missionEyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-secondary sm:mt-3.5 sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]">
              {missionHeading}
            </h2>
            <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 sm:text-base">{missionIntro}</p>
          </motion.header>

          <motion.div variants={proseReveal} className="relative mt-12 sm:mt-14">
            <div className="space-y-8 sm:space-y-9">
              <motion.p variants={fadeUp} className={dropCapClass}>
                {opening}
              </motion.p>

              {following.map((paragraph, index) => (
                <motion.p key={`mission-${index}`} variants={fadeUp} className={bodyClass}>
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.footer variants={fadeUp} className="mt-14 pt-10 sm:mt-16 sm:pt-14">
            <p className="text-[1.06rem] font-medium italic leading-snug text-secondary sm:text-xl">{missionSignature}</p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
