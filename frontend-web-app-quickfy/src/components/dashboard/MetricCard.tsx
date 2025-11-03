import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import type { MetricValue } from "@/types";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  metric?: MetricValue;
  icon?: React.ReactNode;
  format?: "number" | "currency" | "percentage" | "duration";
}

export function MetricCard({
  title,
  value,
  metric,
  icon,
  format = "number",
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;

    switch (format) {
      case "currency":
        return `€${val.toLocaleString("it-IT")}`;
      case "percentage":
        return `${val}%`;
      case "duration":
        const minutes = Math.floor(val / 60);
        const seconds = val % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      default:
        return val.toLocaleString("it-IT");
    }
  };

  const getTrendIcon = () => {
    if (!metric) return null;

    if (metric.trend === "up") {
      return <ArrowUp className="h-4 w-4 text-green-600" />;
    } else if (metric.trend === "down") {
      return <ArrowDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (!metric) return "text-muted-foreground";

    // Per bounce rate, il trend è invertito (down è buono)
    const isInverted = title.toLowerCase().includes("bounce");

    if (metric.trend === "up") {
      return isInverted ? "text-red-600" : "text-green-600";
    } else if (metric.trend === "down") {
      return isInverted ? "text-green-600" : "text-red-600";
    }
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {metric && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {getTrendIcon()}
            <span className={cn("font-medium", getTrendColor())}>
              {metric.change > 0 ? "+" : ""}
              {metric.change}%
            </span>
            <span>rispetto al mese scorso</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
