"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TrafficSource } from "@/types";
import { TrafficSourceMobileCard } from "./TrafficSourceMobileCard";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface TrafficSourcesTableProps {
  data: TrafficSource[];
}

export function TrafficSourcesTable({ data }: TrafficSourcesTableProps) {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("trafficSources")}</CardTitle>
        <CardDescription>
          {t("trafficSourcesDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("source")}</TableHead>
                <TableHead className="text-right">{t("sessions")}</TableHead>
                <TableHead className="text-right">{t("users")}</TableHead>
                <TableHead className="text-right">{t("bounceRate")}</TableHead>
                <TableHead className="text-right">{t("conversions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((source, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{source.source}</TableCell>
                  <TableCell className="text-right">
                    {source.sessions.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right">
                    {source.users.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right">{source.bounceRate}%</TableCell>
                  <TableCell className="text-right">
                    {source.conversions.toLocaleString("it-IT")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3">
          {data.map((source, index) => (
            <TrafficSourceMobileCard key={index} source={source} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
