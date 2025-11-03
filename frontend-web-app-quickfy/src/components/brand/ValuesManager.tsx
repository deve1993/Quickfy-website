/**
 * Values Manager Component
 *
 * Manager for brand values (3-5 recommended core company values)
 */

"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Trash2, Edit2 } from "lucide-react";
import type { BrandValue } from "@/types/brand";

interface ValuesManagerProps {
  /**
   * Current values
   */
  values: BrandValue[];
  /**
   * Callback when value is added
   */
  onAdd: (value: BrandValue) => void;
  /**
   * Callback when value is updated
   */
  onUpdate: (valueId: string, value: Partial<BrandValue>) => void;
  /**
   * Callback when value is removed
   */
  onRemove: (valueId: string) => void;
}

export function ValuesManager({ values, onAdd, onUpdate, onRemove }: ValuesManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<BrandValue | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [valueToDelete, setValueToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    icon?: string;
  }>({
    name: "",
    description: "",
    icon: "",
  });
  const [emojiError, setEmojiError] = useState<string>("");

  // M5 fix: Validate emoji using Intl.Segmenter
  const validateEmoji = (text: string): boolean => {
    if (!text || text.trim() === "") {
      setEmojiError("");
      return true;
    }

    // Use Intl.Segmenter to count grapheme clusters (proper emoji handling)
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const segments = Array.from(segmenter.segment(text));

    // Check if it's a single grapheme cluster
    if (segments.length !== 1) {
      setEmojiError("Per favore inserisci un solo emoji");
      return false;
    }

    // Basic emoji regex check (covers most common emoji ranges)
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;
    if (!emojiRegex.test(text)) {
      setEmojiError("Per favore inserisci un emoji valido");
      return false;
    }

    setEmojiError("");
    return true;
  };

  const handleOpenDialog = (value?: BrandValue) => {
    if (value) {
      setEditingValue(value);
      setFormData({
        name: value.name,
        description: value.description,
        icon: value.icon || "",
      });
    } else {
      setEditingValue(null);
      setFormData({ name: "", description: "", icon: "" });
    }
    setEmojiError(""); // Clear emoji error when opening dialog
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    // M5 fix: Validate emoji before saving
    if (formData.icon && !validateEmoji(formData.icon)) {
      return;
    }

    if (editingValue) {
      // Update existing value
      onUpdate(editingValue.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon: formData.icon?.trim() || undefined,
      });
    } else {
      // Add new value (A4 fix: use nanoid for unique IDs)
      const newValue: BrandValue = {
        id: nanoid(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon: formData.icon?.trim() || undefined,
      };
      onAdd(newValue);
    }

    setIsDialogOpen(false);
    setFormData({ name: "", description: "", icon: "" });
    setEditingValue(null);
  };

  const handleDelete = (valueId: string) => {
    setValueToDelete(valueId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (valueToDelete) {
      onRemove(valueToDelete);
      setValueToDelete(null);
    }
  };

  const canAddMore = values.length < 5;

  return (
    <Card className={`transition-all ${values.length === 0 ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle>4. Valori</CardTitle>
          </div>
          <Badge variant={values.length >= 3 ? "default" : "secondary"}>
            {values.length}/5
          </Badge>
        </div>
        <CardDescription>
          In cosa crediamo? Quali sono le nostre 3-5 regole fisse?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Values List */}
        {values.length > 0 ? (
          <div className="grid gap-3">
            {values.map((value) => (
              <div
                key={value.id}
                className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                {value.icon && (
                  <span className="text-2xl shrink-0" aria-hidden="true">
                    {value.icon}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{value.name}</h4>
                  {value.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {value.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(value)}
                    aria-label={`Modifica ${value.name}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(value.id)}
                    aria-label={`Elimina ${value.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
            Nessun valore aggiunto. Inizia aggiungendo i tuoi valori aziendali.
          </div>
        )}

        {/* Add Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOpenDialog()}
              disabled={!canAddMore}
            >
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Valore {!canAddMore && "(Max 5 raggiunto)"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingValue ? "Modifica Valore" : "Nuovo Valore"}
              </DialogTitle>
              <DialogDescription>
                {editingValue
                  ? "Modifica le informazioni del valore aziendale."
                  : "Aggiungi un nuovo valore che guida la tua azienda."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="value-name">
                  Nome Valore <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="value-name"
                  placeholder="Es: Semplicità, Innovazione, Affidabilità"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.name.length}/50
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value-description">Descrizione</Label>
                <Textarea
                  id="value-description"
                  placeholder="Breve descrizione di cosa significa questo valore per l'azienda..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[80px] resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/200
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value-icon">Icona/Emoji (opzionale)</Label>
                <Input
                  id="value-icon"
                  placeholder="Es: 💡 🚀 ⭐ 🎯"
                  value={formData.icon}
                  onChange={(e) => {
                    const newIcon = e.target.value;
                    setFormData({ ...formData, icon: newIcon });
                    validateEmoji(newIcon);
                  }}
                  className={emojiError ? "border-destructive focus-visible:ring-destructive" : ""}
                  maxLength={10}
                />
                {emojiError ? (
                  <p className="text-xs text-destructive">{emojiError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Un emoji per rappresentare visivamente il valore
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Annulla
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name.trim()}
              >
                {editingValue ? "Salva Modifiche" : "Aggiungi Valore"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {values.length < 3 && values.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            💡 Consigliati almeno 3 valori per una base solida
          </p>
        )}
      </CardContent>

      {/* Delete Confirm Dialog (C3 fix) */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Elimina valore?"
        description="Sei sicuro di voler eliminare questo valore? Questa azione non può essere annullata."
        confirmText="Elimina"
        cancelText="Annulla"
        variant="destructive"
      />
    </Card>
  );
}
