import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Goal, GoalStatus } from "@/types";
import { Calendar, Target, TrendingUp } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
}

const statusVariant: Record<GoalStatus, "success" | "warning" | "destructive" | "default"> = {
  on_track: "success",
  at_risk: "warning",
  behind: "destructive",
  achieved: "default",
};

const statusLabel: Record<GoalStatus, string> = {
  on_track: "In linea",
  at_risk: "A rischio",
  behind: "In ritardo",
  achieved: "Completato",
};

export function GoalCard({ goal }: GoalCardProps) {
  const progressColor = () => {
    if (goal.progress >= 100) return "bg-green-500";
    if (goal.progress >= 75) return "bg-blue-500";
    if (goal.progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-base md:text-lg line-clamp-2">{goal.name}</CardTitle>
            <CardDescription className="line-clamp-3 text-xs md:text-sm">{goal.description}</CardDescription>
          </div>
          <Badge variant={statusVariant[goal.status]} className="shrink-0">
            {statusLabel[goal.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progresso</span>
            <span className="text-muted-foreground">{goal.progress.toFixed(1)}%</span>
          </div>
          <Progress value={goal.progress} className={cn("h-2", progressColor())} />
        </div>

        {/* Current vs Target */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Attuale:</span>
            <span className="font-semibold">{goal.currentValue.toLocaleString("it-IT")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Obiettivo:</span>
            <span className="font-semibold">{goal.targetValue.toLocaleString("it-IT")}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(goal.startDate).toLocaleDateString("it-IT")} -{" "}
            {new Date(goal.endDate).toLocaleDateString("it-IT")}
          </span>
        </div>

        {/* Owner */}
        {goal.owner && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {goal.owner.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <span className="text-muted-foreground">{goal.owner.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper per importare cn
import { cn } from "@/lib/utils";
