import { SkeletonPageHeader } from "./SkeletonText";
import { SkeletonCardGrid } from "./SkeletonCard";
import { SkeletonTableCard } from "./SkeletonTable";

interface GenericPageSkeletonProps {
  showHeader?: boolean;
  showCards?: boolean;
  cardCount?: number;
  showTable?: boolean;
  tableRows?: number;
  tableColumns?: number;
}

/**
 * Generic page skeleton for reusable loading states
 * Can be customized with props to match different page layouts
 */
export function GenericPageSkeleton({
  showHeader = true,
  showCards = true,
  cardCount = 4,
  showTable = true,
  tableRows = 5,
  tableColumns = 5,
}: GenericPageSkeletonProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {showHeader && <SkeletonPageHeader />}
      {showCards && <SkeletonCardGrid count={cardCount} />}
      {showTable && <SkeletonTableCard rows={tableRows} columns={tableColumns} />}
    </div>
  );
}
