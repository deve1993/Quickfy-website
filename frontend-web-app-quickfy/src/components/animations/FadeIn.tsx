"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { fadeIn, fadeInUp, fadeInDown } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  /** Animation direction */
  direction?: "none" | "up" | "down";
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Custom className */
  className?: string;
  /** Additional motion props */
  motionProps?: Omit<MotionProps, "children">;
}

/**
 * Wrapper component for fade-in animations
 * Provides easy fade-in effects with optional directions
 *
 * @example
 * <FadeIn direction="up" delay={0.2}>
 *   <Card>Content</Card>
 * </FadeIn>
 */
export function FadeIn({
  children,
  direction = "none",
  delay = 0,
  className,
  motionProps,
}: FadeInProps) {
  const getVariant = () => {
    switch (direction) {
      case "up":
        return fadeInUp;
      case "down":
        return fadeInDown;
      default:
        return fadeIn;
    }
  };

  const variants = getVariant();
  const customVariants = delay > 0 ? {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay,
      },
    },
  } : variants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={customVariants}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
