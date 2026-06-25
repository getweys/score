"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import {
  projectCarouselImages,
  projectReadMoreHref,
  projectSectionEyebrow,
  projectShowcaseHeading,
  projectShowcaseHighlights,
  projectShowcaseImage,
  projectShowcaseLead,
} from "@/lib/site-content";
import {
  fadeUp,
  fadeUpBlur,
  headerStagger,
  riseSoft,
  slideInRight,
  staggerTight,
  viewportOnce,
} from "@/lib/motion-variants";

function PrimaryCheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-white"
      aria-hidden
    >
      <svg className="size-2.5" viewBox="0 0 12 12" fill="none">
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

function ProjectGallerySection() {
  return (
    <section
      id="projects-gallery"
      className="scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-18"
      aria-labelledby="projects-gallery-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="mx-auto max-w-2xl text-center"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
            variants={fadeUp}
          >
            Gallery
          </motion.p>
          <motion.h2
            id="projects-gallery-heading"
            className="mt-1.5 sm:mt-2 text-xl font-bold tracking-tight text-secondary sm:text-2xl"
            variants={fadeUpBlur}
          >
            Along the M-9 corridor
          </motion.h2>
          <motion.p className="mt-1 sm:mt-2 text-[13px] leading-relaxed text-slate-600" variants={fadeUp}>
            Construction, operations, and corridor views across the M-9 motorway project.
          </motion.p>
        </motion.header>

        <motion.div
          className="mt-4 sm:mt-7"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ImageAutoSlider images={projectCarouselImages} durationSeconds={30} />
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectSection() {
  return (
    <>
      <section
        id="projects"
        className="scroll-mt-24 border-t border-brand-green/20 bg-surface-green py-10 sm:py-16 lg:py-24"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-14">
            <div className="min-w-0 text-left">
              <motion.header
                className="max-w-xl"
                variants={headerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.p
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-[13px]"
                  variants={fadeUp}
                >
                  {projectSectionEyebrow}
                </motion.p>
                <motion.h2
                  id="projects-heading"
                  className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-secondary sm:text-xl xl:text-2xl"
                  variants={fadeUpBlur}
                >
                  {projectShowcaseHeading}
                </motion.h2>
                <motion.p
                  className="mt-2.5 text-justify text-[13px] leading-relaxed text-slate-600 sm:mt-5 sm:text-sm"
                  variants={fadeUp}
                >
                  {projectShowcaseLead}
                </motion.p>
              </motion.header>

              <motion.ul
                className="mt-4 sm:mt-8 flex flex-col gap-1.5 sm:gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8"
                variants={staggerTight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {projectShowcaseHighlights.map((line) => (
                  <motion.li
                    key={line}
                    variants={riseSoft}
                    className="flex items-start gap-2 text-[14px] font-medium text-secondary sm:text-base"
                  >
                    <PrimaryCheckIcon />
                    <span>{line}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-4 sm:mt-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <a
                  href={projectReadMoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-primary px-4 py-1.5 text-[13px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white sm:px-7 sm:py-2.5 sm:text-sm"
                >
                  Read More
                </a>
              </motion.div>
            </div>

            <motion.div
              className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-brand-green/20 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] sm:aspect-5/4 lg:aspect-auto lg:min-h-88 lg:max-h-112"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Image
                src={projectShowcaseImage}
                alt="Karachi–Hyderabad Motorway M-9 corridor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <ProjectGallerySection />
    </>
  );
}
