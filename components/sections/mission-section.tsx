"use client";

import { motion } from "framer-motion";
import { missionParagraphs, missionSignature } from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function MissionSection() {
  const [first, ...rest] = missionParagraphs;
  const drop = first[0];
  const firstBody = first.slice(1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%230f172a' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          className="space-y-6 text-base leading-relaxed text-zinc-700 sm:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p>
            <span className="float-left mr-3 mt-1 flex h-[3.25rem] w-12 items-center justify-center rounded-lg bg-primary/10 text-4xl font-bold leading-none text-primary sm:h-16 sm:w-14 sm:text-5xl">
              {drop}
            </span>
            <span>{firstBody}</span>
          </p>
          {rest.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </motion.div>
        <motion.h2
          className="mt-10 text-right text-xl font-semibold text-secondary sm:text-2xl"
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {missionSignature}
        </motion.h2>
      </div>
    </section>
  );
}
