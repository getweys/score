"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  footerCopyright,
  footerCreditHref,
  footerCreditLabel,
  footerCreditName,
  footerLinks,
} from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Image
            src="/images/logo-white.png"
            alt="SCORE"
            width={500}
            height={177}
            className="h-auto w-44 object-contain sm:w-52"
          />
        </motion.div>
        <motion.nav
          aria-label="Footer"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          <ul className="flex flex-col items-center gap-3 text-sm font-medium sm:flex-row sm:gap-8">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-white/85 transition hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
        <motion.div
          className="flex w-full max-w-3xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/70 sm:flex-row sm:text-sm"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <p>{footerCopyright}</p>
          <p>
            {footerCreditLabel}
            <a
              href={footerCreditHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline decoration-white/30 underline-offset-2 transition hover:text-white"
            >
              {footerCreditName}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
