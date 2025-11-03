"use client";

import { useEffect } from "react";

/**
 * Global error handler for root layout errors
 * This catches errors that occur in the root layout itself
 * Must define its own <html> and <body> tags
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Global error:", error);
    }

    // In production, send to error tracking service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}>
          <div style={{
            maxWidth: "32rem",
            width: "100%",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            backgroundColor: "white",
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <h1 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#ef4444",
              }}>
                ⚠️ Errore Critico
              </h1>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Si è verificato un errore grave nell'applicazione.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div style={{
                padding: "1rem",
                backgroundColor: "#fef2f2",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
              }}>
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  color: "#ef4444",
                }}>
                  {error.message}
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                🔄 Riprova
              </button>
              <button
                onClick={() => window.location.href = "/"}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "white",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                🏠 Home
              </button>
            </div>

            {process.env.NODE_ENV === "production" && (
              <p style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}>
                Se il problema persiste, contatta il supporto tecnico.
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
