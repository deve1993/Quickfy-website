/**
 * Tone of Voice Editor Component
 *
 * Editor for brand communication tone and personality traits
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, X } from "lucide-react";
import type { ToneOfVoice } from "@/types/brand";

interface ToneOfVoiceEditorProps {
  /**
   * Current tone of voice
   */
  toneOfVoice: ToneOfVoice;
  /**
   * Callback when tone of voice changes
   */
  onChange: (tone: ToneOfVoice) => void;
}

/**
 * Suggested common tone traits
 */
const SUGGESTED_TRAITS = [
  "Amichevole",
  "Professionale",
  "Diretto",
  "Ottimista",
  "Competente",
  "Empatico",
  "Innovativo",
  "Rassicurante",
  "Energico",
  "Minimalista",
  "Autorevole",
  "Giocoso",
];

export function ToneOfVoiceEditor({ toneOfVoice, onChange }: ToneOfVoiceEditorProps) {
  const [newTrait, setNewTrait] = useState("");

  const handleAddTrait = (trait: string) => {
    const trimmedTrait = trait.trim();
    if (
      !trimmedTrait ||
      toneOfVoice.traits.includes(trimmedTrait) ||
      toneOfVoice.traits.length >= 7
    ) {
      return;
    }

    onChange({
      ...toneOfVoice,
      traits: [...toneOfVoice.traits, trimmedTrait],
    });
    setNewTrait("");
  };

  const handleRemoveTrait = (trait: string) => {
    onChange({
      ...toneOfVoice,
      traits: toneOfVoice.traits.filter((t) => t !== trait),
    });
  };

  const handleDescriptionChange = (description: string) => {
    onChange({
      ...toneOfVoice,
      description,
    });
  };

  const availableSuggestions = SUGGESTED_TRAITS.filter(
    (trait) => !toneOfVoice.traits.includes(trait)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle>5. Tono di Voce</CardTitle>
        </div>
        <CardDescription>
          Se fossimo una persona, come parleremmo?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Traits Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Tratti Personalità (Max 7)
            </Label>
            <Badge variant="secondary">
              {toneOfVoice.traits.length}/7
            </Badge>
          </div>

          {/* Selected Traits */}
          {toneOfVoice.traits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {toneOfVoice.traits.map((trait) => (
                <Badge
                  key={trait}
                  variant="default"
                  className="px-3 py-1 text-sm"
                >
                  {trait}
                  <button
                    onClick={() => handleRemoveTrait(trait)}
                    className="ml-2 hover:text-destructive transition-colors"
                    aria-label={`Rimuovi ${trait}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add Custom Trait */}
          {toneOfVoice.traits.length < 7 && (
            <div className="flex gap-2">
              <Input
                placeholder="Aggiungi tratto personalizzato..."
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTrait(newTrait);
                  }
                }}
                maxLength={30}
              />
              <Button
                onClick={() => handleAddTrait(newTrait)}
                disabled={!newTrait.trim()}
                size="icon"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Suggested Traits */}
          {availableSuggestions.length > 0 && toneOfVoice.traits.length < 7 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Suggerimenti:
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableSuggestions.slice(0, 8).map((trait) => (
                  <Badge
                    key={trait}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAddTrait(trait)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="tone-description">
            Descrizione del Tono (opzionale)
          </Label>
          <Textarea
            id="tone-description"
            placeholder="Descrivi come comunichi con i tuoi clienti. Es: 'Usiamo un linguaggio chiaro e diretto, senza tecnicismi. Siamo professionali ma sempre accessibili.'"
            value={toneOfVoice.description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={300}
          />
          <p className="text-xs text-muted-foreground">
            {(toneOfVoice.description || "").length}/300
          </p>
        </div>

        {/* Examples Section (Optional - for future) */}
        {/* <div className="space-y-3 pt-4 border-t">
          <Label className="text-sm font-medium">Esempi (opzionale)</Label>
          <div className="grid gap-3">
            <div className="space-y-2">
              <Label htmlFor="dos" className="text-xs">Da Fare (Dos)</Label>
              <Textarea
                id="dos"
                placeholder="Es: Usa un linguaggio semplice..."
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donts" className="text-xs">Da Evitare (Don'ts)</Label>
              <Textarea
                id="donts"
                placeholder="Es: Evita termini tecnici..."
                className="min-h-[60px]"
              />
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
