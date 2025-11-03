"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import type { PlanType } from "@/types";

interface FeatureGateProps {
  children: React.ReactNode;
  requiredPlan: PlanType[];
  feature: string;
  fallback?: React.ReactNode;
}

export function FeatureGate({
  children,
  requiredPlan,
  feature,
  fallback,
}: FeatureGateProps) {
  const { activeWorkspace } = useAuthStore();

  const hasAccess = activeWorkspace && requiredPlan.includes(activeWorkspace.plan);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Feature Premium</CardTitle>
          <CardDescription>
            {feature} è disponibile solo con i piani{" "}
            {requiredPlan.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" o ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Aggiorna il tuo piano per accedere a questa funzionalità avanzata
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline">Scopri i Piani</Button>
            <Button>Aggiorna Ora</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
