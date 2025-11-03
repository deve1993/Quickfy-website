"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { hoverScale, tapScale } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Animation type */
  animationType?: "scale" | "none";
  /** Custom className */
  className?: string;
}

/**
 * Button with built-in hover and tap animations
 * Provides micro-interactions for better UX
 *
 * @example
 * <AnimatedButton onClick={handleClick}>
 *   Click Me
 * </AnimatedButton>
 */
export function AnimatedButton({
  children,
  disableAnimation = false,
  animationType = "scale",
  className,
  disabled,
  ...props
}: AnimatedButtonProps) {
  if (disableAnimation || disabled) {
    return (
      <button className={cn(className)} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  const getAnimations = () => {
    if (animationType === "scale") {
      return {
        whileHover: hoverScale,
        whileTap: tapScale,
      };
    }
    return {};
  };

  return (
    <motion.button
      className={cn(className)}
      {...getAnimations()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
