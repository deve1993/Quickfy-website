"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number;
  /** Custom className */
  className?: string;
}

/**
 * Container for stagger animations
 * Children will animate in sequence with a delay between each
 *
 * @example
 * <StaggerContainer staggerDelay={0.1}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  const customVariants = {
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * Individual item for stagger animations
 * Must be used inside a StaggerContainer
 *
 * @example
 * <StaggerContainer>
 *   <StaggerItem><Card>Item 1</Card></StaggerItem>
 *   <StaggerItem><Card>Item 2</Card></StaggerItem>
 * </StaggerContainer>
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
