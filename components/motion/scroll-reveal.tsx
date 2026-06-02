"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  clipReveal,
  fadeUp,
  headerStagger,
  imageReveal,
  riseSoft,
  staggerContainer,
  staggerRows,
  viewportOnce,
} from "@/lib/motion-variants";

type RevealVariant = "fade" | "rise" | "image" | "clip";

const revealVariants: Record<RevealVariant, Variants> = {
  fade: fadeUp,
  rise: riseSoft,
  image: imageReveal,
  clip: clipReveal,
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}

export function ScrollReveal({ children, className, variant = "fade" }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  rows?: boolean;
}

export function ScrollStagger({ children, className, rows = false }: ScrollStaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={rows ? staggerRows : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

interface ScrollHeaderProps {
  children: ReactNode;
  className?: string;
  animateOnMount?: boolean;
}

export function ScrollHeader({ children, className, animateOnMount = false }: ScrollHeaderProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={headerStagger}
      initial="hidden"
      {...(animateOnMount ? { animate: "visible" } : { whileInView: "visible", viewport: viewportOnce })}
    >
      {children}
    </motion.div>
  );
}
