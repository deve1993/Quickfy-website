import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonChartProps {
  title?: string;
  description?: string;
  height?: string;
}

/**
 * Skeleton component for chart/graph areas
 * Used for loading states of data visualizations
 */
export function SkeletonChart({
  title,
  description,
  height = "h-80"
}: SkeletonChartProps) {
  return (
    <Card>
      <CardHeader>
        {title ? (
          <CardTitle>{title}</CardTitle>
        ) : (
          <Skeleton className="h-6 w-40" />
        )}
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : (
          <Skeleton className="h-4 w-64" />
        )}
      </CardHeader>
      <CardContent>
        <Skeleton className={`w-full ${height}`} />
      </CardContent>
    </Card>
  );
}
