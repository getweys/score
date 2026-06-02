import type { Variants } from "framer-motion";

/** Shared easing — smooth deceleration for scroll-triggered motion */
export const easeSmooth = [0.2, 0.85, 0.38, 1] as const;

/** Section enters when ~18% visible — smooth, not abrupt */
export const viewportOnce = {
  once: true,
  margin: "-56px 0px -48px 0px",
  amount: 0.18,
} as const;

/** List rows — trigger a bit earlier per item */
export const viewportRow = {
  once: true,
  margin: "-32px 0px -24px 0px",
  amount: 0.28,
} as const;

/** Hero / above-the-fold — fires quickly */
export const viewportHero = {
  once: true,
  margin: "0px 0px -16% 0px",
  amount: 0.32,
} as const;

/** Motion without opacity so Tailwind colors (primary red, etc.) never look washed out during scroll. */
export const fadeUp: Variants = {
  hidden: { y: 36 },
  visible: {
    y: 0,
    transition: { duration: 0.68, ease: easeSmooth },
  },
};

/** Headings / page titles — subtle blur + lift */
export const fadeUpBlur: Variants = {
  hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeSmooth },
  },
};

export const fadeIn: Variants = {
  hidden: { y: 18 },
  visible: {
    y: 0,
    transition: { duration: 0.58, ease: easeSmooth },
  },
};

/** Two-column blocks — contact form, media columns */
export const slideInLeft: Variants = {
  hidden: { x: -32, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 32, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

/** Tighter stagger for icon rows / dense lists */
export const staggerTight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

/** Accordion / report rows */
export const staggerRows: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Gallery rows — slightly slower cascade */
export const staggerGallery: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.08 },
  },
};

/** Individual gallery tiles — masked motion so photos read crisp on enter */
export const galleryTile: Variants = {
  hidden: { y: 40, scale: 0.96 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: easeSmooth },
  },
};

/** Split eyebrow → title → intro */
export const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Cards / portraits — subtle lift from below */
export const riseSoft: Variants = {
  hidden: { y: 28, scale: 0.97 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeSmooth },
  },
};

/** List rows (services, financial, about pillars) */
export const listRowReveal: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.62, ease: easeSmooth },
  },
};

/** Full-bleed imagery — map, hero photo */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 12% 0)", y: 16 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.9, ease: easeSmooth },
  },
};

/** Hero / carousel imagery only — opacity is OK here. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easeSmooth },
  },
};
