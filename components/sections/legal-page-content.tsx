"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import type { LegalSection } from "@/lib/site-content";
import { fadeUp, listRowReveal, viewportOnce, viewportRow } from "@/lib/motion-variants";

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

export type PolicyDocumentRow = {
  title: string;
  downloadHref: string;
  previewHref: string;
};

export function LegalDocumentList({
  eyebrow,
  heading,
  intro,
  rows,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  rows: readonly PolicyDocumentRow[];
}) {
  return (
    <>
      <PageHero breadcrumbLabel={heading} eyebrow={eyebrow} title={heading} intro={intro} />
      <section className="border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ul className="list-none border-t border-brand-green/25" role="list">
            {rows.map((row) => (
              <motion.li
                key={row.title}
                className="border-b border-brand-green/25 last:border-b-0"
                variants={listRowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportRow}
              >
                <div
                  className={`group flex items-center justify-between gap-3 px-1 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:gap-5 lg:px-5 lg:py-5 ${rowHover}`}
                >
                  <h2 className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-secondary transition-colors duration-500 group-hover:text-on-green-dark sm:text-base lg:text-lg lg:leading-tight">
                    {row.title}
                  </h2>
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
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function LegalTextPage({
  eyebrow,
  heading,
  intro,
  sections,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <PageHero breadcrumbLabel={heading} eyebrow={eyebrow} title={heading} intro={intro} />
      <section className="border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-8 sm:space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            {sections.map((section) => (
              <article key={section.heading} className="border-b border-brand-green/20 pb-8 last:border-b-0 last:pb-0">
                <h2 className="text-base font-bold tracking-tight text-secondary sm:text-lg">{section.heading}</h2>
                <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-justify text-[13px] leading-relaxed text-slate-600 sm:text-sm sm:leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-slate-600 sm:text-sm sm:leading-7">
                      {section.bullets.map((item) => (
                        <li key={item.slice(0, 48)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
