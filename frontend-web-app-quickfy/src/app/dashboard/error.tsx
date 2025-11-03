"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

/**
 * Error boundary for dashboard pages
 * Automatically catches errors in /dashboard routes
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Dashboard error:", error);
    }

    // In production, send to error tracking service
    // Example: Sentry.captureException(error, { tags: { section: 'dashboard' } });
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            <CardTitle className="text-xl">Errore nella Dashboard</CardTitle>
          </div>
          <CardDescription>
            Si è verificato un errore durante il caricamento di questa pagina.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg bg-destructive/10 p-3 space-y-1">
              <p className="font-mono text-xs text-destructive">
                {error.message}
              </p>
              {error.digest && (
                <p className="font-mono text-xs text-muted-foreground">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} size="sm" className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Riprova
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
