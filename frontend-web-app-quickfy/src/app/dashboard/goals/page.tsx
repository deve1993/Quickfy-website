"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { GenericPageSkeleton } from "@/components/skeletons";
import { NoGoalsEmptyState } from "@/components/empty-states";
import { apiClient } from "@/lib/api/client";
import type { Goal } from "@/types";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await apiClient.getGoals();
        setGoals(data);
      } catch (error) {
        console.error("Errore nel caricamento degli obiettivi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return <GenericPageSkeleton showTable={false} />;
  }

  const activeGoals = goals.filter((g) => g.status !== "achieved");
  const achievedGoals = goals.filter((g) => g.status === "achieved");
  const onTrack = goals.filter((g) => g.status === "on_track").length;
  const atRisk = goals.filter((g) => g.status === "at_risk").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Obiettivi & KPI</h1>
          <p className="text-muted-foreground">
            Monitora e gestisci i tuoi obiettivi aziendali
          </p>
        </div>
        <Link href="/dashboard/goals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Obiettivo
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obiettivi Attivi</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGoals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Linea</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTrack}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Rischio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{atRisk}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{achievedGoals.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Obiettivi Attivi</h2>
            <p className="text-sm text-muted-foreground">
              {activeGoals.length} obiettivi in corso
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {activeGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      )}

      {/* Achieved Goals */}
      {achievedGoals.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Obiettivi Completati</h2>
            <p className="text-sm text-muted-foreground">
              {achievedGoals.length} obiettivi raggiunti
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {achievedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && <NoGoalsEmptyState />}
    </div>
  );
}
