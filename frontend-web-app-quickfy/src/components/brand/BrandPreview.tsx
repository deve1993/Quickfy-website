/**
 * Brand Preview Component
 *
 * Live preview of brand DNA applied to UI components.
 * Shows real-time updates as brand settings change.
 */

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Lightbulb, Compass, Target, Heart, MessageSquare } from "lucide-react";
import { ComponentShowcase } from "./ComponentShowcase";
import { PreviewControls } from "./PreviewControls";
import type { BrandDNA } from "@/types/brand";
import { applyBrandVariables, loadGoogleFonts } from "@/lib/brand/brandVariables";
import { cn } from "@/lib/utils";

interface BrandPreviewProps {
  /**
   * Brand DNA to preview
   */
  brandDNA: BrandDNA;
  /**
   * Show preview controls
   */
  showControls?: boolean;
  /**
   * Initial theme
   */
  initialTheme?: "light" | "dark";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Brand Preview Component
 */
export function BrandPreview({
  brandDNA,
  showControls = true,
  initialTheme = "light",
  className,
}: BrandPreviewProps) {
  // M8 fix: Sync preview theme with app theme
  const { theme: appTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">(initialTheme);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [scale, setScale] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // M8 fix: Sync preview theme when app theme changes
  useEffect(() => {
    if (appTheme === "light" || appTheme === "dark") {
      setPreviewTheme(appTheme);
    } else if (appTheme === "system") {
      // Detect system theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setPreviewTheme(prefersDark ? "dark" : "light");
    }
  }, [appTheme]);

  // Apply brand theme to preview
  useEffect(() => {
    if (!isPreviewEnabled || !brandDNA) return;

    // Create isolated preview container
    const previewContainer = document.getElementById("brand-preview-container");
    if (!previewContainer) return;

    try {
      // Apply CSS variables to preview container
      applyBrandVariables(brandDNA, "brand-preview-styles");

      // Load Google Fonts
      loadGoogleFonts(brandDNA);
    } catch (error) {
      console.error("Failed to apply brand preview:", error);
    }
  }, [brandDNA, isPreviewEnabled]);

  // Scale dimensions
  const scaleConfig = {
    mobile: { width: "375px", height: "667px" },
    tablet: { width: "768px", height: "1024px" },
    desktop: { width: "100%", height: "auto" },
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Controls */}
      {showControls && (
        <PreviewControls
          theme={previewTheme}
          onThemeChange={setPreviewTheme}
          scale={scale}
          onScaleChange={setScale}
          showGrid={showGrid}
          onShowGridChange={setShowGrid}
          isEnabled={isPreviewEnabled}
          onEnabledChange={setIsPreviewEnabled}
        />
      )}

      {/* Preview Status */}
      <div className="flex items-center gap-2">
        <Badge variant={isPreviewEnabled ? "default" : "secondary"}>
          {isPreviewEnabled ? (
            <>
              <Eye className="w-3 h-3 mr-1" />
              Preview Active
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 mr-1" />
              Preview Disabled
            </>
          )}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {brandDNA.metadata.name} • v{brandDNA.metadata.version}
        </span>
      </div>

      {/* Preview Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Live Preview</CardTitle>
              <CardDescription>
                See your brand applied to real UI components
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {previewTheme === "light" ? "☀️ Light" : "🌙 Dark"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Preview Viewport */}
          <div
            className={cn(
              "relative overflow-auto rounded-lg border bg-muted/30",
              showGrid && "bg-grid-pattern"
            )}
          >
            <div
              id="brand-preview-container"
              className={cn(
                "brand-preview-scope mx-auto transition-all duration-300",
                previewTheme === "dark" && "dark",
                scale !== "desktop" && "my-4"
              )}
              style={{
                width: scaleConfig[scale].width,
                minHeight: scaleConfig[scale].height,
              }}
            >
              {isPreviewEnabled ? (
                <ComponentShowcase
                  brandDNA={brandDNA}
                  theme={previewTheme}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <EyeOff className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Preview disabled</p>
                    <p className="text-xs mt-1">
                      Enable preview to see your brand in action
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scale Info */}
          {scale !== "desktop" && (
            <div className="mt-3 text-center text-xs text-muted-foreground">
              Viewing at {scale} size ({scaleConfig[scale].width} × {scaleConfig[scale].height})
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strategic DNA */}
      {brandDNA.strategy && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span>🧬</span> Strategic DNA
            </CardTitle>
            <CardDescription>Your brand&apos;s purpose, vision, and values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Purpose */}
            {brandDNA.strategy.purpose && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Purpose (Why)</span>
                </div>
                <p className="text-sm leading-relaxed pl-5">
                  {brandDNA.strategy.purpose}
                </p>
              </div>
            )}

            {/* Vision */}
            {brandDNA.strategy.vision && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Vision (Where)</span>
                </div>
                <p className="text-sm leading-relaxed pl-5">
                  {brandDNA.strategy.vision}
                </p>
              </div>
            )}

            {/* Mission */}
            {brandDNA.strategy.mission && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Target className="w-3.5 h-3.5" />
                  <span>Mission (What)</span>
                </div>
                <p className="text-sm leading-relaxed pl-5">
                  {brandDNA.strategy.mission}
                </p>
              </div>
            )}

            {/* Values */}
            {brandDNA.strategy.values && brandDNA.strategy.values.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Values</span>
                </div>
                <div className="space-y-2 pl-5">
                  {brandDNA.strategy.values.map((value) => (
                    <div key={value.id} className="flex items-start gap-2">
                      {value.icon && (
                        <span className="text-base shrink-0 mt-0.5">{value.icon}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{value.name}</p>
                        {value.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {value.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tone of Voice */}
            {brandDNA.strategy.toneOfVoice && brandDNA.strategy.toneOfVoice.traits.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tone of Voice</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-5">
                  {brandDNA.strategy.toneOfVoice.traits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
                {brandDNA.strategy.toneOfVoice.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed pl-5 pt-1">
                    {brandDNA.strategy.toneOfVoice.description}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Brand Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Brand Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Brand Name</p>
              <p className="font-medium">{brandDNA.metadata.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Version</p>
              <p className="font-medium">{brandDNA.metadata.version}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary Font</p>
              <p className="font-medium">{brandDNA.typography.fontBody.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Heading Font</p>
              <p className="font-medium">{brandDNA.typography.fontHeading.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary Color</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: `hsl(${brandDNA.colors.light.primary})` }}
                />
                <p className="font-mono text-xs">{brandDNA.colors.light.primary.split(" ")[0]}°</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
              <p className="font-medium text-xs">
                {new Date(brandDNA.metadata.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Isolated Brand Preview (without controls)
 *
 * Useful for embedding previews in other contexts
 */
export function IsolatedBrandPreview({
  brandDNA,
  theme = "light",
  className,
}: {
  brandDNA: BrandDNA;
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden",
        theme === "dark" && "dark",
        className
      )}
    >
      <ComponentShowcase brandDNA={brandDNA} theme={theme} />
    </div>
  );
}
