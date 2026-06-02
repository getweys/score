"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  projectCarouselImages,
  projectReadMoreHref,
  projectSectionEyebrow,
  projectShowcaseHeading,
  projectShowcaseHighlights,
  projectShowcaseLead,
} from "@/lib/site-content";
import {
  fadeUp,
  fadeUpBlur,
  headerStagger,
  riseSoft,
  staggerContainer,
  staggerTight,
  viewportOnce,
} from "@/lib/motion-variants";

function PrimaryCheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white"
      aria-hidden
    >
      <svg className="size-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

interface ProjectGalleryProps {
  images: readonly string[];
}

const galleryEase = "ease-[cubic-bezier(0.33,1,0.68,1)]";
const galleryRowEase = `duration-700 ${galleryEase}`;
const galleryImageEase = `duration-[1100ms] ${galleryEase}`;
const galleryStickyTopPx = 96;
const galleryStickyTop = "top-20 lg:top-24";
const galleryStepVh = 85;

function galleryHeading(index: number) {
  return `Photograph ${String(index + 1).padStart(2, "0")}`;
}

function GalleryPinnedPanel({
  images,
  activeIndex,
}: {
  images: readonly string[];
  activeIndex: number;
}) {
  const total = images.length;

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
      <ul className="order-2 min-w-0 list-none border-t border-brand-green/25 lg:order-1" role="list">
        {images.map((src, idx) => {
          const isActive = activeIndex === idx;
          const photoNo = String(idx + 1).padStart(2, "0");

          return (
            <li key={src} className="border-b border-brand-green/25 last:border-b-0">
              <div
                className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-3.5 text-left transition-colors ${galleryRowEase} sm:gap-3.5 sm:px-4 sm:py-4 lg:px-3 lg:py-4 ${
                  isActive ? "bg-brand-green-dark text-on-green-dark" : "text-secondary"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`text-xs font-medium tabular-nums transition-colors ${galleryRowEase} ${
                    isActive ? "text-on-green-dark/70" : "text-secondary/55"
                  }`}
                >
                  ({photoNo})
                </span>
                <span className="text-base font-medium leading-snug sm:text-[1.05rem]">
                  {galleryHeading(idx)}
                </span>
                <span
                  className={`text-[0.65rem] font-semibold tabular-nums transition-colors ${galleryRowEase} ${
                    isActive ? "text-on-green-dark/80" : "text-slate-500"
                  }`}
                >
                  {idx + 1}/{total}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="order-1 min-w-0 w-full lg:order-2">
        <div className="relative aspect-16/10 w-full min-h-[220px] overflow-hidden bg-secondary/5 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.3)] ring-1 ring-secondary/8 sm:min-h-[280px] lg:min-h-[min(52vh,500px)]">
          {images.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`M-9 motorway gallery — ${galleryHeading(idx)}`}
              fill
              className={`absolute inset-0 object-cover transition-opacity ${galleryImageEase} ${
                activeIndex === idx ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectGallery({ images }: ProjectGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    function updateActiveIndex() {
      const pin = pinRef.current;
      if (!pin || images.length === 0) return;

      const rect = pin.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollSpan = pin.offsetHeight - viewportHeight;

      if (scrollSpan <= 0) return;

      if (rect.top > galleryStickyTopPx) {
        setActiveIndex(0);
        return;
      }

      if (rect.bottom <= viewportHeight) {
        setActiveIndex(images.length - 1);
        return;
      }

      const traveled = galleryStickyTopPx - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / scrollSpan));
      const nextIndex = Math.min(
        images.length - 1,
        Math.round(progress * Math.max(images.length - 1, 0)),
      );

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    }

    let frame = 0;
    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveIndex);
    }

    scheduleUpdate();
    const mountTimer = window.setTimeout(scheduleUpdate, 120);

    const pinEl = pinRef.current;
    const resizeObserver =
      pinEl && typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleUpdate) : null;
    if (pinEl && resizeObserver) resizeObserver.observe(pinEl);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.clearTimeout(mountTimer);
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [images.length, reduceMotion]);

  if (images.length === 0) return null;

  const pinHeightVh = images.length * galleryStepVh;

  return (
    <div className="w-full">
      <motion.div
        className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left"
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
          variants={fadeUp}
        >
          Gallery
        </motion.p>
        <motion.h3
          className="mt-2 text-xl font-bold tracking-tight text-secondary sm:text-2xl"
          variants={fadeUpBlur}
        >
          Along the M-9 corridor
        </motion.h3>
        <motion.p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm" variants={fadeUp}>
          Keep scrolling — the gallery stays fixed while each photograph appears.
        </motion.p>
      </motion.div>

      {reduceMotion ? (
        <motion.div
          className="mt-8 sm:mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <GalleryPinnedPanel images={images} activeIndex={activeIndex} />
        </motion.div>
      ) : (
        <div
          ref={pinRef}
          className="relative mt-8 w-full sm:mt-10"
          style={{ height: `${pinHeightVh}vh` }}
          aria-label="Scroll to step through gallery photographs"
        >
          <div className={`sticky ${galleryStickyTop} z-10 w-full`}>
            <div className="w-full py-4 sm:py-6">
              <GalleryPinnedPanel images={images} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectSection() {
  return (
    <>
      <section
        id="projects"
        className="scroll-mt-24 flex min-h-screen items-center border-t border-brand-green/20 bg-surface-green"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="lg:col-span-3" variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                {projectSectionEyebrow}
              </p>
            </motion.div>

            <motion.div className="lg:col-span-9" variants={fadeUp}>
              <motion.h2
                variants={fadeUpBlur}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="text-2xl font-bold leading-snug tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl"
              >
                {projectShowcaseHeading}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                {projectShowcaseLead}
              </motion.p>

              <motion.ul
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4"
                variants={staggerTight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {projectShowcaseHighlights.map((line) => (
                  <motion.li
                    key={line}
                    variants={riseSoft}
                    className="flex max-w-xs gap-2.5 text-sm font-medium text-secondary sm:text-base"
                  >
                    <PrimaryCheckIcon />
                    <span className="leading-snug">{line}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.a
                href={projectReadMoreHref}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-10 inline-flex items-center justify-center border-2 border-primary px-7 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Read More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="projects-gallery"
        className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
        aria-labelledby="projects-gallery-heading"
      >
        <h2 id="projects-gallery-heading" className="sr-only">
          M-9 project gallery
        </h2>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectGallery images={projectCarouselImages} />
        </div>
      </section>
    </>
  );
}
