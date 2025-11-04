/**
 * Advanced Mode Toggle Component
 *
 * Allows users to switch between Simple and Advanced mode
 * for Brand DNA configuration.
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Sparkles } from "lucide-react";

const STORAGE_KEY = "brand-advanced-mode";

interface AdvancedModeToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

/**
 * Advanced Mode Toggle Component
 */
export function AdvancedModeToggle({
  value,
  onChange,
}: AdvancedModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={value ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(!value)}
        className="gap-2"
        title={
          value
            ? "Modalità Avanzata: Accesso completo a tutte le configurazioni"
            : "Modalità Semplice: Solo le opzioni essenziali"
        }
      >
        {value ? (
          <>
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Modalità Avanzata</span>
            <Badge variant="secondary" className="ml-1 text-xs hidden sm:inline-flex">
              Pro
            </Badge>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Modalità Semplice</span>
          </>
        )}
      </Button>
    </div>
  );
}

/**
 * Hook for managing advanced mode state with localStorage persistence
 */
export function useAdvancedMode() {
  const [advancedMode, setAdvancedMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setAdvancedMode(stored === "true");
      }
    } catch (error) {
      console.error("Failed to load advanced mode from localStorage:", error);
    }
  }, []);

  // Save to localStorage on change
  const handleChange = (value: boolean) => {
    setAdvancedMode(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch (error) {
      console.error("Failed to save advanced mode to localStorage:", error);
    }
  };

  return [advancedMode, handleChange] as const;
}
