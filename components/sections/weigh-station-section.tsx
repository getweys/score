"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VideoMuteToggle } from "@/components/ui/video-mute-toggle";
import {
  weighStationEyebrow,
  weighStationHeading,
  weighStationHighlights,
  weighStationIntro,
  weighStationVideoSrc,
} from "@/lib/site-content";
import {
  fadeUp,
  fadeUpBlur,
  headerStagger,
  imageReveal,
  riseSoft,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion-variants";

const highlightIcons = [LanesIcon, MotionIcon, TagIcon, ClockIcon] as const;

const hoverEase = "ease-[cubic-bezier(0.33,1,0.68,1)]";
const hoverDuration = "duration-700";
const hoverDescDelay = "delay-150";

function playVideo(video: HTMLVideoElement | null, muted: boolean): Promise<boolean> {
  if (!video) return Promise.resolve(false);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
    return Promise.resolve(false);
  }
  video.muted = muted;
  return video.play().then(() => true).catch(() => false);
}

export function WeighStationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video || !entry) return;

        inViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          void playVideo(video, isMutedRef.current).then((ok) => setNeedsTap(!ok && !isMutedRef.current));
        } else {
          video.pause();
          setNeedsTap(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    function onVisibilityChange() {
      const video = videoRef.current;
      if (!video) return;
      if (document.visibilityState === "visible" && inViewRef.current) {
        void playVideo(video, isMutedRef.current).then((ok) => setNeedsTap(!ok && !isMutedRef.current));
      } else {
        video.pause();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function handlePlayTap() {
    void playVideo(videoRef.current, isMutedRef.current).then((ok) => {
      if (ok) setNeedsTap(false);
    });
  }

  return (
    <section
      ref={sectionRef}
      id="weigh-station"
      className="relative scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24"
      aria-labelledby="weigh-station-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="max-w-3xl"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
            variants={fadeUp}
          >
            {weighStationEyebrow}
          </motion.p>
          <motion.h2
            id="weigh-station-heading"
            className="mt-1.5 sm:mt-3 text-lg font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-[2.35rem]"
            variants={fadeUpBlur}
          >
            {weighStationHeading}
          </motion.h2>
          <motion.p
            className="mt-2.5 text-xs xs:text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-lg"
            variants={fadeUp}
          >
            {weighStationIntro}
          </motion.p>
        </motion.header>

        <div className="mt-4 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-8 lg:mt-12 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
          <motion.div
            className="relative aspect-video w-full"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={imageReveal}
          >
            <video
              ref={videoRef}
              className="size-full object-cover"
              playsInline
              loop
              preload="metadata"
              poster="/images/14.jpeg"
              aria-label="Karachi Smart Weigh Station facility video"
            >
              <source src={weighStationVideoSrc} type="video/mp4" />
            </video>
            {needsTap ? (
              <button
                type="button"
                onClick={handlePlayTap}
                className="absolute inset-0 z-20 flex items-center justify-center bg-secondary/40 text-sm font-semibold text-white transition-colors hover:bg-secondary/55"
                aria-label="Play weigh station video with sound"
              >
                Tap to play with sound
              </button>
            ) : null}
            <VideoMuteToggle
              isMuted={isMuted}
              onToggle={() => setIsMuted((muted) => !muted)}
              label="weigh station video"
            />
          </motion.div>

          <motion.ul
            className="flex w-full flex-col lg:aspect-video lg:justify-between"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {weighStationHighlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? LanesIcon;
              return (
                <motion.li
                  key={item.label}
                  variants={riseSoft}
                  className={`group flex w-full flex-1 items-center gap-2 sm:gap-3 border-b border-brand-green/25 bg-transparent px-1 sm:px-2 py-2 sm:py-4 transition-[background-color,box-shadow] ${hoverDuration} ${hoverEase} last:border-b-0 max-lg:active:bg-brand-green-dark lg:px-3 lg:py-0 lg:hover:bg-brand-green-dark lg:focus-within:bg-brand-green-dark motion-reduce:transition-none`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center text-primary transition-[color,transform] ${hoverDuration} ${hoverEase} group-hover:scale-105 group-hover:text-on-green-dark motion-reduce:group-hover:scale-100 sm:size-9`}
                  >
                    <Icon className="size-5 sm:size-[1.35rem]" />
                  </span>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p
                      className={`text-[13px] font-bold leading-snug text-secondary transition-[color,transform] ${hoverDuration} ${hoverEase} group-hover:translate-x-0.5 group-hover:text-on-green-dark motion-reduce:group-hover:translate-x-0 sm:text-base`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] leading-snug text-slate-600 transition-[color,transform,opacity] ${hoverDescDelay} ${hoverDuration} ${hoverEase} group-hover:translate-x-0.5 group-hover:text-on-green-dark/90 motion-reduce:group-hover:translate-x-0 sm:text-sm`}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
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
