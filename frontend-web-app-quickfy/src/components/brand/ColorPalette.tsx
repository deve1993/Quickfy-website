/**
 * Color Palette Component
 *
 * Comprehensive color palette management for brand identity.
 * Allows editing all semantic colors with live preview.
 */

"use client";

import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { SimpleColorPicker } from "./SimpleColorPicker";
import { ColorPresets, type ColorPreset } from "./ColorPresets";
import { ContrastChecker } from "./ContrastChecker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette, Sun, Moon, RotateCcw } from "lucide-react";
import type { ColorPalette as ColorPaletteType, ColorValue } from "@/types/brand";

interface ColorPaletteProps {
  /**
   * Light theme colors
   */
  lightColors: ColorPaletteType;
  /**
   * Dark theme colors
   */
  darkColors: ColorPaletteType;
  /**
   * Callback when light colors change
   */
  onLightColorsChange: (colors: ColorPaletteType) => void;
  /**
   * Callback when dark colors change
   */
  onDarkColorsChange: (colors: ColorPaletteType) => void;
  /**
   * Optional callback to reset to defaults
   */
  onReset?: () => void;
  /**
   * Enable advanced mode with all color controls
   * @default false
   */
  advancedMode?: boolean;
}

/**
 * Color definitions with descriptions
 */
const COLOR_DEFINITIONS: Array<{
  key: keyof ColorPaletteType;
  label: string;
  description: string;
  category: "brand" | "semantic" | "system";
}> = [
  {
    key: "primary",
    label: "Primary",
    description: "Main brand color for primary actions and highlights",
    category: "brand",
  },
  {
    key: "secondary",
    label: "Secondary",
    description: "Secondary brand color for supporting elements",
    category: "brand",
  },
  {
    key: "accent",
    label: "Accent",
    description: "Accent color for emphasis and call-to-actions",
    category: "brand",
  },
  {
    key: "destructive",
    label: "Destructive",
    description: "Color for destructive actions and error states",
    category: "semantic",
  },
  {
    key: "muted",
    label: "Muted",
    description: "Subtle color for muted text and backgrounds",
    category: "semantic",
  },
  {
    key: "background",
    label: "Background",
    description: "Main background color for the application",
    category: "system",
  },
  {
    key: "foreground",
    label: "Foreground",
    description: "Main text color for content",
    category: "system",
  },
  {
    key: "card",
    label: "Card",
    description: "Background color for card components",
    category: "system",
  },
  {
    key: "border",
    label: "Border",
    description: "Color for borders and dividers",
    category: "system",
  },
  {
    key: "input",
    label: "Input",
    description: "Border color for input fields",
    category: "system",
  },
  {
    key: "ring",
    label: "Ring",
    description: "Color for focus rings and outlines",
    category: "system",
  },
];

/**
 * Color Palette Management Component
 */
export function ColorPalette({
  lightColors,
  darkColors,
  onLightColorsChange,
  onDarkColorsChange,
  onReset,
  advancedMode = false,
}: ColorPaletteProps) {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  // In simple mode, always use light colors
  const currentColors = advancedMode
    ? activeTheme === "light"
      ? lightColors
      : darkColors
    : lightColors;

  const onColorsChange = advancedMode
    ? activeTheme === "light"
      ? onLightColorsChange
      : onDarkColorsChange
    : onLightColorsChange;

  // Handle color change
  const handleColorChange = (key: keyof ColorPaletteType, value: ColorValue) => {
    onColorsChange({
      ...currentColors,
      [key]: value,
    });
  };

  // Handle preset selection
  const handlePresetSelect = (preset: ColorPreset) => {
    onLightColorsChange({
      ...lightColors,
      primary: preset.colors.primary,
      secondary: preset.colors.secondary,
      accent: preset.colors.accent,
    });
  };

  // Group colors by category
  const brandColors = COLOR_DEFINITIONS.filter((c) => c.category === "brand");
  const semanticColors = COLOR_DEFINITIONS.filter((c) => c.category === "semantic");
  const systemColors = COLOR_DEFINITIONS.filter((c) => c.category === "system");

  // Simple mode: render simplified interface
  if (!advancedMode) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Colori Brand</h3>
          </div>
        </div>

        {/* Color Presets */}
        <ColorPresets
          currentColors={{
            primary: lightColors.primary,
            secondary: lightColors.secondary,
            accent: lightColors.accent,
          }}
          onSelect={handlePresetSelect}
        />

        {/* Brand Colors with Simple Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">I Tuoi Colori</CardTitle>
            <CardDescription>
              Personalizza i 3 colori principali del tuo brand
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {brandColors.map(({ key, label, description }) => (
              <SimpleColorPicker
                key={key}
                label={label}
                description={description}
                value={currentColors[key]}
                onChange={(value) => handleColorChange(key, value)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Advanced mode: render full interface (original)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Color Palette</h3>
        </div>
        {onReset && (
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        )}
      </div>

      {/* Theme Selector */}
      <Tabs value={activeTheme} onValueChange={(v) => setActiveTheme(v as "light" | "dark")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="light">
            <Sun className="w-4 h-4 mr-2" />
            Light Theme
          </TabsTrigger>
          <TabsTrigger value="dark">
            <Moon className="w-4 h-4 mr-2" />
            Dark Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTheme} className="space-y-6 mt-6">
          {/* Brand Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brand Colors</CardTitle>
              <CardDescription>
                Primary colors that represent your brand identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {brandColors.map(({ key, label, description }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  description={description}
                  value={currentColors[key]}
                  onChange={(value) => handleColorChange(key, value)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Semantic Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Semantic Colors</CardTitle>
              <CardDescription>
                Colors with specific meanings for UI states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {semanticColors.map(({ key, label, description }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  description={description}
                  value={currentColors[key]}
                  onChange={(value) => handleColorChange(key, value)}
                />
              ))}
            </CardContent>
          </Card>

          {/* System Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Colors</CardTitle>
              <CardDescription>
                Foundation colors for backgrounds, text, and borders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemColors.map(({ key, label, description }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  description={description}
                  value={currentColors[key]}
                  onChange={(value) => handleColorChange(key, value)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Contrast Checker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accessibility Check</CardTitle>
              <CardDescription>
                WCAG contrast ratio validation for your color combinations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContrastChecker
                foreground={currentColors.foreground}
                background={currentColors.background}
                label="Text on Background"
              />
              <ContrastChecker
                foreground={currentColors.primary}
                background={currentColors.background}
                label="Primary on Background"
              />
              <ContrastChecker
                foreground={currentColors.destructive}
                background={currentColors.background}
                label="Destructive on Background"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Color Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Color Summary</CardTitle>
          <CardDescription>
            Quick overview of all colors in your palette
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {COLOR_DEFINITIONS.map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center gap-2 p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded border"
                  style={{
                    backgroundColor: `hsl(${currentColors[key]})`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono truncate">
                    {currentColors[key].split(" ")[0]}°
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
