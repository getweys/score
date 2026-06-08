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

const btnDownload =
  "inline-flex min-h-8 w-full items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:px-3.5";

const btnPreview =
  "inline-flex min-h-8 w-full items-center justify-center rounded-md border border-brand-green/40 bg-transparent px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:border-brand-green-dark hover:bg-brand-green/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:border-on-green-dark/40 group-hover:text-on-green-dark group-hover:hover:bg-white/10 sm:w-auto sm:px-3.5";

const rowHover =
  "transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-brand-green-dark motion-reduce:transition-none";

function parseReportTitle(title: string) {
  const parts = title.split(" – ");
  if (parts.length < 2) {
    return { label: title, period: null };
  }
  return { label: parts[0], period: parts.slice(1).join(" – ") };
}

interface FinancialReportRowProps {
  row: (typeof financialRows)[number];
  index: number;
}

function FinancialReportRow({ row, index }: FinancialReportRowProps) {
  const { period } = parseReportTitle(row.title);
  const reportNo = String(index + 1).padStart(2, "0");
  const displayTitle = period ?? row.title;

  return (
    <div
      className={`group grid grid-cols-1 gap-2 px-3 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4 sm:px-4 sm:py-4 lg:gap-5 lg:px-5 lg:py-5 ${rowHover}`}
    >
      <span className="text-xs font-medium tabular-nums text-secondary/60 transition-colors duration-500 group-hover:text-on-green-dark sm:text-sm">
        ({reportNo})
      </span>

      <h3 className="min-w-0 text-sm font-medium leading-snug text-secondary transition-colors duration-500 group-hover:text-on-green-dark sm:text-base lg:text-lg lg:leading-tight">
        {displayTitle}
      </h3>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:shrink-0 sm:justify-end">
        <a
          href={row.downloadHref}
          target="_blank"
          rel="nofollow noopener noreferrer"
          download
          className={btnDownload}
        >
          Download
        </a>
        <a
          href={row.previewHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnPreview}
        >
          Preview
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
          className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs"
          variants={fadeUp}
        >
          {financialEyebrow}
        </motion.p>
        <motion.h2
          className="mt-2 text-xl font-bold leading-tight tracking-tight text-secondary sm:text-2xl"
          variants={fadeUpBlur}
        >
          {financialHeading}
        </motion.h2>
        <motion.p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm" variants={fadeUp}>
          {financialIntro}
        </motion.p>
      </motion.div>

      <ul
        className="mx-auto mt-6 max-w-4xl list-none border-t border-brand-green/25 pt-1 sm:mt-8"
        role="list"
      >
        {financialRows.map((row, index) => (
          <motion.li
            key={row.title}
            className="border-b border-brand-green/25 last:border-b-0"
            variants={listRowReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRow}
          >
            <FinancialReportRow row={row} index={index} />
          </motion.li>
        ))}
      </ul>

      {showViewMore ? (
        <motion.div
          className="mt-6 flex justify-center sm:mt-8"
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
