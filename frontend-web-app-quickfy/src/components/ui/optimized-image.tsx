import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Optimized Image Component
 *
 * A wrapper around next/image with best practices and sensible defaults.
 * Automatically handles:
 * - Lazy loading
 * - Responsive images
 * - AVIF/WebP optimization
 * - Proper aspect ratios
 * - Loading states
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/logo.png"
 *   alt="Company Logo"
 *   width={200}
 *   height={50}
 * />
 * ```
 */

interface OptimizedImageProps extends Omit<ImageProps, "loading"> {
  /**
   * Whether to use priority loading (disable lazy loading)
   * Use for above-the-fold images
   */
  priority?: boolean;
  /**
   * Custom loading state className
   */
  loadingClassName?: string;
  /**
   * Whether to add a subtle loading blur effect
   */
  withBlur?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  loadingClassName,
  priority = false,
  withBlur = true,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      placeholder={withBlur ? "blur" : undefined}
      blurDataURL={
        withBlur
          ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
          : undefined
      }
      className={cn(
        "transition-opacity duration-300",
        loadingClassName,
        className
      )}
      {...props}
    />
  );
}

/**
 * Avatar Image Component
 * Specialized for user avatars with fallback
 */
interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  fallback,
}: AvatarImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium",
          className
        )}
        style={{ width: size, height: size, fontSize: size / 2.5 }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      withBlur={false}
    />
  );
}

/**
 * Logo Image Component
 * Specialized for logos with proper sizing and priority
 */
interface LogoImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function LogoImage({
  src,
  alt = "Logo",
  width,
  height,
  className,
  priority = true,
}: LogoImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      withBlur={false}
      className={cn("object-contain", className)}
    />
  );
}

/**
 * Responsive Hero Image Component
 * For large hero/banner images with responsive sizing
 */
interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function HeroImage({
  src,
  alt,
  priority = true,
  className,
}: HeroImageProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
    </div>
  );
}
