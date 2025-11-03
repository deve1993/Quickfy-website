import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCardGrid } from "./SkeletonCard";
import { SkeletonTableCard } from "./SkeletonTable";

/**
 * Full page skeleton for Tickets page loading state
 * Matches the layout of the tickets list page
 */
export function TicketsSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>

      {/* Stats Cards */}
      <SkeletonCardGrid count={3} />

      {/* Tickets Table with Search */}
      <SkeletonTableCard rows={6} columns={6} />
    </div>
  );
}
