"use client";

import { useEffect, useState } from "react";
import { TrendingUp, MousePointerClick, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignsSkeleton } from "@/components/skeletons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CampaignMobileCard } from "@/components/dashboard/CampaignMobileCard";
import { apiClient } from "@/lib/api/client";
import type { Campaign } from "@/types";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await apiClient.getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Errore nel caricamento delle campagne:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <CampaignsSkeleton />;
  }

  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const avgROAS = campaigns.reduce((acc, c) => acc + c.roas, 0) / campaigns.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Campagne Google Ads</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Monitora le performance delle tue campagne pubblicitarie
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Speso</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{totalSpent.toLocaleString("it-IT")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Totali</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalClicks.toLocaleString("it-IT")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversioni</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalConversions.toLocaleString("it-IT")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgROAS.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">
              Return on Ad Spend
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tutte le Campagne</CardTitle>
          <CardDescription>
            Panoramica delle performance per campagna
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campagna</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Speso</TableHead>
                  <TableHead className="text-right">Click</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">ROAS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "success"
                            : campaign.status === "paused"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {campaign.status === "active"
                          ? "Attiva"
                          : campaign.status === "paused"
                          ? "In Pausa"
                          : "Terminata"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      €{campaign.spent.toLocaleString("it-IT")}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.clicks.toLocaleString("it-IT")}
                    </TableCell>
                    <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      {campaign.roas.toFixed(1)}x
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {campaigns.map((campaign) => (
              <CampaignMobileCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
