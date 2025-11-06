"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/lib/i18n/useTranslations";

const data = [
  { date: "01 Nov", sessions: 4200, users: 3100 },
  { date: "02 Nov", sessions: 4500, users: 3300 },
  { date: "03 Nov", sessions: 4100, users: 3000 },
  { date: "04 Nov", sessions: 5200, users: 3800 },
  { date: "05 Nov", sessions: 4900, users: 3600 },
  { date: "06 Nov", sessions: 5400, users: 4000 },
  { date: "07 Nov", sessions: 5100, users: 3700 },
  { date: "08 Nov", sessions: 5800, users: 4200 },
  { date: "09 Nov", sessions: 5500, users: 4000 },
  { date: "10 Nov", sessions: 6200, users: 4500 },
  { date: "11 Nov", sessions: 5900, users: 4300 },
  { date: "12 Nov", sessions: 6500, users: 4800 },
  { date: "13 Nov", sessions: 6100, users: 4400 },
  { date: "14 Nov", sessions: 6800, users: 5000 },
];

export function SessionsChart() {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("trafficTrend")}</CardTitle>
        <CardDescription>{t("trafficTrendDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorSessions)"
                name={t("sessions")}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorUsers)"
                name={t("users")}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
