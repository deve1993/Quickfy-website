import { SkeletonPageHeader } from "./SkeletonText";
import { SkeletonCardGrid } from "./SkeletonCard";
import { SkeletonTableCard } from "./SkeletonTable";

/**
 * Full page skeleton for Campaigns page loading state
 * Matches the layout of the campaigns page
 */
export function CampaignsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SkeletonPageHeader />

      {/* Stats Cards */}
      <SkeletonCardGrid count={4} />

      {/* Campaigns Table */}
      <SkeletonTableCard rows={6} columns={6} />
    </div>
  );
}
