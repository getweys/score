"use client";

import { useEffect, useRef } from "react";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import {
  missionEyebrow,
  missionHeading,
  missionIntro,
  missionParagraphs,
  missionSignature,
  promoVideoSrc,
} from "@/lib/site-content";
import { headerStagger, viewportOnce } from "@/lib/motion-variants";

const easeOut = [0.33, 1, 0.68, 1] as const;

const sectionReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const proseReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const textRevealLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const noMotion: Variants = {
  hidden: {},
  visible: {},
};

/** Opacity only — transform on a parent breaks `position: sticky`. */
const videoFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  void video.play().catch(() => {});
}

interface AnimatedHeadingProps {
  text: string;
  className: string;
  reduceMotion: boolean;
}

function AnimatedHeading({ text, className, reduceMotion }: AnimatedHeadingProps) {
  const words = text.split(" ");

  return (
    <motion.h2
      id="mission-heading"
      className={className}
      variants={reduceMotion ? noMotion : wordStagger}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block last:mr-0"
          variants={reduceMotion ? noMotion : wordReveal}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export function MissionSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opening, ...following] = missionParagraphs;

  const reveal = reduceMotion ? noMotion : textReveal;
  const revealLeft = reduceMotion ? noMotion : textRevealLeft;
  const section = reduceMotion ? noMotion : sectionReveal;
  const prose = reduceMotion ? noMotion : proseReveal;

  useEffect(() => {
    tryPlay(videoRef.current);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") tryPlay(videoRef.current);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const bodyClass =
    "text-[0.9375rem] leading-[1.88] text-slate-700 antialiased sm:text-[1.0625rem] sm:leading-[1.84]";

  const dropCapClass =
    `${bodyClass} after:block after:h-0 after:clear-both after:content-[''] [&:first-letter]:float-left [&:first-letter]:mr-2.5 [&:first-letter]:mt-0.5 [&:first-letter]:font-sans [&:first-letter]:font-semibold [&:first-letter]:text-[2.65rem] [&:first-letter]:leading-[0.92] [&:first-letter]:text-primary sm:[&:first-letter]:mr-4 sm:[&:first-letter]:mt-1 sm:[&:first-letter]:text-[3.35rem] lg:[&:first-letter]:text-[4rem]`;

  return (
    <section
      id="mission"
      className="relative scroll-mt-24 overflow-x-clip border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
      aria-labelledby="mission-heading"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[min(22rem,55vw)] w-[min(22rem,55vw)] -translate-x-1/3 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full text-left"
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.header
            className="max-w-3xl"
            variants={reduceMotion ? noMotion : headerStagger}
          >
            <motion.p
              variants={revealLeft}
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
            >
              {missionEyebrow}
            </motion.p>

            <AnimatedHeading
              text={missionHeading}
              reduceMotion={!!reduceMotion}
              className="mt-3 text-2xl font-bold tracking-tight text-secondary sm:mt-3.5 sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]"
            />

            <motion.p
              variants={reveal}
              transition={reduceMotion ? undefined : { duration: 0.85, delay: 0.2, ease: easeOut }}
              className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 sm:text-base"
            >
              {missionIntro}
            </motion.p>
          </motion.header>

          <div className="mt-8 grid grid-cols-1 items-start gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <motion.div
              className="min-w-0"
              variants={prose}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="space-y-7 sm:space-y-8">
                <motion.p
                  variants={reveal}
                  transition={reduceMotion ? undefined : { duration: 0.9, ease: easeOut }}
                  className={dropCapClass}
                >
                  {opening}
                </motion.p>

                {following.map((paragraph, index) => (
                  <motion.p
                    key={`mission-${index}`}
                    variants={reveal}
                    transition={reduceMotion ? undefined : { duration: 0.75, ease: easeOut }}
                    className={bodyClass}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.footer
                variants={reveal}
                transition={reduceMotion ? undefined : { duration: 0.75, delay: 0.15, ease: easeOut }}
                className="mt-10 pt-8 sm:mt-12 sm:pt-10"
              >
                <p className="text-[1.06rem] font-medium italic leading-snug text-secondary sm:text-xl">
                  {missionSignature}
                </p>
              </motion.footer>
            </motion.div>

            <div
              id="promo-video"
              className="w-full lg:sticky lg:top-24 lg:self-start"
            >
              <motion.video
                ref={videoRef}
                className="block h-auto w-full max-h-[min(72vh,640px)] bg-surface-green object-contain lg:max-h-[min(78vh,680px)]"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={reduceMotion ? noMotion : videoFade}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                onLoadedData={() => tryPlay(videoRef.current)}
                aria-label="SCORE motorway operations video"
              >
                <source src={promoVideoSrc} type="video/mp4" />
              </motion.video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
