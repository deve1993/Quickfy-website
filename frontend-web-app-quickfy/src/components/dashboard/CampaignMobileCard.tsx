import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, MousePointerClick, TrendingUp } from "lucide-react";
import type { Campaign } from "@/types";

interface CampaignMobileCardProps {
  campaign: Campaign;
}

const statusConfig = {
  active: { label: "Attiva", variant: "success" as const },
  paused: { label: "In Pausa", variant: "warning" as const },
  ended: { label: "Terminata", variant: "secondary" as const },
};

export function CampaignMobileCard({ campaign }: CampaignMobileCardProps) {
  return (
    <Card className="p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base line-clamp-2 mb-1">{campaign.name}</h3>
        </div>
        <Badge variant={statusConfig[campaign.status].variant} className="shrink-0 ml-2">
          {statusConfig[campaign.status].label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Speso</p>
            <p className="font-semibold">€{campaign.spent.toLocaleString("it-IT")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Click</p>
            <p className="font-semibold">{campaign.clicks.toLocaleString("it-IT")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">CTR</p>
            <p className="font-semibold">{campaign.ctr.toFixed(2)}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 flex items-center justify-center text-green-600 font-bold shrink-0">
            R
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ROAS</p>
            <p className="font-semibold text-green-600">{campaign.roas.toFixed(1)}x</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
