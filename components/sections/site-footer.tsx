"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  footerCopyright,
  footerCreditHref,
  footerCreditLabel,
  footerCreditName,
  footerLinks,
  footerTagline,
} from "@/lib/site-content";
import { fadeUp, staggerGallery, viewportOnce } from "@/lib/motion-variants";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/6 bg-secondary text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-primary/20 via-primary to-primary/20"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-10 pt-12 pb-10 sm:gap-12 sm:pt-14 sm:pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-14 lg:pt-16 lg:pb-14"
          variants={staggerGallery}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
            <Link href="/" className="inline-block outline-none ring-offset-2 ring-offset-secondary focus-visible:ring-2 focus-visible:ring-primary">
              <Image
                src="/images/logo-white.png"
                alt="SCORE"
                width={500}
                height={177}
                className="h-auto w-40 object-contain opacity-[0.98] sm:w-48"
                priority={false}
              />
            </Link>
            <p className="mt-5 max-w-xs text-center text-xs leading-relaxed text-white/55 sm:text-sm lg:text-left">{footerTagline}</p>
          </motion.div>

          <motion.nav
            aria-label="Footer legal and policies"
            variants={fadeUp}
            className="flex w-full flex-col items-center lg:w-auto lg:items-end lg:pt-1"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-primary sm:text-xs">Links</p>
            <ul className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 lg:justify-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-white/88 transition-colors hover:bg-white/6 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-4 border-t border-white/10 py-8 text-center text-xs text-white/60 sm:flex-row sm:justify-between sm:gap-6 sm:text-left sm:text-sm lg:py-9"
        >
          <p>{footerCopyright}</p>
          <p>
            {footerCreditLabel}
            <a
              href={footerCreditHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/85 underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary/50"
            >
              {footerCreditName}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
