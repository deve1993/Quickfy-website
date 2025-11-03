import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  showIcon?: boolean;
  showDescription?: boolean;
}

/**
 * Skeleton component for metric/stat cards
 * Used in dashboards and overview pages
 */
export function SkeletonCard({ showIcon = false, showDescription = false }: SkeletonCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        {showIcon && <Skeleton className="h-4 w-4" />}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        {showDescription && <Skeleton className="h-3 w-32" />}
      </CardContent>
    </Card>
  );
}

/**
 * Grid of skeleton cards for dashboard metrics
 */
export function SkeletonCardGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} showIcon />
      ))}
    </div>
  );
}
