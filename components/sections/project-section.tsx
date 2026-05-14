"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  staggerContainer,
  staggerGallery,
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

interface ProjectBentoRowProps {
  topLeftSrc: string;
  bottomLeftSrc: string;
  rightSrc: string;
  photoIndexStart: number;
}

function ProjectBentoRow({
  topLeftSrc,
  bottomLeftSrc,
  rightSrc,
  photoIndexStart,
}: ProjectBentoRowProps) {
  return (
    <div className="flex flex-col gap-1.5 lg:flex-row lg:items-stretch lg:gap-1.5">
      <div className="flex w-full flex-col gap-1.5 lg:w-[32%] lg:shrink-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-slate-200 shadow-sm">
          <Image
            src={topLeftSrc}
            alt={`M-9 project gallery — photo ${photoIndexStart + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 32vw"
          />
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-slate-200 shadow-sm">
          <Image
            src={bottomLeftSrc}
            alt={`M-9 project gallery — photo ${photoIndexStart + 2}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 32vw"
          />
        </div>
      </div>
      <div className="relative min-h-44 w-full flex-1 overflow-hidden rounded-sm bg-slate-200 shadow-sm lg:min-h-0">
        <Image
          src={rightSrc}
          alt={`M-9 project gallery — photo ${photoIndexStart + 3}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 70vw"
        />
      </div>
    </div>
  );
}

export function ProjectSection() {
  const firstTriple = projectCarouselImages.slice(0, 3);
  const bottomRowImages = projectCarouselImages.slice(3);

  return (
    <section id="projects" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{projectSectionEyebrow}</p>
          </motion.div>

          <motion.div className="lg:col-span-9" variants={fadeUp}>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl">
              {projectShowcaseHeading}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{projectShowcaseLead}</p>

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

        <motion.div
          className="mt-8 flex w-full flex-col gap-1.5 sm:mt-10 lg:mt-12"
          variants={staggerGallery}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {firstTriple.length === 3 ? (
            <motion.div variants={fadeUp}>
              <ProjectBentoRow
                topLeftSrc={firstTriple[0]}
                bottomLeftSrc={firstTriple[1]}
                rightSrc={firstTriple[2]}
                photoIndexStart={0}
              />
            </motion.div>
          ) : null}

          {bottomRowImages.length > 0 ? (
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {bottomRowImages.map((src, index) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-sm bg-slate-200 shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`M-9 project gallery — photo ${4 + index}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
