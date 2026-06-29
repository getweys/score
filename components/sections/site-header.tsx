"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, phoneDisplay } from "@/lib/site-content";
import { navHrefMatchesActiveSection, useActiveSection } from "@/hooks/use-active-section";

const phoneHref = `tel:${phoneDisplay.replace(/-/g, "")}`;
const logoColorSrc = "/images/score-logo-png-01.png";

export interface SiteHeaderProps {
  /** Transparent nav over hero; solid bar after scroll. */
  variant?: "solid" | "overlay";
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection();
  const isOverlay = variant === "overlay";

  useEffect(() => {
    if (!isOverlay) return;
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navOnDark = isOverlay && !scrolled;
  const logoSrc = logoColorSrc;
  const linkClass = (isActive: boolean) =>
    navOnDark
      ? isActive
        ? "text-primary"
        : "text-white/95 hover:text-white"
      : isActive
        ? "text-primary"
        : "text-secondary/90 hover:text-primary";

  const navSurfaceClass = [
    "transition-colors duration-300",
    isOverlay && !scrolled
      ? "border-b border-white/10 bg-transparent text-white"
      : "border-b border-brand-green/20 bg-surface-green text-secondary shadow-sm backdrop-blur-sm",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header
        className={
          isOverlay ? "fixed inset-x-0 top-0 z-50 w-full" : "sticky top-0 z-50"
        }
      >
        <motion.nav
          className={`${navSurfaceClass} transition-colors duration-300`}
          initial={{ y: -6 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: isOverlay ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Primary"
        >
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 lg:grid lg:min-h-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-5 lg:px-5 lg:py-2.5">
            {/* Logo */}
            <motion.div
              className="relative z-2 shrink-0 justify-self-start"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/" className="group block">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Image
                    key={logoSrc}
                    src={logoSrc}
                    alt="SCORE — Business at its Best"
                    width={1000}
                    height={1000}
                    className="h-12 w-auto object-contain sm:h-12 lg:h-13"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop nav links */}
            <div className="hidden justify-center lg:flex">
              <ul className="flex items-center gap-x-0.5 text-[13px] font-medium uppercase leading-snug tracking-[0.07em] lg:gap-x-0.5 lg:text-[13px] lg:tracking-[0.08em]">
                {navLinks.map((item, index) => {
                  const isActive = navHrefMatchesActiveSection({ href: item.href, activeSection, pathname });
                  const className = linkClass(isActive);
                  return (
                    <motion.li
                      key={item.label}
                      className="shrink-0"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`group block whitespace-nowrap rounded-md px-1.5 py-1 transition-colors lg:px-2 lg:py-1.5 ${className}`}
                      >
                        <span className="relative inline-block">
                          <motion.span
                            className="inline-block"
                            whileHover={{ y: -1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 28 }}
                          >
                            {item.label}
                          </motion.span>
                          <span
                            className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ease-out ${isActive
                                ? "w-full opacity-100"
                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                              }`}
                            aria-hidden
                          />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop phone CTA */}
            <motion.div
              className="relative z-2 hidden shrink-0 items-center justify-self-end gap-4 lg:flex lg:gap-5"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-6 w-px shrink-0 bg-zinc-300/80" aria-hidden />
              <motion.a
                href={phoneHref}
                className={`inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium leading-snug transition-colors lg:text-[13px] ${navOnDark ? "text-white/95 hover:text-white" : "text-secondary/90 hover:text-primary"
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
                >
                  <PhoneIcon
                    className={`size-3.5 shrink-0 ${navOnDark ? "text-white/90" : "text-primary"}`}
                  />
                </motion.span>
                <span>{phoneDisplay}</span>
              </motion.a>
            </motion.div>

            {/* Mobile hamburger */}
            <div className="relative z-2 flex shrink-0 items-center justify-end lg:hidden">
              <motion.button
                type="button"
                className={`inline-flex items-center justify-center rounded-lg border p-2 lg:hidden ${menuOpen
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : navOnDark
                      ? "border-white/35 bg-white/10 text-white backdrop-blur-sm"
                      : "border-brand-green/25 text-secondary"
                  }`}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((o) => !o)}
                whileTap={{ scale: 0.92 }}
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                <motion.div
                  animate={{ rotate: menuOpen ? 90 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-999 flex flex-col bg-surface-green lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-brand-green/20 px-4 py-2.5">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src={logoColorSrc}
                  alt="SCORE"
                  width={500}
                  height={177}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>

              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-brand-green/25 text-secondary transition-colors hover:border-primary/40 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-between px-4 py-8 sm:px-6">
              <ul className="flex flex-col">
                {navLinks.map((item, i) => {
                  const isActive = navHrefMatchesActiveSection({
                    href: item.href,
                    activeSection,
                    pathname,
                  });
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.04 + i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`group block py-3.5 text-lg font-semibold tracking-tight transition-colors sm:py-4 sm:text-xl ${isActive ? "text-primary" : "text-secondary/90 hover:text-primary"
                          }`}
                      >
                        <span className="relative inline-block">
                          {item.label}
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full group-hover:opacity-60"
                              }`}
                            aria-hidden
                          />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.a
                href={phoneHref}
                className="inline-flex items-center gap-2.5 border-t border-brand-green/20 pt-6 text-sm font-medium text-secondary transition-colors hover:text-primary"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.25 }}
              >
                <PhoneIcon className="size-3.5 shrink-0 text-primary" />
                {phoneDisplay}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
