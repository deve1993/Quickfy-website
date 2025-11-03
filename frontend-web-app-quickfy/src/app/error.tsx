"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Global error boundary for the entire app
 * Automatically catches all errors in the app directory
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("App error:", error);
    }

    // In production, send to error tracking service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <CardTitle className="text-2xl">Si è verificato un errore</CardTitle>
          </div>
          <CardDescription>
            Qualcosa non ha funzionato correttamente. Ci scusiamo per l'inconveniente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg bg-destructive/10 p-4 space-y-2">
              <p className="font-mono text-sm text-destructive font-semibold">
                {error.message}
              </p>
              {error.digest && (
                <p className="font-mono text-xs text-muted-foreground">
                  Error Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Riprova
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Torna alla Home
            </Button>
          </div>

          {process.env.NODE_ENV === "production" && (
            <p className="text-sm text-muted-foreground">
              Se il problema persiste, contatta il supporto tecnico.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
