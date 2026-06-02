"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { mapSectionImage } from "@/lib/site-content";
import { clipReveal, viewportOnce } from "@/lib/motion-variants";

export function MapShowcaseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="m9-map"
      className="relative w-full scroll-mt-20 overflow-hidden border-t border-brand-green/15 bg-surface-green"
    >
      {reduceMotion ? (
        <Image
          src={mapSectionImage}
          alt="Karachi–Hyderabad Motorway M-9 route map"
          width={1920}
          height={1080}
          className="block h-auto w-full"
          sizes="100vw"
          priority
        />
      ) : (
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Image
            src={mapSectionImage}
            alt="Karachi–Hyderabad Motorway M-9 route map"
            width={1920}
            height={1080}
            className="block h-auto w-full"
            sizes="100vw"
            priority
          />
        </motion.div>
      )}
    </section>
  );
}
