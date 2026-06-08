"use client";

import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import {
  ceoMessageEyebrow,
  ceoMessageHeading,
  ceoMessageParagraphs,
  ceoMessageSignature,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, viewportOnce } from "@/lib/motion-variants";

const easeOut = [0.33, 1, 0.68, 1] as const;

const proseReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const noMotion: Variants = {
  hidden: {},
  visible: {},
};

export function CeoMessageSection() {
  const reduceMotion = useReducedMotion();
  const [opening, ...following] = ceoMessageParagraphs;

  const reveal = reduceMotion ? noMotion : textReveal;
  const prose = reduceMotion ? noMotion : proseReveal;

  const bodyClass =
    "text-[0.9375rem] leading-[1.88] text-slate-700 antialiased sm:text-[1.0625rem] sm:leading-[1.84]";

  const dropCapClass =
    `${bodyClass} after:block after:h-0 after:clear-both after:content-[''] [&:first-letter]:float-left [&:first-letter]:mr-2.5 [&:first-letter]:mt-0.5 [&:first-letter]:font-sans [&:first-letter]:font-semibold [&:first-letter]:text-[2.65rem] [&:first-letter]:leading-[0.92] [&:first-letter]:text-primary sm:[&:first-letter]:mr-4 sm:[&:first-letter]:mt-1 sm:[&:first-letter]:text-[3.35rem] lg:[&:first-letter]:text-[3.5rem]`;

  return (
    <section
      id="ceo-message"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-14 sm:py-16 lg:py-20"
      aria-labelledby="ceo-message-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.header
            variants={headerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
              variants={fadeUp}
            >
              {ceoMessageEyebrow}
            </motion.p>
            <motion.h2
              id="ceo-message-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-secondary sm:text-3xl lg:text-[2rem]"
              variants={fadeUpBlur}
            >
              {ceoMessageHeading}
            </motion.h2>
          </motion.header>

          <motion.div
            className="mt-8 sm:mt-10"
            variants={prose}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="space-y-7 sm:space-y-8">
              <motion.p variants={reveal} className={dropCapClass}>
                {opening}
              </motion.p>

              {following.map((paragraph, index) => (
                <motion.p key={`ceo-${index}`} variants={reveal} className={bodyClass}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.footer variants={reveal} className="mt-10 pt-6 sm:mt-12 sm:pt-8">
              <p className="text-[1.06rem] font-medium italic leading-snug text-secondary sm:text-xl">
                {ceoMessageSignature}
              </p>
            </motion.footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
