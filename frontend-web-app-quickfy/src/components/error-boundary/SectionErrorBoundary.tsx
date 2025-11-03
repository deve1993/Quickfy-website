"use client";

import { ErrorBoundary } from "./ErrorBoundary";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  /** Section name for error messages */
  sectionName?: string;
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * SectionErrorBoundary for wrapping smaller UI sections
 * Shows a compact error UI that doesn't take over the whole page
 *
 * @example
 * <SectionErrorBoundary sectionName="Dashboard Metrics">
 *   <MetricsCards />
 * </SectionErrorBoundary>
 */
export function SectionErrorBoundary({
  children,
  sectionName = "questa sezione",
  onError,
}: SectionErrorBoundaryProps) {
  return (
    <ErrorBoundary
      onError={onError}
      fallback={
        <Card className="border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              Errore nel caricamento di {sectionName}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Si è verificato un errore durante il caricamento di questa sezione.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Ricarica Pagina
            </Button>
          </CardContent>
        </Card>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
