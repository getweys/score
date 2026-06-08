"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ResponsibilityCard } from "@/lib/site-content";
import { responsibilityCards } from "@/lib/site-content";
import { slideInLeft } from "@/lib/motion-variants";

const timelineViewport = { once: false, amount: 0.28, margin: "0px 0px -8% 0px" } as const;

const ICON_COLUMN_PX = "1.75rem";

function TimelineIcon({ card }: { card: ResponsibilityCard }) {
  return (
    <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-[0_8px_20px_-10px_rgba(92,107,72,0.65)] sm:size-14">
      <div className="relative size-6 sm:size-7">
        <Image
          src={card.iconSrc}
          alt=""
          fill
          sizes="56px"
          className="object-contain brightness-0 invert"
        />
      </div>
    </div>
  );
}

interface TimelineStepProps {
  card: ResponsibilityCard;
  isLast: boolean;
  reduceMotion: boolean | null;
}

function TimelineStep({ card, isLast, reduceMotion }: TimelineStepProps) {
  const stepNo = card.number.padStart(2, "0");

  return (
    <motion.li
      className={`relative grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 ${isLast ? "" : "pb-12 sm:pb-14"}`}
      variants={slideInLeft}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={timelineViewport}
    >
      <div className="flex justify-center pt-0.5">
        <TimelineIcon card={card} />
      </div>

      <div className="relative flex min-w-0 items-start gap-3 sm:gap-4">
        <span
          className="shrink-0 select-none text-[2.75rem] font-bold leading-none tabular-nums text-primary/15 sm:text-[3.5rem]"
          aria-hidden
        >
          {stepNo}
        </span>
        <div className="min-w-0 pt-1 sm:pt-1.5">
          <h3 className="text-lg font-semibold leading-snug text-secondary sm:text-xl">
            {card.title}
          </h3>
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px] sm:leading-7">
            {card.body}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export function ResponsibilitiesTimeline() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.15", "end 0.85"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative mx-auto mt-10 max-w-3xl sm:mt-12 lg:mt-14">
      <div
        className="absolute bottom-0 top-0 w-px bg-brand-green/25"
        style={{ left: ICON_COLUMN_PX }}
        aria-hidden
      />
      <motion.div
        className="absolute top-0 w-px origin-top bg-primary"
        style={{
          left: ICON_COLUMN_PX,
          height: "100%",
          scaleY: reduceMotion ? 1 : lineScaleY,
        }}
        aria-hidden
      />

      <ul className="relative" role="list">
        {responsibilityCards.map((card, index) => (
          <TimelineStep
            key={card.title}
            card={card}
            isLast={index === responsibilityCards.length - 1}
            reduceMotion={reduceMotion}
          />
        ))}
      </ul>
    </div>
  );
}
