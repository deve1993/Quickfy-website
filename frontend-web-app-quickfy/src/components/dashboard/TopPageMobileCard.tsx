import { Card } from "@/components/ui/card";
import type { TopPage } from "@/types";
import { Eye, Clock, TrendingUp } from "lucide-react";

interface TopPageMobileCardProps {
  page: TopPage;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export function TopPageMobileCard({ page }: TopPageMobileCardProps) {
  return (
    <Card className="p-4">
      {/* Page Title */}
      <div className="mb-3">
        <h3 className="font-semibold text-base line-clamp-1">{page.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{page.path}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {/* Views */}
        <div className="flex flex-col items-center text-center">
          <Eye className="h-4 w-4 text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground">Views</p>
          <p className="font-semibold">{page.views.toLocaleString("it-IT")}</p>
        </div>

        {/* Avg Time */}
        <div className="flex flex-col items-center text-center">
          <Clock className="h-4 w-4 text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground">Tempo</p>
          <p className="font-semibold">{formatDuration(page.avgTime)}</p>
        </div>

        {/* Bounce Rate */}
        <div className="flex flex-col items-center text-center">
          <TrendingUp className="h-4 w-4 text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground">Bounce</p>
          <p className="font-semibold">{page.bounceRate}%</p>
        </div>
      </div>
    </Card>
  );
}
