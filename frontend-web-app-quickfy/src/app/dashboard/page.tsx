"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, MousePointerClick, Clock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SessionsChart } from "@/components/dashboard/SessionsChart";
import { TrafficSourcesTable } from "@/components/dashboard/TrafficSourcesTable";
import { TopPagesTable } from "@/components/dashboard/TopPagesTable";
import { DashboardSkeleton } from "@/components/skeletons";
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { apiClient } from "@/lib/api/client";
import type { DashboardMetrics, TrafficSource, TopPage } from "@/types";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, trafficData, pagesData] = await Promise.all([
          apiClient.getDashboardMetrics(),
          apiClient.getTrafficSources(),
          apiClient.getTopPages(),
        ]);

        setMetrics(metricsData);
        setTrafficSources(trafficData);
        setTopPages(pagesData);
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <AnimatedPage className="space-y-4 md:space-y-6">
      <FadeIn direction="down">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Benvenuto, {user?.name}! Ecco una panoramica delle tue metriche.
        </p>
      </FadeIn>

      {/* KPI Cards */}
      <StaggerContainer className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
        <StaggerItem>
          <MetricCard
            title="Sessioni Totali"
            value={metrics?.sessions.current || 0}
            metric={metrics?.sessions}
            icon={<Users className="h-4 w-4" />}
          />
        </StaggerItem>
        <StaggerItem>
          <MetricCard
            title="Utenti"
            value={metrics?.users.current || 0}
            metric={metrics?.users}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </StaggerItem>
        <StaggerItem>
          <MetricCard
            title="Conversioni"
            value={metrics?.conversions.current || 0}
            metric={metrics?.conversions}
            icon={<MousePointerClick className="h-4 w-4" />}
          />
        </StaggerItem>
        <StaggerItem>
          <MetricCard
            title="Bounce Rate"
            value={metrics?.bounceRate.current || 0}
            metric={metrics?.bounceRate}
            icon={<Clock className="h-4 w-4" />}
            format="percentage"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Sessions Chart */}
      <FadeIn direction="up" delay={0.5}>
        <SessionsChart />
      </FadeIn>

      {/* Tables */}
      <FadeIn direction="up" delay={0.6}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <TrafficSourcesTable data={trafficSources} />
          <TopPagesTable data={topPages} />
        </div>
      </FadeIn>
    </AnimatedPage>
  );
}
