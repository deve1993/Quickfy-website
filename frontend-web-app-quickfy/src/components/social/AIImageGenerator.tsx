"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Wand2, Loader2, Check, RotateCcw } from "lucide-react";
import { generateImage } from "@/lib/api/ai";
import { toast } from "sonner";
import type { AIImageStyle, AIImageDimensions, AIImageQuality } from "@/types/social";

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

export function AIImageGenerator({ onImageGenerated }: AIImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<AIImageStyle>("realistic");
  const [dimensions, setDimensions] = useState<AIImageDimensions>("1:1");
  const [quality, setQuality] = useState<AIImageQuality>("hd");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Inserisci una descrizione dell'immagine");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const imageUrl = await generateImage({
        options: {
          prompt,
          style,
          dimensions,
          quality,
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setGeneratedImageUrl(imageUrl);
        setShowPreview(true);
        toast.success("Immagine generata con successo!");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Errore nella generazione dell'immagine");
      clearInterval(progressInterval);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = () => {
    if (generatedImageUrl) {
      onImageGenerated(generatedImageUrl);
      setShowPreview(false);
      toast.success("Immagine confermata!");
    }
  };

  const handleRegenerate = () => {
    setShowPreview(false);
    setGeneratedImageUrl(null);
    handleGenerate();
  };

  const dimensionLabels: Record<AIImageDimensions, string> = {
    '1:1': '1:1 Square (Instagram Post)',
    '16:9': '16:9 Landscape (Facebook, LinkedIn)',
    '9:16': '9:16 Portrait (Instagram Story)',
    '4:5': '4:5 Instagram Portrait',
  };

  return (
    <>
      <div className="space-y-4">
        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="ai-prompt">Descrivi l&apos;immagine che vuoi creare</Label>
          <Textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Es: Un gatto seduto su una scrivania con un computer, stile moderno e minimalista, colori pastello"
            className="min-h-[100px]"
            disabled={isGenerating}
          />
          <p className="text-xs text-muted-foreground">
            Sii specifico per ottenere risultati migliori. Includi dettagli su stile, colori, atmosfera, ecc.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Style */}
          <div className="space-y-2">
            <Label htmlFor="style">Stile</Label>
            <Select
              value={style}
              onValueChange={(value) => setStyle(value as AIImageStyle)}
              disabled={isGenerating}
            >
              <SelectTrigger id="style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">🖼️ Realistico</SelectItem>
                <SelectItem value="artistic">🎨 Artistico</SelectItem>
                <SelectItem value="cartoon">🎭 Cartoon</SelectItem>
                <SelectItem value="minimalist">⚪ Minimalista</SelectItem>
                <SelectItem value="3d">🎲 3D Render</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dimensions */}
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensioni</Label>
            <Select
              value={dimensions}
              onValueChange={(value) => setDimensions(value as AIImageDimensions)}
              disabled={isGenerating}
            >
              <SelectTrigger id="dimensions">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(dimensionLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quality */}
          <div className="space-y-2">
            <Label htmlFor="quality">Qualità</Label>
            <Select
              value={quality}
              onValueChange={(value) => setQuality(value as AIImageQuality)}
              disabled={isGenerating}
            >
              <SelectTrigger id="quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">⚡ Standard</SelectItem>
                <SelectItem value="hd">✨ HD</SelectItem>
                <SelectItem value="ultra">💎 Ultra HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generazione in corso...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Genera Immagine con AI
            </>
          )}
        </Button>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {progress}% completato...
            </p>
          </div>
        )}

        {/* Current Generated Image Display */}
        {generatedImageUrl && !showPreview && (
          <Card className="border-2 border-primary">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">✓ Immagine confermata</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(true)}
                  >
                    Visualizza
                  </Button>
                </div>
                <div className="aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden">
                  <img
                    src={generatedImageUrl}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Anteprima Immagine Generata</DialogTitle>
            <DialogDescription>
              Rivedi l&apos;immagine prima di confermare o rigenerala con le stesse impostazioni
            </DialogDescription>
          </DialogHeader>

          {generatedImageUrl && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={generatedImageUrl}
                  alt="Generated preview"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Stile</p>
                  <p className="font-medium capitalize">{style}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dimensioni</p>
                  <p className="font-medium">{dimensions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Qualità</p>
                  <p className="font-medium uppercase">{quality}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleRegenerate}
              disabled={isGenerating}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Rigenera
            </Button>
            <Button onClick={handleConfirm} disabled={isGenerating}>
              <Check className="mr-2 h-4 w-4" />
              Conferma Immagine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
