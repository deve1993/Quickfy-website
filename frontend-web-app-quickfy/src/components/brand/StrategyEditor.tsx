/**
 * Strategy Editor Component
 *
 * Editor for strategic brand DNA elements:
 * Purpose (Why), Vision (Where), Mission (What)
 */

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Target, Compass } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import type { BrandStrategy } from "@/types/brand";

interface StrategyEditorProps {
  /**
   * Current strategy values
   */
  strategy: Partial<BrandStrategy>;
  /**
   * Callback when strategy changes
   */
  onChange: (strategy: Partial<BrandStrategy>) => void;
}

const MAX_LENGTH = {
  purpose: 200,
  vision: 200,
  mission: 300,
};

export function StrategyEditor({ strategy, onChange }: StrategyEditorProps) {
  // Local state for immediate UI updates (A3 fix: debouncing)
  const [localPurpose, setLocalPurpose] = useState(strategy.purpose || "");
  const [localVision, setLocalVision] = useState(strategy.vision || "");
  const [localMission, setLocalMission] = useState(strategy.mission || "");

  // Debounced values (300ms delay)
  const debouncedPurpose = useDebounce(localPurpose, 300);
  const debouncedVision = useDebounce(localVision, 300);
  const debouncedMission = useDebounce(localMission, 300);

  // Update parent when debounced values change
  useEffect(() => {
    onChange({
      ...strategy,
      purpose: debouncedPurpose,
    });
  }, [debouncedPurpose]);

  useEffect(() => {
    onChange({
      ...strategy,
      vision: debouncedVision,
    });
  }, [debouncedVision]);

  useEffect(() => {
    onChange({
      ...strategy,
      mission: debouncedMission,
    });
  }, [debouncedMission]);

  // Sync local state if external strategy changes
  useEffect(() => {
    setLocalPurpose(strategy.purpose || "");
    setLocalVision(strategy.vision || "");
    setLocalMission(strategy.mission || "");
  }, [strategy.purpose, strategy.vision, strategy.mission]);

  return (
    <div className="space-y-6">
      {/* Purpose */}
      <Card className={`transition-all ${!localPurpose.trim() ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20" : ""}`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>1. Scopo (Perché)</CardTitle>
          </div>
          <CardDescription>
            Perché esistiamo, oltre a fare soldi?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Textarea
              id="purpose"
              placeholder="Es: Per rendere la tecnologia semplice per tutti."
              value={localPurpose}
              onChange={(e) => setLocalPurpose(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={MAX_LENGTH.purpose}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Una singola frase chiara e concisa</span>
              <span>
                {localPurpose.length}/{MAX_LENGTH.purpose}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision */}
      <Card className={`transition-all ${!localVision.trim() ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20" : ""}`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            <CardTitle>2. Visione (Dove)</CardTitle>
          </div>
          <CardDescription>
            Quale futuro vogliamo creare?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Textarea
              id="vision"
              placeholder="Es: Un mondo dove chiunque può realizzare le proprie idee digitali."
              value={localVision}
              onChange={(e) => setLocalVision(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={MAX_LENGTH.vision}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Una frase ispirazionale sul futuro</span>
              <span>
                {localVision.length}/{MAX_LENGTH.vision}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission */}
      <Card className={`transition-all ${!localMission.trim() ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20" : ""}`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>3. Missione (Cosa)</CardTitle>
          </div>
          <CardDescription>
            Cosa facciamo ogni giorno per realizzare la visione?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Textarea
              id="mission"
              placeholder="Es: Costruiamo gli strumenti software più intuitivi sul mercato."
              value={localMission}
              onChange={(e) => setLocalMission(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={MAX_LENGTH.mission}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Una frase concreta su cosa fate</span>
              <span>
                {localMission.length}/{MAX_LENGTH.mission}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
