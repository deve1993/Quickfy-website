"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { generateText } from "@/lib/api/ai";
import { toast } from "sonner";
import type { AITone, AILength, SocialPlatform, PostType } from "@/types/social";

interface TextGeneratorProps {
  platform?: SocialPlatform;
  postType?: PostType;
  topic?: string;
  keywords?: string;
  targetAudience?: string;
  onTextGenerated: (text: string) => void;
}

export function TextGenerator({
  platform,
  postType,
  topic,
  keywords,
  targetAudience,
  onTextGenerated,
}: TextGeneratorProps) {
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // AI Options
  const [tone, setTone] = useState<AITone>("friendly");
  const [length, setLength] = useState<AILength>("medium");
  const [includeEmojis, setIncludeEmojis] = useState(true);

  const handleGenerate = async () => {
    if (!platform || !postType) {
      toast.error("Seleziona prima piattaforma e tipo di post");
      return;
    }

    setIsGenerating(true);
    try {
      const text = await generateText({
        platform,
        type: postType,
        topic,
        keywords,
        targetAudience,
        options: {
          tone,
          length,
          includeEmojis,
        },
      });

      setGeneratedText(text);
      onTextGenerated(text);
      toast.success("Testo generato con successo!");
    } catch (error) {
      console.error(error);
      toast.error("Errore nella generazione del testo");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextChange = (value: string) => {
    setGeneratedText(value);
    onTextGenerated(value);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generazione Testo con AI
            </CardTitle>
            <CardDescription>
              Crea contenuti coinvolgenti con l'intelligenza artificiale
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="text-sm"
          >
            Opzioni Avanzate
            {showAdvancedOptions ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Advanced Options */}
        {showAdvancedOptions && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tone */}
              <div className="space-y-2">
                <Label htmlFor="tone">Tono di Voce</Label>
                <Select value={tone} onValueChange={(value) => setTone(value as AITone)}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professionale</SelectItem>
                    <SelectItem value="friendly">Amichevole</SelectItem>
                    <SelectItem value="playful">Divertente</SelectItem>
                    <SelectItem value="formal">Formale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <Label htmlFor="length">Lunghezza</Label>
                <Select value={length} onValueChange={(value) => setLength(value as AILength)}>
                  <SelectTrigger id="length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Corto (~50 parole)</SelectItem>
                    <SelectItem value="medium">Medio (~100 parole)</SelectItem>
                    <SelectItem value="long">Lungo (~200 parole)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Emojis */}
              <div className="space-y-2">
                <Label htmlFor="emojis">Includi Emoji</Label>
                <div className="flex items-center space-x-2 h-10">
                  <Switch
                    id="emojis"
                    checked={includeEmojis}
                    onCheckedChange={setIncludeEmojis}
                  />
                  <Label htmlFor="emojis" className="cursor-pointer">
                    {includeEmojis ? "Sì 😊" : "No"}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !platform || !postType}
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
              <Sparkles className="mr-2 h-4 w-4" />
              Genera Testi con AI
            </>
          )}
        </Button>

        {/* Generated Text Textarea */}
        <div className="space-y-2">
          <Label htmlFor="generated-text">Testo Generato (Editabile)</Label>
          <Textarea
            id="generated-text"
            value={generatedText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Il testo generato dall'AI apparirà qui. Potrai modificarlo liberamente prima di pubblicare."
            className="min-h-[150px] font-sans"
            disabled={isGenerating}
          />
          {generatedText && (
            <p className="text-xs text-muted-foreground">
              {generatedText.length} caratteri
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
