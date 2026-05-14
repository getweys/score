"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroLead, heroSlides, heroTitleLine1, heroTitleLine2 } from "@/lib/site-content";
import { fadeUp, headerStagger, imageReveal, viewportHero } from "@/lib/motion-variants";

const heroImage = heroSlides[0];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate m-2 scroll-mt-24 flex min-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl bg-white"
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={imageReveal}
      >
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          fetchPriority="high"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-1 bg-black/55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.55)_0%,transparent_42%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-20 pt-24 text-center sm:px-8 sm:pb-24 sm:pt-28 lg:max-w-6xl lg:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <motion.h1
            className="text-2xl font-semibold uppercase leading-[1.12] tracking-[0.06em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-4xl sm:tracking-wider md:text-5xl lg:text-6xl"
            variants={headerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportHero}
          >
            <motion.span className="block" variants={fadeUp}>
              {heroTitleLine1}
            </motion.span>
            <motion.span className="mt-1 block sm:mt-1.5" variants={fadeUp}>
              {heroTitleLine2}
            </motion.span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-[0.98rem] font-normal leading-relaxed text-white/92 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:mt-5 sm:text-lg sm:leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={viewportHero}
            variants={fadeUp}
            transition={{ delay: 0.06 }}
          >
            {heroLead}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 sm:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportHero}
            variants={fadeUp}
            transition={{ delay: 0.12 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#services"
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white shadow-[0_10px_40px_-10px_rgba(225,29,72,0.65)] transition hover:bg-primary/95 hover:shadow-[0_14px_44px_-10px_rgba(225,29,72,0.7)] sm:min-h-11 sm:px-8 sm:text-sm sm:tracking-[0.08em]"
              >
                Discover more
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
