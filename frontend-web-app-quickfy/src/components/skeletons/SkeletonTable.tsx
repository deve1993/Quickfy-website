import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

/**
 * Skeleton component for data tables
 * Used for loading states of table data
 */
export function SkeletonTable({
  rows = 5,
  columns = 5,
  showHeader = true
}: SkeletonTableProps) {
  return (
    <Table>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Skeleton for table wrapped in a card
 */
export function SkeletonTableCard({
  title,
  description,
  rows = 5,
  columns = 5,
}: {
  title?: string;
  description?: string;
  rows?: number;
  columns?: number;
}) {
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
        {/* Desktop Table */}
        <div className="hidden md:block">
          <SkeletonTable rows={rows} columns={columns} />
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
