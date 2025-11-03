"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Skip Link Component
 *
 * Allows keyboard users to skip repetitive navigation and jump directly to main content.
 * Only visible when focused (Tab key), improving accessibility for screen readers and keyboard navigation.
 *
 * WCAG 2.1 Level A Requirement: Bypass Blocks (2.4.1)
 *
 * @example
 * ```tsx
 * // In root layout
 * <body>
 *   <SkipLink href="#main-content" />
 *   <Header />
 *   <main id="main-content" tabIndex={-1}>
 *     {children}
 *   </main>
 * </body>
 * ```
 */

interface SkipLinkProps {
  /**
   * Target anchor (e.g., "#main-content")
   */
  href: string;
  /**
   * Link text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkipLink({
  href,
  children = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        // Hidden by default
        "sr-only",
        // Visible when focused
        "focus:not-sr-only",
        "focus:absolute focus:top-4 focus:left-4 focus:z-[9999]",
        // Styling
        "bg-primary text-primary-foreground",
        "px-4 py-2 rounded-md",
        "font-medium text-sm",
        "shadow-lg",
        // Focus styles
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          (target as HTMLElement).focus();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Skip Links Container
 *
 * Multiple skip links for complex layouts
 *
 * @example
 * ```tsx
 * <SkipLinks>
 *   <SkipLink href="#main-content">Skip to main content</SkipLink>
 *   <SkipLink href="#navigation">Skip to navigation</SkipLink>
 *   <SkipLink href="#footer">Skip to footer</SkipLink>
 * </SkipLinks>
 * ```
 */
export function SkipLinks({ children }: { children: React.ReactNode }) {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[9999] flex flex-col gap-2">
      {children}
    </div>
  );
}
