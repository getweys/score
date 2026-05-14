"use client";

import { motion } from "framer-motion";
import { financialHeading, financialRows } from "@/lib/site-content";
import { fadeUp, slideInLeft, viewportOnce } from "@/lib/motion-variants";

export function FinancialSection() {
  return (
    <section className="bg-zinc-50/80 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h3
          className="text-center text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {financialHeading}
        </motion.h3>

        <ul className="mt-12 space-y-4" role="list">
          {financialRows.map((row, i) => (
            <motion.li
              key={row.title}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-md shadow-zinc-900/5 transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
            >
              <h6 className="text-left text-base font-semibold leading-snug text-secondary sm:max-w-[55%] sm:text-lg">
                {row.title}
              </h6>
              <div className="flex flex-wrap items-center justify-end gap-3 sm:shrink-0">
                <motion.a
                  href={row.downloadHref}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DownloadIcon className="size-4" />
                  Download
                </motion.a>
                <motion.a
                  href={row.previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EyeIcon className="size-4" />
                  Preview
                </motion.a>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="https://score.com.pk/financial-statements/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
    </svg>
  );
}
