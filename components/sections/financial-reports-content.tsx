"use client";

import { motion } from "framer-motion";
import {
  financialEyebrow,
  financialHeading,
  financialIntro,
  financialRows,
  financialViewMoreHref,
} from "@/lib/site-content";
import { fadeUp, headerStagger, staggerGallery, viewportOnce } from "@/lib/motion-variants";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 sm:text-sm";

const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200/90 bg-white/80 px-3.5 py-2 text-xs font-semibold text-secondary transition-colors hover:border-primary/25 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 sm:text-sm";

function parseReportTitle(title: string) {
  const parts = title.split(" – ");
  if (parts.length < 2) {
    return { label: title, period: null };
  }
  return { label: parts[0], period: parts.slice(1).join(" – ") };
}

interface FinancialReportsContentProps {
  showViewMore?: boolean;
}

export function FinancialReportsContent({ showViewMore = true }: FinancialReportsContentProps) {
  return (
    <>
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
          variants={fadeUp}
        >
          {financialEyebrow}
        </motion.p>
        <motion.h2
          className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:mt-4 sm:text-3xl lg:text-[2rem] xl:text-4xl"
          variants={fadeUp}
        >
          {financialHeading}
        </motion.h2>
        <motion.p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg" variants={fadeUp}>
          {financialIntro}
        </motion.p>
        <motion.div
          className="mx-auto mt-8 h-px max-w-[min(12rem,40vw)] bg-linear-to-r from-transparent via-primary/30 to-transparent sm:mt-10"
          aria-hidden
          variants={fadeUp}
        />
      </motion.div>

      <motion.ul
        className="mx-auto mt-12 max-w-4xl list-none space-y-3 sm:mt-14 sm:space-y-3.5"
        role="list"
        variants={staggerGallery}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {financialRows.map((row, index) => {
          const { label, period } = parseReportTitle(row.title);

          return (
            <motion.li
              key={row.title}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,background-color] duration-300 hover:border-zinc-300 hover:bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
            >
              <motion.div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center sm:gap-4">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15 sm:size-12"
                  aria-hidden
                >
                  <FileIcon className="size-5 sm:size-[1.35rem]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Report {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-left text-[0.9375rem] font-semibold leading-snug text-secondary sm:text-base lg:text-[1.05rem]">
                    {label}
                  </h3>
                  {period ? (
                    <p className="mt-1 text-sm font-medium text-primary/90">{period}</p>
                  ) : null}
                </div>
              </motion.div>
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0 sm:shrink-0 sm:justify-end sm:gap-2.5">
                <motion.a
                  href={row.downloadHref}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  download
                  className={btnPrimary}
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
                  className={btnGhost}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EyeIcon className="size-3.5 sm:size-4" />
                  Preview
                </motion.a>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {showViewMore ? (
        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <motion.a
            href={financialViewMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_36px_-14px_rgba(225,29,72,0.5)] transition-colors hover:bg-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View more
          </motion.a>
        </motion.div>
      ) : null}
    </>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M9 13h6M9 17h4" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1 1 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5s8.577 3.01 9.964 7.178a1 1 0 0 1 0 .644C20.577 16.49 16.64 19.5 12 19.5s-8.577-3.01-9.964-7.178Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
