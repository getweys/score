"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  financialEyebrow,
  financialHeading,
  financialIntro,
  financialRows,
  financialViewMoreHref,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, listRowReveal, viewportOnce, viewportRow } from "@/lib/motion-variants";

const rowHover =
  "transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-brand-green-dark motion-reduce:transition-none";

const iconAction =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-primary transition-colors hover:bg-brand-green/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:text-on-green-dark group-hover:hover:bg-white/10 sm:size-9";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" />
    </svg>
  );
}

function PreviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

interface FinancialReportRowProps {
  row: (typeof financialRows)[number];
}

function FinancialReportRow({ row }: FinancialReportRowProps) {
  return (
    <div
      className={`group flex items-center justify-between gap-3 px-1 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:gap-5 lg:px-5 lg:py-5 ${rowHover}`}
    >
      <h3 className="min-w-0 flex-1 text-xs font-medium leading-snug text-secondary transition-colors duration-500 group-hover:text-on-green-dark sm:text-base lg:text-lg lg:leading-tight">
        {row.title}
      </h3>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <a
          href={row.downloadHref}
          target="_blank"
          rel="nofollow noopener noreferrer"
          download
          className={iconAction}
          aria-label={`Download ${row.title}`}
        >
          <DownloadIcon className="size-4 sm:size-4.5" />
        </a>
        <a
          href={row.previewHref}
          target="_blank"
          rel="noopener noreferrer"
          className={iconAction}
          aria-label={`Preview ${row.title}`}
        >
          <PreviewIcon className="size-4 sm:size-4.5" />
        </a>
      </div>
    </div>
  );
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
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs"
          variants={fadeUp}
        >
          {financialEyebrow}
        </motion.p>
        <motion.h2
          className="mt-1.5 text-lg font-bold leading-tight tracking-tight text-secondary sm:mt-2 sm:text-2xl"
          variants={fadeUpBlur}
        >
          {financialHeading}
        </motion.h2>
        <motion.p className="mt-2 text-xs leading-relaxed text-slate-600 sm:mt-3 sm:text-sm" variants={fadeUp}>
          {financialIntro}
        </motion.p>
      </motion.div>

      <ul
        className="mx-auto mt-4 max-w-5xl list-none border-t border-brand-green/25 pt-1 sm:mt-8"
        role="list"
      >
        {financialRows.map((row) => (
          <motion.li
            key={row.title}
            className="border-b border-brand-green/25 last:border-b-0"
            variants={listRowReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRow}
          >
            <FinancialReportRow row={row} />
          </motion.li>
        ))}
      </ul>

      {showViewMore ? (
        <motion.div
          className="mt-4 flex justify-center sm:mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Link
            href={financialViewMoreHref}
            className="inline-flex min-h-8 items-center justify-center rounded-md border-2 border-primary px-5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
          >
            View all reports
          </Link>
        </motion.div>
      ) : null}
    </>
  );
}
