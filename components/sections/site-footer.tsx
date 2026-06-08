"use client";

import Image from "next/image";
import Link from "next/link";
import {
  footerCopyright,
  footerCreditHref,
  footerCreditLabel,
  footerCreditName,
  footerLinks,
  footerTagline,
} from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/30 bg-brand-green-dark text-on-green-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 py-10 sm:py-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="SCORE"
                width={500}
                height={177}
                className="h-auto w-32 object-contain sm:w-36"
                priority={false}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-green-dark/75">{footerTagline}</p>
          </div>

          <nav aria-label="Footer legal and policies" className="lg:pt-2">
            <ul className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block px-2 py-1.5 text-sm text-on-green-dark/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/10 py-6 text-center text-xs text-on-green-dark/60 sm:flex-row sm:justify-between sm:text-left sm:text-sm">
          <p>{footerCopyright}</p>
          <p>
            {footerCreditLabel}
            <a
              href={footerCreditHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-green-dark/85 transition-colors hover:text-white"
            >
              {footerCreditName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
