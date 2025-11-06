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
import type { TopPage } from "@/types";
import { TopPageMobileCard } from "./TopPageMobileCard";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface TopPagesTableProps{
  data: TopPage[];
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export function TopPagesTable({ data }: TopPagesTableProps) {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("topPages")}</CardTitle>
        <CardDescription>
          {t("topPagesDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("page")}</TableHead>
                <TableHead className="text-right">{t("views")}</TableHead>
                <TableHead className="text-right">{t("avgTime")}</TableHead>
                <TableHead className="text-right">{t("bounceRate")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((page, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">{page.path}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {page.views.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDuration(page.avgTime)}
                  </TableCell>
                  <TableCell className="text-right">{page.bounceRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3">
          {data.map((page, index) => (
            <TopPageMobileCard key={index} page={page} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
