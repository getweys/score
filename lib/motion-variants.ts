import type { Variants } from "framer-motion";

/** Shared easing — smooth deceleration for scroll-triggered motion */
export const easeSmooth = [0.2, 0.85, 0.38, 1] as const;

/** Softer viewport triggers (scroll-linked, less “snap”) */
export const viewportOnce = {
  once: true,
  margin: "-72px 0px -52px 0px",
  amount: 0.22,
} as const;

/** Hero / above-the-fold — fires quickly */
export const viewportHero = {
  once: true,
  margin: "0px 0px -20% 0px",
  amount: 0.35,
} as const;

/** Motion without opacity so Tailwind colors (primary red, etc.) never look washed out during scroll. */
export const fadeUp: Variants = {
  hidden: { y: 28 },
  visible: {
    y: 0,
    transition: { duration: 0.58, ease: easeSmooth },
  },
};

export const fadeIn: Variants = {
  hidden: { y: 14 },
  visible: {
    y: 0,
    transition: { duration: 0.52, ease: easeSmooth },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Tighter stagger for icon rows / dense lists */
export const staggerTight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Gallery rows — slightly slower cascade */
export const staggerGallery: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

/** Split eyebrow → title → intro */
export const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.07 },
  },
};

/** Cards / portraits — subtle lift from below */
export const riseSoft: Variants = {
  hidden: { y: 22, scale: 0.98 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

/** Hero / carousel imagery only — opacity is OK here. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.05, ease: easeSmooth },
  },
};
