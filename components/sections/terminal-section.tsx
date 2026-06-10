"use client";

import { useRef, type ComponentType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DriveEmbed, DriveScrollPlayer } from "@/components/ui/drive-scroll-player";
import {
  fadeUp,
  fadeUpBlur,
  headerStagger,
  riseSoft,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion-variants";

const easeSmooth = [0.2, 0.85, 0.38, 1] as const;

/** Cinematic "open" reveal — matches layby video. */
const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, clipPath: "inset(0% 34% 0% 34% round 24px)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 0.95, ease: easeSmooth },
  },
};

export type TerminalContentBlock = {
  heading: string;
  items: readonly string[];
};

export type TerminalSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  blocks: readonly TerminalContentBlock[];
  driveFileId: string;
  videoTitle: string;
  videoPoster: string;
};

const blockIcons: ComponentType<{ className?: string }>[] = [
  SiteIcon,
  FacilitiesIcon,
  LeafIcon,
];

function CheckIcon() {
  return (
    <span
      className="mt-px inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors duration-500 group-hover/row:bg-white/20 sm:mt-0.5 sm:size-4"
      aria-hidden
    >
      <svg className="size-2 sm:size-2.5" viewBox="0 0 12 12" fill="none">
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

function TerminalFeatureCard({
  block,
  index,
}: {
  block: TerminalContentBlock;
  index: number;
}) {
  const Icon = blockIcons[index % blockIcons.length] ?? SiteIcon;

  return (
    <motion.article
      variants={riseSoft}
      className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-brand-green/15 bg-white shadow-[0_8px_28px_-18px_rgba(74,93,66,0.35)] transition-shadow duration-500 hover:shadow-[0_22px_55px_-18px_rgba(74,93,66,0.45)] sm:rounded-2xl sm:shadow-[0_14px_45px_-22px_rgba(74,93,66,0.4)]"
    >
      <div
        className="h-0.5 shrink-0 bg-linear-to-r from-primary via-brand-green to-primary/50 sm:h-1"
        aria-hidden
      />

      <div className="flex flex-1 flex-col px-3 py-3 sm:px-6 sm:py-6">
        <div className="flex items-center gap-2 sm:gap-3.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-green text-primary ring-1 ring-primary/25 transition-transform duration-500 group-hover/card:scale-105 motion-reduce:group-hover/card:scale-100 sm:size-10">
            <Icon className="size-4 sm:size-5" />
          </span>
          <h3 className="text-sm font-bold leading-snug tracking-tight text-secondary sm:text-base lg:text-lg">
            {block.heading}
          </h3>
        </div>

        <ul className="mt-3 flex flex-1 flex-col gap-0 sm:mt-5 sm:gap-0.5" role="list">
          {block.items.map((item) => (
            <li
              key={item}
              className="group/row flex items-start gap-2 rounded-md px-1.5 py-1.5 transition-colors duration-500 hover:bg-brand-green-dark motion-reduce:transition-none sm:gap-2.5 sm:rounded-lg sm:px-2.5 sm:py-2.5"
            >
              <CheckIcon />
              <span className="text-xs leading-snug text-slate-600 transition-colors duration-500 group-hover/row:text-on-green-dark sm:text-sm sm:leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function SiteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function FacilitiesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4-3-8-7-8-12a8 8 0 0 1 16 0c0 5-4 9-8 12Z"
      />
      <path strokeLinecap="round" d="M12 21V9" />
    </svg>
  );
}

export function TerminalSection({
  id,
  eyebrow,
  heading,
  intro,
  blocks,
  driveFileId,
  videoTitle,
  videoPoster,
}: TerminalSectionProps) {
  const reduceMotion = useReducedMotion();
  const videoWrapRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24"
      aria-labelledby={`${id}-heading`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.95) 0, transparent 50%), radial-gradient(rgba(112,130,89,0.12) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 26px 26px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs"
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {eyebrow}
          </motion.p>

          <motion.h2
            id={`${id}-heading`}
            variants={fadeUpBlur}
            className="mt-4 text-xl font-black leading-tight tracking-tight text-secondary sm:text-3xl lg:text-4xl"
          >
            {heading}
            <span className="text-primary">.</span>
          </motion.h2>

          <motion.span
            aria-hidden
            className="mx-auto mt-1 sm:mt-3 block h-1 rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.25, ease: easeSmooth }}
          />

          <motion.p
            variants={fadeUp}
            className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:mt-5 sm:text-sm"
          >
            {intro}
          </motion.p>
        </motion.header>

        <motion.div
          ref={videoWrapRef}
          className="relative mx-auto mt-4 aspect-video w-full overflow-hidden rounded-xl bg-secondary shadow-[0_28px_70px_-36px_rgba(15,23,42,0.55)] ring-1 ring-brand-green/20 sm:mt-10 sm:rounded-2xl"
          variants={reduceMotion ? undefined : cardReveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {reduceMotion ? (
            <DriveEmbed
              fileId={driveFileId}
              title={videoTitle}
              posterSrc={videoPoster}
            />
          ) : (
            <DriveScrollPlayer
              fileId={driveFileId}
              title={videoTitle}
              posterSrc={videoPoster}
              hostWrapRef={videoWrapRef}
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-secondary/40 via-transparent to-transparent"
            aria-hidden
          />
        </motion.div>

        <motion.div
          className="mt-5 grid gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-7"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {blocks.map((block, index) => (
            <TerminalFeatureCard key={block.heading} block={block} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
