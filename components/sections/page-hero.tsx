"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, headerStagger } from "@/lib/motion-variants";

interface PageHeroProps {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

export function PageHero({ breadcrumbLabel, eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="border-b border-brand-green/15 bg-surface-green pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-16">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              /
            </li>
            <li className="font-medium text-secondary">{breadcrumbLabel}</li>
          </ol>
        </motion.nav>
        <motion.p
          variants={fadeUp}
          className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-4xl"
        >
          {title}
        </motion.h1>
        {intro ? (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg"
          >
            {intro}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}
