"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Viewport offset at which animation begins (0 = top of viewport, 1 = bottom) */
  start?: number;
  /** Y offset in pixels at the start of animation */
  yOffset?: number;
  /** Scale at the start of animation (1 = no scale) */
  scaleFrom?: number;
  /** How much of the element must scroll before animation completes */
  duration?: number;
}

/**
 * Scroll-driven reveal wrapper. Children fade up + scale + blur into view
 * as the element enters the viewport — directly tied to scroll position
 * for buttery smooth motion.
 */
export function ScrollReveal({
  children,
  className = "",
  start = 0.95,
  yOffset = 100,
  scaleFrom = 0.92,
  duration = 0.4,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `start ${start - duration}`],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const filterStr = useTransform(blur, (v) => (v > 0.1 ? `blur(${v}px)` : "none"));

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, filter: filterStr }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Speed multiplier — positive = moves slower (parallax), negative = moves faster */
  speed?: number;
}

/**
 * Subtle parallax wrapper. Content drifts at a different rate than scroll
 * for depth. Use sparingly on ambient/decorative elements.
 */
export function ScrollParallax({
  children,
  className = "",
  speed = 0.15,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
