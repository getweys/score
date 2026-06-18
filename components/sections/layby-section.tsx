"use client";

import { useRef, useState } from "react";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { CdnScrollPlayer, CdnVideoEmbed } from "@/components/ui/cdn-scroll-player";
import { VideoMuteToggle } from "@/components/ui/video-mute-toggle";
import {
  laybyBody,
  laybyEyebrow,
  laybyVideoPoster,
  laybyVideoSrc,
  laybyVideoTitle,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, viewportOnce } from "@/lib/motion-variants";

const easeSmooth = [0.2, 0.85, 0.38, 1] as const;

/** Cinematic "open" reveal for the video card. */
const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, clipPath: "inset(0% 34% 0% 34% round 24px)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 0.95, ease: easeSmooth },
  },
};

export function LaybySection() {
  const reduceMotion = useReducedMotion();
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section
      id="layby"
      className="relative scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24"
      aria-labelledby="layby-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.85) 0, rgba(255,255,255,0) 55%), radial-gradient(rgba(112,130,89,0.16) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 26px 26px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs"
          >
            {laybyEyebrow}
          </motion.p>

          <motion.h2
            id="layby-heading"
            variants={fadeUpBlur}
            className="mt-1.5 text-lg font-black tracking-tight text-secondary sm:mt-3 sm:text-3xl lg:text-4xl"
          >
            Layby - Space available for Rent
            <span className="text-primary">.</span>
          </motion.h2>

          <motion.span
            aria-hidden
            className="mt-1.5 block h-0.5 rounded-full bg-primary sm:mt-2 sm:h-1"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.3, ease: easeSmooth }}
          />

          <motion.p
            variants={fadeUp}
            className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:mt-5 sm:text-sm"
          >
            {laybyBody}
          </motion.p>
        </motion.div>

        <motion.div
          ref={videoWrapRef}
          className="relative mx-auto mt-3 aspect-video w-full max-w-7xl overflow-hidden rounded-xl bg-black shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)] ring-1 ring-black/10 sm:mt-6 sm:rounded-2xl"
          variants={reduceMotion ? undefined : cardReveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {reduceMotion ? (
            <CdnVideoEmbed
              videoSrc={laybyVideoSrc}
              title={laybyVideoTitle}
              posterSrc={laybyVideoPoster}
              isMuted={isMuted}
            />
          ) : (
            <CdnScrollPlayer
              videoSrc={laybyVideoSrc}
              title={laybyVideoTitle}
              posterSrc={laybyVideoPoster}
              hostWrapRef={videoWrapRef}
              isMuted={isMuted}
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/25"
            aria-hidden
          />

          <VideoMuteToggle
            isMuted={isMuted}
            onToggle={() => setIsMuted((muted) => !muted)}
            label="layby video"
          />
        </motion.div>
      </div>
    </section>
  );
}
