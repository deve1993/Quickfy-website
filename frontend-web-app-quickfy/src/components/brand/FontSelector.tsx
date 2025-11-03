/**
 * Font Selector Component
 *
 * Browse and select Google Fonts with search, categories, and live preview.
 * Includes popular pairings and font weight selection.
 */

"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GOOGLE_FONTS,
  getFontsByCategory,
  searchFonts,
  FONT_PAIRINGS,
  googleFontToFontFamily,
  loadGoogleFont,
  type FontCategory,
  type GoogleFont,
} from "@/lib/brand/googleFonts";
import type { FontFamily } from "@/types/brand";
import { cn } from "@/lib/utils";

interface FontSelectorProps {
  /**
   * Current selected font
   */
  value: FontFamily;
  /**
   * Callback when font changes
   */
  onChange: (font: FontFamily) => void;
  /**
   * Label for the selector
   */
  label?: string;
  /**
   * Font category filter
   */
  category?: FontCategory;
  /**
   * Preview text
   */
  previewText?: string;
}

/**
 * Font Selector Component
 */
export function FontSelector({
  value,
  onChange,
  label = "Select Font",
  category,
  previewText = "The quick brown fox jumps over the lazy dog",
}: FontSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | "all">(
    category || "all"
  );
  const [selectedWeights, setSelectedWeights] = useState<number[]>(value.weights);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // Filter fonts
  const filteredFonts = useMemo(() => {
    let fonts = GOOGLE_FONTS;

    // Filter by category
    if (selectedCategory !== "all") {
      fonts = getFontsByCategory(selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      fonts = searchFonts(searchQuery);
    }

    return fonts;
  }, [searchQuery, selectedCategory]);

  // Load font preview
  const handleFontPreview = async (fontName: string) => {
    if (loadedFonts.has(fontName)) return;

    try {
      await loadGoogleFont(fontName);
      setLoadedFonts((prev) => new Set(prev).add(fontName));
    } catch (error) {
      console.error("Failed to load font:", error);
    }
  };

  // Handle font selection
  const handleFontSelect = (googleFont: GoogleFont) => {
    const fontFamily = googleFontToFontFamily(googleFont);
    setSelectedWeights(googleFont.weights);
    onChange(fontFamily);
    handleFontPreview(googleFont.name);
  };

  // Handle weight toggle
  const handleWeightToggle = (weight: number) => {
    const currentFont = GOOGLE_FONTS.find((f) => f.name === value.name);
    if (!currentFont) return;

    const newWeights = selectedWeights.includes(weight)
      ? selectedWeights.filter((w) => w !== weight)
      : [...selectedWeights, weight].sort((a, b) => a - b);

    if (newWeights.length === 0) return; // Keep at least one weight

    const updatedFont: FontFamily = {
      ...value,
      weights: newWeights,
    };

    setSelectedWeights(newWeights);
    onChange(updatedFont);
  };

  // Handle pairing selection
  const handlePairingSelect = async (
    headingName: string,
    bodyName: string,
    type: "heading" | "body"
  ) => {
    const selectedFontName = type === "heading" ? headingName : bodyName;
    const font = GOOGLE_FONTS.find((f) => f.name === selectedFontName);
    if (font) {
      handleFontSelect(font);
    }
  };

  return (
    <div className="space-y-6">
      {/* Label */}
      {label && <Label className="text-base font-semibold">{label}</Label>}

      {/* Current Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Current Font</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="p-6 rounded-lg border bg-card text-center text-2xl"
            style={{ fontFamily: `${value.name}, ${value.fallback.join(", ")}` }}
          >
            {value.name}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedWeights.length} weight{selectedWeights.length !== 1 ? "s" : ""} selected
          </p>
        </CardContent>
      </Card>

      {/* Font Browser */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sans-serif">Sans</TabsTrigger>
            <TabsTrigger value="serif">Serif</TabsTrigger>
            <TabsTrigger value="monospace">Mono</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedCategory} className="mt-4">
          <ScrollArea className="h-[400px] rounded-lg border">
            <div className="p-4 space-y-2">
              {filteredFonts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Type className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No fonts found</p>
                </div>
              ) : (
                filteredFonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleFontSelect(font)}
                    onMouseEnter={() => handleFontPreview(font.name)}
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all hover:border-primary hover:bg-accent/50",
                      value.name === font.name && "border-primary bg-accent"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{font.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {font.category}
                      </Badge>
                    </div>
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: loadedFonts.has(font.name)
                          ? `${font.name}, ${font.fallback.join(", ")}`
                          : font.fallback.join(", "),
                      }}
                    >
                      {previewText}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {font.weights.length} weights • {font.variants} variants
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Weight Selection */}
      {value.name && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Font Weights</CardTitle>
            <CardDescription>
              Select which weights to include (affects loading performance)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {GOOGLE_FONTS.find((f) => f.name === value.name)?.weights.map((weight) => (
                <div key={weight} className="flex items-center space-x-2">
                  <Checkbox
                    id={`weight-${weight}`}
                    checked={selectedWeights.includes(weight)}
                    onCheckedChange={() => handleWeightToggle(weight)}
                  />
                  <label
                    htmlFor={`weight-${weight}`}
                    className="text-sm cursor-pointer"
                    style={{
                      fontFamily: `${value.name}, ${value.fallback.join(", ")}`,
                      fontWeight: weight,
                    }}
                  >
                    {weight}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Font Pairings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm">Recommended Pairings</CardTitle>
          </div>
          <CardDescription>
            Pre-selected combinations that work well together
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {FONT_PAIRINGS.map((pairing) => (
              <div
                key={pairing.name}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <p className="font-semibold text-sm mb-1">{pairing.name}</p>
                <p className="text-xs text-muted-foreground mb-3">{pairing.description}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handlePairingSelect(pairing.heading, pairing.body, "heading")
                    }
                    className="flex-1 text-xs"
                  >
                    Use {pairing.heading}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handlePairingSelect(pairing.heading, pairing.body, "body")
                    }
                    className="flex-1 text-xs"
                  >
                    Use {pairing.body}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
