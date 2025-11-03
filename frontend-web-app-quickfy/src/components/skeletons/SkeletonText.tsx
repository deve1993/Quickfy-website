import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/**
 * Skeleton component for text content
 * Used for loading states of paragraphs and text blocks
 */
export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${
            i === lines - 1 ? "w-2/3" : "w-full"
          } mb-2`}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for page header with title and description
 */
export function SkeletonPageHeader() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-5 w-96" />
    </div>
  );
}
