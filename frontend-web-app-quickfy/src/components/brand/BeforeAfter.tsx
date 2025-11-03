/**
 * Before/After Comparison Component
 *
 * Side-by-side comparison of two brand DNA configurations.
 * Useful for comparing default vs. custom or old vs. new branding.
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IsolatedBrandPreview } from "./BrandPreview";
import { ArrowRight, Info } from "lucide-react";
import type { BrandDNA } from "@/types/brand";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BeforeAfterProps {
  /**
   * Original/before brand DNA
   */
  before: BrandDNA;
  /**
   * New/after brand DNA
   */
  after: BrandDNA;
  /**
   * Labels for comparison
   */
  labels?: {
    before?: string;
    after?: string;
  };
  /**
   * Show differences summary
   */
  showDifferences?: boolean;
}

/**
 * Before/After Comparison Component
 */
export function BeforeAfter({
  before,
  after,
  labels = { before: "Before", after: "After" },
  showDifferences = true,
}: BeforeAfterProps) {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  // Calculate differences
  const differences = calculateDifferences(before, after);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Brand Comparison</h3>
          <p className="text-sm text-muted-foreground">
            See how your changes affect the overall design
          </p>
        </div>
        <Tabs value={activeTheme} onValueChange={(v) => setActiveTheme(v as any)}>
          <TabsList>
            <TabsTrigger value="light">Light</TabsTrigger>
            <TabsTrigger value="dark">Dark</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Differences Alert */}
      {showDifferences && differences.length > 0 && (
        <Alert>
          <Info className="w-4 h-4" />
          <AlertDescription className="text-sm">
            <strong>{differences.length} change{differences.length !== 1 ? "s" : ""} detected:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {differences.slice(0, 5).map((diff, index) => (
                <li key={index}>{diff}</li>
              ))}
              {differences.length > 5 && (
                <li className="text-muted-foreground">
                  and {differences.length - 5} more...
                </li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Before */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">{labels.before}</CardTitle>
                <CardDescription>{before.metadata.name}</CardDescription>
              </div>
              <Badge variant="secondary">Original</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <IsolatedBrandPreview brandDNA={before} theme={activeTheme} />

            {/* Brand Info */}
            <div className="mt-4 p-3 rounded-lg bg-muted/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: `hsl(${before.colors.light.primary})` }}
                  />
                  <code className="font-mono">{before.colors.light.primary.split(" ")[0]}°</code>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heading Font:</span>
                <span className="font-medium">{before.typography.fontHeading.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Body Font:</span>
                <span className="font-medium">{before.typography.fontBody.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* After */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">{labels.after}</CardTitle>
                <CardDescription>{after.metadata.name}</CardDescription>
              </div>
              <Badge>New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <IsolatedBrandPreview brandDNA={after} theme={activeTheme} />

            {/* Brand Info */}
            <div className="mt-4 p-3 rounded-lg bg-muted/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: `hsl(${after.colors.light.primary})` }}
                  />
                  <code className="font-mono">{after.colors.light.primary.split(" ")[0]}°</code>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heading Font:</span>
                <span className="font-medium">{after.typography.fontHeading.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Body Font:</span>
                <span className="font-medium">{after.typography.fontBody.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Arrow */}
      <div className="flex items-center justify-center -my-3">
        <div className="rounded-full bg-primary text-primary-foreground p-3">
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

/**
 * Calculate differences between two brand DNAs
 */
function calculateDifferences(before: BrandDNA, after: BrandDNA): string[] {
  const differences: string[] = [];

  // Check colors
  if (before.colors.light.primary !== after.colors.light.primary) {
    differences.push("Primary color changed");
  }
  if (before.colors.light.secondary !== after.colors.light.secondary) {
    differences.push("Secondary color changed");
  }
  if (before.colors.light.accent !== after.colors.light.accent) {
    differences.push("Accent color changed");
  }

  // Check typography
  if (before.typography.fontHeading.name !== after.typography.fontHeading.name) {
    differences.push(`Heading font: ${before.typography.fontHeading.name} → ${after.typography.fontHeading.name}`);
  }
  if (before.typography.fontBody.name !== after.typography.fontBody.name) {
    differences.push(`Body font: ${before.typography.fontBody.name} → ${after.typography.fontBody.name}`);
  }

  // Check font sizes
  if (before.typography.scale.base !== after.typography.scale.base) {
    differences.push("Base font size changed");
  }

  // Check spacing
  if (before.spacing.radius.lg !== after.spacing.radius.lg) {
    differences.push("Border radius changed");
  }

  // Check metadata
  if (before.metadata.name !== after.metadata.name) {
    differences.push(`Brand name: ${before.metadata.name} → ${after.metadata.name}`);
  }

  return differences;
}

/**
 * Slider Comparison Component
 *
 * Interactive slider to reveal before/after
 */
export function SliderComparison({
  before,
  after,
  theme = "light",
}: {
  before: BrandDNA;
  after: BrandDNA;
  theme?: "light" | "dark";
}) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Interactive Comparison</CardTitle>
        <CardDescription>
          Drag the slider to compare before and after
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-lg border">
          {/* After (background) */}
          <div className="w-full">
            <IsolatedBrandPreview brandDNA={after} theme={theme} />
          </div>

          {/* Before (overlay) */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <IsolatedBrandPreview brandDNA={before} theme={theme} />
          </div>

          {/* Slider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-2 border-background shadow-lg" />
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />

          {/* Labels */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs">Before</Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="text-xs">After</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
