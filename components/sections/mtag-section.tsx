"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  contactEmergencyNumber,
  mtagBannerImage,
  mtagBenefits,
  mtagBenefitsHeading,
  mtagDeadlineBanner,
  mtagEyebrow,
  mtagHeading,
  mtagHowToBody,
  mtagHowToHeading,
  mtagIntroParagraphs,
  mtagNotice,
  mtagRechargeHeading,
  mtagRechargeOptions,
  mtagRequiredDocuments,
} from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function MtagSection() {
  return (
    <section
      id="mtag"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green"
      aria-labelledby="mtag-heading"
    >
      <div className="relative overflow-hidden">
        <div className="relative aspect-16/7 w-full sm:aspect-21/8 lg:aspect-21/7">
          <Image
            src={mtagBannerImage}
            alt="M-9 motorway toll plaza — Gateway of Pakistan"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/40 to-secondary/15"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-8 text-center sm:pb-10 lg:pb-12">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/90 sm:text-xs">
              {mtagEyebrow}
            </p>
            <h2
              id="mtag-heading"
              className="mt-2 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
            >
              {mtagHeading}
            </h2>
            <p className="mt-4 max-w-2xl rounded-full border border-amber-300/60 bg-amber-400/95 px-5 py-2 text-[0.7rem] font-bold uppercase tracking-wide text-secondary shadow-lg sm:text-xs">
              {mtagDeadlineBanner}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <motion.p
          className="text-center text-sm leading-relaxed text-slate-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {mtagIntroParagraphs[0]}
        </motion.p>

        <motion.div
          className="mt-6 border-y border-brand-green/25"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid gap-5 py-5 sm:grid-cols-2 sm:gap-8 sm:py-6">
            <div>
              <h3 className="text-sm font-bold text-secondary">{mtagHowToHeading}</h3>
              <p className="mt-1 text-sm text-slate-600">{mtagHowToBody}</p>
              <ul className="mt-2 space-y-1" role="list">
                {mtagRequiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-secondary">{mtagBenefitsHeading}</h3>
              <ul className="mt-2 space-y-1.5" role="list">
                {mtagBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-primary" aria-hidden>
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="border-t border-brand-green/20 py-4 text-sm text-slate-600">{mtagNotice}</p>

          <div className="flex flex-col gap-3 border-t border-brand-green/20 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-secondary">{mtagRechargeHeading}:</span>
              {mtagRechargeOptions.map((option) => (
                <span
                  key={option}
                  className="rounded border border-brand-green/25 bg-white px-2 py-0.5 text-xs font-medium text-secondary"
                >
                  {option}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Helpline{" "}
              <a
                href={`tel:${contactEmergencyNumber}`}
                className="font-bold text-primary transition-colors hover:text-brand-green-dark"
              >
                {contactEmergencyNumber}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
