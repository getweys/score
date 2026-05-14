"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { laybyBody, laybyHeading } from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function LaybySection() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h3
          className="text-center text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {laybyHeading}
        </motion.h3>
        <motion.p
          className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-zinc-600 sm:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.06 }}
        >
          {laybyBody}
        </motion.p>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-zinc-900/10"
          initial={{ y: 24, scale: 0.99 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative aspect-[16/9] w-full sm:aspect-[21/9]"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/banner-back-1-1-Photoroom-min.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-secondary/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
