/**
 * Typography Scale Editor
 *
 * Edit font sizes, line heights, and letter spacing for your typography system.
 * Includes presets and live preview of the scale.
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Ruler } from "lucide-react";
import type { TypographyScale as TypographyScaleType, BrandTypography } from "@/types/brand";

interface TypographyScaleProps {
  /**
   * Current typography configuration
   */
  typography: BrandTypography;
  /**
   * Callback when typography changes
   */
  onChange: (typography: BrandTypography) => void;
  /**
   * Show advanced options
   */
  showAdvanced?: boolean;
}

/**
 * Typography scale presets
 */
const SCALE_PRESETS: Array<{
  name: string;
  description: string;
  scale: TypographyScaleType;
}> = [
  {
    name: "Default",
    description: "Balanced scale for most interfaces",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
  },
  {
    name: "Tight",
    description: "Compact scale for dense layouts",
    scale: {
      xs: "0.7rem",
      sm: "0.8rem",
      base: "0.9rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.25rem",
      "3xl": "1.5rem",
      "4xl": "1.875rem",
      "5xl": "2.25rem",
      "6xl": "3rem",
      "7xl": "3.75rem",
      "8xl": "4.5rem",
      "9xl": "6rem",
    },
  },
  {
    name: "Loose",
    description: "Generous scale for readability",
    scale: {
      xs: "0.8rem",
      sm: "0.95rem",
      base: "1.1rem",
      lg: "1.25rem",
      xl: "1.4rem",
      "2xl": "1.75rem",
      "3xl": "2.125rem",
      "4xl": "2.625rem",
      "5xl": "3.5rem",
      "6xl": "4.5rem",
      "7xl": "5.5rem",
      "8xl": "7rem",
      "9xl": "9rem",
    },
  },
];

/**
 * Typography Scale Editor Component
 */
export function TypographyScale({
  typography,
  onChange,
  showAdvanced: _showAdvanced = false,
}: TypographyScaleProps) {
  const [activeTab, setActiveTab] = useState<"scale" | "spacing">("scale");

  // Handle scale value change
  const handleScaleChange = (
    key: keyof TypographyScaleType,
    value: string
  ) => {
    onChange({
      ...typography,
      scale: {
        ...typography.scale,
        [key]: value,
      },
    });
  };

  // Handle line height change
  const handleLineHeightChange = (
    key: "tight" | "normal" | "relaxed",
    value: number
  ) => {
    onChange({
      ...typography,
      lineHeight: {
        ...typography.lineHeight,
        [key]: value,
      },
    });
  };

  // Handle letter spacing change
  const handleLetterSpacingChange = (
    key: "tight" | "normal" | "wide",
    value: string
  ) => {
    onChange({
      ...typography,
      letterSpacing: {
        ...typography.letterSpacing,
        [key]: value,
      },
    });
  };

  // Apply preset
  const applyPreset = (scale: TypographyScaleType) => {
    onChange({
      ...typography,
      scale,
    });
  };

  // Font size entries
  const sizeEntries: Array<{
    key: keyof TypographyScaleType;
    label: string;
    usage: string;
  }> = [
    { key: "xs", label: "XS", usage: "Small captions" },
    { key: "sm", label: "SM", usage: "Captions, labels" },
    { key: "base", label: "Base", usage: "Body text (default)" },
    { key: "lg", label: "LG", usage: "Large body text" },
    { key: "xl", label: "XL", usage: "Small headings" },
    { key: "2xl", label: "2XL", usage: "H4 headings" },
    { key: "3xl", label: "3XL", usage: "H3 headings" },
    { key: "4xl", label: "4XL", usage: "H2 headings" },
    { key: "5xl", label: "5XL", usage: "H1 headings" },
    { key: "6xl", label: "6XL", usage: "Large displays" },
    { key: "7xl", label: "7XL", usage: "Hero displays" },
    { key: "8xl", label: "8XL", usage: "Extra large displays" },
    { key: "9xl", label: "9XL", usage: "Massive displays" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Ruler className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Typography Scale</h3>
      </div>

      {/* Scale Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Scale Presets</CardTitle>
          <CardDescription>
            Quick presets for common typography scales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {SCALE_PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                onClick={() => applyPreset(preset.scale)}
                className="flex flex-col items-start h-auto p-4 text-left"
              >
                <span className="font-semibold text-sm">{preset.name}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {preset.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scale">Font Sizes</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
        </TabsList>

        {/* Font Sizes */}
        <TabsContent value="scale" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Font Size Scale</CardTitle>
              <CardDescription>
                Customize font sizes for your typography system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sizeEntries.map(({ key, label, usage }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">{label}</Label>
                        <p className="text-xs text-muted-foreground">{usage}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        style={{
                          fontSize: typography.scale[key],
                          fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                        }}
                      >
                        Aa
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={typography.scale[key]}
                        onChange={(e) => handleScaleChange(key, e.target.value)}
                        className="font-mono text-sm"
                        placeholder="1rem"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleScaleChange(
                            key,
                            SCALE_PRESETS[0].scale[key]
                          )
                        }
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Scale Preview</CardTitle>
              <CardDescription>See how your sizes look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sizeEntries.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-baseline gap-3 p-2 rounded-lg hover:bg-accent/50"
                  >
                    <span className="text-xs text-muted-foreground w-12 flex-shrink-0">
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: typography.scale[key],
                        fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                      }}
                    >
                      The quick brown fox
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spacing */}
        <TabsContent value="spacing" className="space-y-4 mt-4">
          {/* Line Height */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Line Height</CardTitle>
              <CardDescription>
                Control vertical spacing between lines of text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Tight</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {typography.lineHeight.tight}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={typography.lineHeight.tight}
                  onChange={(e) =>
                    handleLineHeightChange("tight", parseFloat(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Normal</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {typography.lineHeight.normal}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={typography.lineHeight.normal}
                  onChange={(e) =>
                    handleLineHeightChange("normal", parseFloat(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Relaxed</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {typography.lineHeight.relaxed}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={typography.lineHeight.relaxed}
                  onChange={(e) =>
                    handleLineHeightChange("relaxed", parseFloat(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              {/* Preview */}
              <div className="border-t pt-4 space-y-3">
                <p
                  className="text-sm"
                  style={{
                    lineHeight: typography.lineHeight.tight,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  <strong>Tight:</strong> Typography is the art and technique of
                  arranging type to make written language legible, readable, and
                  appealing when displayed.
                </p>
                <p
                  className="text-sm"
                  style={{
                    lineHeight: typography.lineHeight.normal,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  <strong>Normal:</strong> Typography is the art and technique of
                  arranging type to make written language legible, readable, and
                  appealing when displayed.
                </p>
                <p
                  className="text-sm"
                  style={{
                    lineHeight: typography.lineHeight.relaxed,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  <strong>Relaxed:</strong> Typography is the art and technique of
                  arranging type to make written language legible, readable, and
                  appealing when displayed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Letter Spacing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Letter Spacing</CardTitle>
              <CardDescription>
                Control horizontal spacing between characters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Tight</Label>
                <Input
                  value={typography.letterSpacing.tight}
                  onChange={(e) =>
                    handleLetterSpacingChange("tight", e.target.value)
                  }
                  className="font-mono text-sm"
                  placeholder="-0.05em"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Normal</Label>
                <Input
                  value={typography.letterSpacing.normal}
                  onChange={(e) =>
                    handleLetterSpacingChange("normal", e.target.value)
                  }
                  className="font-mono text-sm"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Wide</Label>
                <Input
                  value={typography.letterSpacing.wide}
                  onChange={(e) =>
                    handleLetterSpacingChange("wide", e.target.value)
                  }
                  className="font-mono text-sm"
                  placeholder="0.05em"
                />
              </div>

              {/* Preview */}
              <div className="border-t pt-4 space-y-3">
                <p
                  className="text-lg"
                  style={{
                    letterSpacing: typography.letterSpacing.tight,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  Tight Letter Spacing
                </p>
                <p
                  className="text-lg"
                  style={{
                    letterSpacing: typography.letterSpacing.normal,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  Normal Letter Spacing
                </p>
                <p
                  className="text-lg"
                  style={{
                    letterSpacing: typography.letterSpacing.wide,
                    fontFamily: `${typography.fontBody.name}, ${typography.fontBody.fallback.join(", ")}`,
                  }}
                >
                  Wide Letter Spacing
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
