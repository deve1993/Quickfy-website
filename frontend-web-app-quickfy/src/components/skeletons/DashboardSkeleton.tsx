import { SkeletonPageHeader } from "./SkeletonText";
import { SkeletonCardGrid } from "./SkeletonCard";
import { SkeletonChart } from "./SkeletonChart";
import { SkeletonTableCard } from "./SkeletonTable";

/**
 * Full page skeleton for Dashboard loading state
 * Matches the layout of the main dashboard page
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <SkeletonPageHeader />

      {/* KPI Cards */}
      <SkeletonCardGrid count={4} />

      {/* Sessions Chart */}
      <SkeletonChart height="h-80" />

      {/* Tables */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <SkeletonTableCard rows={5} columns={3} />
        <SkeletonTableCard rows={5} columns={3} />
      </div>
    </div>
  );
}
