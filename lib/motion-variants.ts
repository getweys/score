import type { Variants } from "framer-motion";

/** Motion without opacity so Tailwind colors (primary red, etc.) never look washed out during scroll. */
export const fadeUp: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { y: 12 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -20 },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Hero / carousel imagery only — opacity is OK here. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04, x: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-60px 0px -60px 0px",
} as const;
