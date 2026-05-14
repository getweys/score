"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  emailDisplay,
  navLinks,
  phoneDisplay,
  topBarTaglineDesktop,
  topBarTaglineMobile,
} from "@/lib/site-content";

const phoneHref = `tel:${phoneDisplay.replace(/-/g, "")}`;
const mailHref = `mailto:${emailDisplay}`;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        className="bg-secondary text-white/95"
        initial={{ y: -12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p className="text-center text-white/90 sm:text-left">
            <span className="hidden lg:inline">{topBarTaglineDesktop}</span>
            <span className="lg:hidden">{topBarTaglineMobile}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:justify-end">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <PhoneIcon className="size-3.5 shrink-0 text-primary" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <MailIcon className="size-3.5 shrink-0 text-primary" />
              <span>{emailDisplay}</span>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.nav
        className="border-b border-zinc-200/80 bg-white/95 text-secondary shadow-sm backdrop-blur-md"
        initial={{ y: -6 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:py-4">
          <Link href="/" className="relative block w-36 shrink-0 sm:w-44 lg:w-52">
            <Image
              src="/images/score-logo-png-01.png"
              alt="SCORE"
              width={636}
              height={231}
              className="h-auto w-full object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-medium text-secondary xl:flex">
            {navLinks.map((item) => {
              const isHash = item.href.startsWith("#");
              const isActive = item.href === "/";
              const className = isActive
                ? "text-primary"
                : "text-secondary/90 hover:text-primary";
              return (
                <li key={item.label}>
                  {isHash ? (
                    <Link
                      href={item.href}
                      className={`rounded-full px-3 py-2 transition-colors ${className}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`rounded-full px-3 py-2 transition-colors ${className}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden shrink-0 xl:block">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-shadow hover:shadow-lg hover:shadow-primary/30"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 p-2.5 text-secondary xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-nav"
              className="border-t border-zinc-100 bg-white xl:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-1 px-4 py-4 text-sm font-medium">
                {navLinks.map((item) => {
                  const isHash = item.href.startsWith("#");
                  return (
                    <li key={`m-${item.label}`}>
                      {isHash ? (
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 text-secondary hover:bg-zinc-50 hover:text-primary"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 text-secondary hover:bg-zinc-50 hover:text-primary"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
                <li className="pt-2">
                  <motion.a
                    href="#contact"
                    className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-white"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Get in Touch
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
