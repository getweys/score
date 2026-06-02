"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroCaption,
  heroImage,
  heroLead,
  heroTitleLine1,
  heroTitleLine2,
  heroTitleLine3,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, imageReveal, viewportHero } from "@/lib/motion-variants";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative -mt-14 scroll-mt-20 border-b border-brand-green/15 bg-surface-green pt-14 text-secondary"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:py-20 xl:gap-16 xl:py-24">
        <motion.div
          className="flex min-h-[280px] flex-col justify-between sm:min-h-[340px] lg:min-h-[min(72vh,640px)]"
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          viewport={viewportHero}
        >
          <motion.h1
            className="max-w-xl text-3xl font-medium leading-[1.12] tracking-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1] xl:text-6xl"
            variants={headerStagger}
          >
            <motion.span className="block" variants={fadeUpBlur}>
              {heroTitleLine1}
            </motion.span>
            <motion.span className="block" variants={fadeUpBlur}>
              {heroTitleLine2}
            </motion.span>
            <motion.span className="block" variants={fadeUpBlur}>
              {heroTitleLine3}
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-sm text-sm leading-relaxed text-secondary/70 sm:mt-0 sm:text-[0.95rem]"
            variants={fadeUp}
          >
            {heroCaption}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex min-h-[280px] flex-col sm:min-h-[340px] lg:min-h-[min(72vh,640px)]"
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          viewport={viewportHero}
        >
          <motion.div
            className="relative h-96 w-full shrink-0 aspect-16/7.5 sm:aspect-16/6.75 lg:aspect-16/5.75"
            variants={imageReveal}
          >
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-top"
            />
          </motion.div>

          <div className="mt-auto flex flex-col gap-3 pt-4 sm:gap-4 sm:pt-5">
            <motion.p
              className="max-w-xl text-base leading-relaxed text-secondary/85 sm:text-[1.05rem] sm:leading-7"
              variants={fadeUp}
            >
              {heroLead}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                Discover more
                <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
