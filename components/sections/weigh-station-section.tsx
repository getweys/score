"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  weighStationEyebrow,
  weighStationHeading,
  weighStationHighlights,
  weighStationIntro,
  weighStationParagraphs,
  weighStationTagline,
  weighStationVideoSrc,
} from "@/lib/site-content";
import {
  fadeUp,
  headerStagger,
  imageReveal,
  riseSoft,
  staggerGallery,
  staggerTight,
  viewportOnce,
} from "@/lib/motion-variants";

const highlightIcons = [LanesIcon, MotionIcon, TagIcon, ClockIcon] as const;

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    video.pause();
    return;
  }
  void video.play().catch(() => { });
}

export function WeighStationSection() {
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
      id="weigh-station"
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
      aria-labelledby="weigh-station-heading"
    >
      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
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
            {weighStationEyebrow}
          </motion.p>
          <motion.h2
            id="weigh-station-heading"
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2.15rem] xl:text-4xl"
            variants={fadeUp}
          >
            {weighStationHeading}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg"
            variants={fadeUp}
          >
            {weighStationIntro}
          </motion.p>
          <motion.div
            className="mx-auto mt-8 h-px max-w-[min(12rem,40vw)] bg-linear-to-r from-transparent via-primary/35 to-transparent sm:mt-10"
            aria-hidden
            variants={fadeUp}
          />
        </motion.header>

        <motion.div
          className="relative mx-auto mt-12 max-w-5xl sm:mt-14 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={imageReveal}
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <video
              ref={videoRef}
              className="aspect-16/10 w-full object-cover sm:aspect-video"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster="/images/14.jpeg"
              onLoadedData={() => tryPlay(videoRef.current)}
              aria-label="Karachi Smart Weigh Station facility video"
            >
              <source src={weighStationVideoSrc} type="video/mp4" />
            </video>
          </div>

          <motion.div
            className="relative z-20 -mt-6 mx-auto grid max-w-4xl grid-cols-2 gap-2.5 px-2 sm:-mt-8 sm:grid-cols-4 sm:gap-3 sm:px-4"
            variants={staggerGallery}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {weighStationHighlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? LanesIcon;
              return (
                <motion.div
                  key={item.label}
                  variants={riseSoft}
                  className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-3.5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-zinc-300 sm:p-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-2.5 text-sm font-bold text-secondary sm:text-[0.9375rem]">{item.label}</p>
                  <p className="mt-1 text-[0.65rem] leading-snug text-slate-500 sm:text-xs">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-3xl lg:mt-16"
          variants={staggerTight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ul className="space-y-0 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
            {weighStationParagraphs.map((paragraph, index) => (
              <motion.li
                key={paragraph.slice(0, 40)}
                variants={fadeUp}
                className="flex gap-4 p-5 sm:gap-5 sm:p-6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white sm:size-10 sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-slate-600 sm:text-[15px] sm:leading-[1.75]">
                  {paragraph}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.div
            variants={fadeUp}
            className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
          >
            <p className="text-center text-base font-medium leading-relaxed text-secondary sm:text-lg sm:leading-relaxed">
              &ldquo;{weighStationTagline}&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LanesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

function MotionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h.01M3 11V7.8c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 4.6 5.08 4.6 6.2 4.6h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21.4 6.12 21.4 6.68 21.4 7.8v8.4c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.88 19.4 19.32 19.4 18.2 19.4H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 17.88 3 17.32 3 16.2V11Z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}
