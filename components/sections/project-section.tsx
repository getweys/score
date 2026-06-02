"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  projectCarouselImages,
  projectReadMoreHref,
  projectSectionEyebrow,
  projectShowcaseHeading,
  projectShowcaseHighlights,
  projectShowcaseLead,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

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

interface AccordionGalleryProps {
  images: readonly string[];
}

function AccordionGallery({ images }: AccordionGalleryProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Desktop: horizontal accordion */}
      <div className="hidden h-[420px] items-stretch gap-2.5 overflow-hidden rounded-2xl sm:flex lg:h-[480px]">
        {images.map((src, idx) => (
          <div
            key={src}
            className="relative min-w-0 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-[flex-grow] duration-500 ease-in-out"
            style={{ flexGrow: hovered === idx ? 5 : 1 }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <Image
              src={src}
              alt={`M-9 project gallery — photo ${idx + 1} of ${images.length}`}
              fill
              className="object-cover transition-transform duration-700 ease-in-out"
              style={{ transform: hovered === idx ? "scale(1.06)" : "scale(1.0)" }}
              sizes="(max-width: 768px) 100vw, 20vw"
              priority={idx === 0}
            />
            {/* dark gradient at bottom */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-secondary/70 to-transparent"
              aria-hidden
            />
            {/* label — only visible when expanded */}
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 pb-4 transition-opacity duration-300"
              style={{ opacity: hovered === idx ? 1 : 0 }}
            >
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/70">
                M-9 Gallery
              </span>
              <span className="text-sm font-semibold tabular-nums text-white drop-shadow-sm">
                {idx + 1} / {images.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:hidden">
        {images.map((src, idx) => (
          <div
            key={src}
            className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-200 shadow-sm"
          >
            <Image
              src={src}
              alt={`M-9 project gallery — photo ${idx + 1} of ${images.length}`}
              fill
              className="object-cover"
              sizes="46vw"
              priority={idx < 2}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export function ProjectSection() {
  return (
    <section id="projects" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* copy block */}
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
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl">
              {projectShowcaseHeading}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {projectShowcaseLead}
            </p>

            <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
              {projectShowcaseHighlights.map((line) => (
                <li key={line} className="flex max-w-xs gap-2.5 text-sm font-medium text-secondary sm:text-base">
                  <PrimaryCheckIcon />
                  <span className="leading-snug">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href={projectReadMoreHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center border-2 border-primary px-7 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read More
            </a>
          </motion.div>
        </motion.div>

        {/* gallery */}
        <motion.div
          className="mt-10 sm:mt-12 lg:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <AccordionGallery images={projectCarouselImages} />
        </motion.div>
      </div>
    </section>
  );
}
