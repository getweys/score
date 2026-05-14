"use client";

import { motion } from "framer-motion";
import {
  financialEyebrow,
  financialHeading,
  financialIntro,
  financialRows,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 sm:text-sm";

export function FinancialSection() {
  return (
    <section
      id="financial"
      className="scroll-mt-24 border-t border-zinc-100 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{financialEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:mt-4 sm:text-3xl lg:text-[2rem] xl:text-4xl">
            {financialHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">{financialIntro}</p>
          <div
            className="mx-auto mt-8 h-px max-w-[min(12rem,40vw)] bg-linear-to-r from-transparent via-primary/30 to-transparent sm:mt-10"
            aria-hidden
          />
        </motion.div>

        <motion.ul
          className="mx-auto mt-12 max-w-4xl list-none space-y-3 sm:mt-14 sm:space-y-3.5"
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {financialRows.map((row) => (
            <motion.li
              key={row.title}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-md border border-zinc-200/90 bg-white p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
            >
              <h3 className="text-left text-[0.9375rem] font-semibold leading-snug text-secondary sm:max-w-[58%] sm:text-base lg:text-lg">
                {row.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end sm:gap-3">
                <motion.a
                  href={row.downloadHref}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  download
                  className={btnOutline}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DownloadIcon className="size-3.5 sm:size-4" />
                  Download
                </motion.a>
                <motion.a
                  href={row.previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnOutline}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EyeIcon className="size-3.5 sm:size-4" />
                  Preview
                </motion.a>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <motion.a
            href="https://score.com.pk/financial-statements/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_36px_-14px_rgba(225,29,72,0.5)] transition-colors hover:bg-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View more
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
