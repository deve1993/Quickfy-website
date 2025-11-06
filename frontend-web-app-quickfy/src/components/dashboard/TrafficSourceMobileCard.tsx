"use client";

import { Card } from "@/components/ui/card";
import type { TrafficSource } from "@/types";
import { TrendingUp, Users, MousePointer, Target } from "lucide-react";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface TrafficSourceMobileCardProps {
  source: TrafficSource;
}

export function TrafficSourceMobileCard({ source }: TrafficSourceMobileCardProps) {
  const t = useTranslations("dashboard");

  return (
    <Card className="p-4">
      {/* Source Name */}
      <h3 className="font-semibold text-base mb-3">{source.source}</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Sessions */}
        <div className="flex items-start gap-2">
          <MousePointer className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t("sessions")}</p>
            <p className="font-semibold">{source.sessions.toLocaleString()}</p>
          </div>
        </div>

        {/* Users */}
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t("users")}</p>
            <p className="font-semibold">{source.users.toLocaleString()}</p>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t("bounceRate")}</p>
            <p className="font-semibold">{source.bounceRate}%</p>
          </div>
        </div>

        {/* Conversions */}
        <div className="flex items-start gap-2">
          <Target className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t("conversions")}</p>
            <p className="font-semibold">{source.conversions.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
