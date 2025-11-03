"use client";

import { ErrorBoundary } from "./ErrorBoundary";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface InlineErrorBoundaryProps {
  children: ReactNode;
  /** Fallback message */
  message?: string;
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * InlineErrorBoundary for very small components
 * Shows minimal inline error message without taking up much space
 *
 * @example
 * <InlineErrorBoundary message="Failed to load user avatar">
 *   <UserAvatar />
 * </InlineErrorBoundary>
 */
export function InlineErrorBoundary({
  children,
  message = "Errore di caricamento",
  onError,
}: InlineErrorBoundaryProps) {
  return (
    <ErrorBoundary
      onError={onError}
      fallback={
        <div className="flex items-center gap-2 text-sm text-destructive py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
