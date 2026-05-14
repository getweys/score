"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroLead, heroSlides, heroTitleLine1, heroTitleLine2 } from "@/lib/site-content";
import { fadeUp, imageReveal, viewportOnce } from "@/lib/motion-variants";

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-20">
        <div>
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            {heroTitleLine1}
            <br />
            {heroTitleLine2}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
          >
            {heroLead}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3 sm:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: 0.14 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#services"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-shadow hover:shadow-lg"
              >
                Our Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-primary bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80 lg:aspect-[16/11]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={imageReveal}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[index]}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={heroSlides[index]}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={heroSlides[i]}
                type="button"
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-white/70"}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
