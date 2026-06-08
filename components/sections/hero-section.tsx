"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  heroCaption,
  heroImage,
  heroLead,
  heroTitleLine1,
  heroTitleLine2,
  heroVideoSrc,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, viewportHero } from "@/lib/motion-variants";

const easeOut = [0.33, 1, 0.68, 1] as const;

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    video.pause();
    return;
  }
  void video.play().catch(() => { });
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    tryPlay(videoRef.current);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") tryPlay(videoRef.current);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onMotionPreferenceChange() {
      tryPlay(videoRef.current);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    mq.addEventListener("change", onMotionPreferenceChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      mq.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden text-white"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        {reduceMotion ? (
          <Image
            src={heroImage}
            alt="Karachi–Hyderabad Motorway M-9 aerial view"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 14, ease: "linear" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroImage}
            onLoadedData={() => tryPlay(videoRef.current)}
            aria-label="Karachi–Hyderabad Motorway M-9"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </motion.video>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-secondary/60 via-secondary/30 to-secondary/65"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_45%,rgba(15,23,42,0.2),rgba(15,23,42,0.55))]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <motion.div
          className="max-w-3xl"
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          viewport={viewportHero}
        >
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <motion.span
              className="h-px w-10 origin-right bg-primary sm:w-14"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, delay: 0.25, ease: easeOut }}
              aria-hidden
            />
            <motion.p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/90 sm:text-xs">
              {heroCaption}
            </motion.p>
            <motion.span
              className="h-px w-10 origin-left bg-primary sm:w-14"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, delay: 0.25, ease: easeOut }}
              aria-hidden
            />
          </motion.div>

          <motion.h1
            className="mt-5 text-[2rem] font-semibold leading-[1.1] tracking-tight drop-shadow-[0_2px_18px_rgba(15,23,42,0.75)] sm:mt-6 sm:text-[2.75rem] md:text-5xl lg:text-[3.8rem]"
            variants={headerStagger}
          >
            <motion.span className="block text-white" variants={fadeUpBlur}>
              {heroTitleLine1}
            </motion.span>
            <motion.span
              className="mt-1 block bg-linear-to-r from-on-green-dark via-white to-on-green-dark bg-clip-text font-medium italic text-transparent drop-shadow-[0_0_28px_rgba(232,237,217,0.35)] sm:mt-1.5"
              variants={fadeUpBlur}
            >
              {heroTitleLine2}
            </motion.span>
          </motion.h1>

          <motion.div
            className="mx-auto mt-5 h-0.5 w-14 rounded-full bg-primary shadow-[0_0_12px_rgba(92,107,72,0.65)] sm:mt-6 sm:w-16"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
            aria-hidden
          />

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_10px_rgba(15,23,42,0.7)] sm:mt-6 sm:text-base sm:leading-7"
            variants={fadeUp}
          >
            {heroLead}
          </motion.p>

          <motion.div className="mt-8 flex justify-center sm:mt-10" variants={fadeUp}>
            <Link
              href="#services"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(92,107,72,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-[0_14px_40px_-8px_rgba(74,93,66,0.8)]"
            >
              Discover more
              <ArrowDownIcon className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
