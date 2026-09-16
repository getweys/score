"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeUpBlur, headerStagger, viewportHero } from "@/lib/motion-variants";

interface PageHeroProps {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

export function PageHero({ breadcrumbLabel, eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="border-b border-brand-green/15 bg-surface-green pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
        viewport={viewportHero}
      >

        <motion.p
          variants={fadeUp}
          className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUpBlur}
          className="mt-3 max-w-3xl text-xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl"
        >
          {title}
        </motion.h1>
        {intro ? (
          <motion.p
            variants={fadeUpBlur}
            className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-lg"
          >
            {intro}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}
