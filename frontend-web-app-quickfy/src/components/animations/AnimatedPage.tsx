"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "@/lib/animations";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component for page-level animations
 * Adds smooth fade-in transition when navigating between pages
 *
 * @example
 * export default function MyPage() {
 *   return (
 *     <AnimatedPage>
 *       <h1>My Page Content</h1>
 *     </AnimatedPage>
 *   );
 * }
 */
export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
