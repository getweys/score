"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectBody, projectCarouselImages, projectHeading } from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function ProjectSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % projectCarouselImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-zinc-50/80 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          className="text-center text-2xl font-bold tracking-tight text-secondary sm:text-3xl lg:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {projectHeading}
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-4xl text-center text-base leading-relaxed text-zinc-600 sm:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.06 }}
        >
          {projectBody}
        </motion.p>

        <motion.div
          className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl bg-zinc-200 shadow-lg ring-1 ring-zinc-200/80"
          initial={{ y: 28 }}
          whileInView={{ y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={projectCarouselImages[index]}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={projectCarouselImages[index]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-md backdrop-blur transition hover:scale-105 hover:bg-white"
            aria-label="Previous slide"
            onClick={() =>
              setIndex((i) => (i - 1 + projectCarouselImages.length) % projectCarouselImages.length)
            }
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-md backdrop-blur transition hover:scale-105 hover:bg-white"
            aria-label="Next slide"
            onClick={() => setIndex((i) => (i + 1) % projectCarouselImages.length)}
          >
            <ChevronRight />
          </button>
          <div className="flex justify-center gap-2 py-4">
            {projectCarouselImages.map((_, i) => (
              <button
                key={projectCarouselImages[i]}
                type="button"
                aria-label={`Project image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-zinc-300"}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
