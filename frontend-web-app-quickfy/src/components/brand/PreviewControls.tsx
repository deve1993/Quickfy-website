/**
 * Preview Controls Component
 *
 * Control panel for brand preview with theme, scale, and display options.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Grid3x3,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewControlsProps {
  /**
   * Current theme
   */
  theme: "light" | "dark";
  /**
   * Callback when theme changes
   */
  onThemeChange: (theme: "light" | "dark") => void;
  /**
   * Current scale
   */
  scale: "mobile" | "tablet" | "desktop";
  /**
   * Callback when scale changes
   */
  onScaleChange: (scale: "mobile" | "tablet" | "desktop") => void;
  /**
   * Show grid overlay
   */
  showGrid: boolean;
  /**
   * Callback when grid visibility changes
   */
  onShowGridChange: (show: boolean) => void;
  /**
   * Preview enabled state
   */
  isEnabled: boolean;
  /**
   * Callback when enabled state changes
   */
  onEnabledChange: (enabled: boolean) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Preview Controls Component
 */
export function PreviewControls({
  theme,
  onThemeChange,
  scale,
  onScaleChange,
  showGrid,
  onShowGridChange,
  isEnabled,
  onEnabledChange,
  className,
}: PreviewControlsProps) {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-6">
          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium whitespace-nowrap">Theme</Label>
            <Tabs value={theme} onValueChange={(v) => onThemeChange(v as any)}>
              <TabsList>
                <TabsTrigger value="light" className="gap-2">
                  <Sun className="w-3 h-3" />
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark" className="gap-2">
                  <Moon className="w-3 h-3" />
                  Dark
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Scale Selector */}
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium whitespace-nowrap">Scale</Label>
            <div className="flex gap-1 rounded-lg border p-1">
              <Button
                size="sm"
                variant={scale === "mobile" ? "default" : "ghost"}
                onClick={() => onScaleChange("mobile")}
                className="h-8 px-3"
              >
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile
              </Button>
              <Button
                size="sm"
                variant={scale === "tablet" ? "default" : "ghost"}
                onClick={() => onScaleChange("tablet")}
                className="h-8 px-3"
              >
                <Tablet className="w-3 h-3 mr-1" />
                Tablet
              </Button>
              <Button
                size="sm"
                variant={scale === "desktop" ? "default" : "ghost"}
                onClick={() => onScaleChange("desktop")}
                className="h-8 px-3"
              >
                <Monitor className="w-3 h-3 mr-1" />
                Desktop
              </Button>
            </div>
          </div>

          {/* Grid Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="grid-toggle"
              checked={showGrid}
              onCheckedChange={onShowGridChange}
            />
            <Label
              htmlFor="grid-toggle"
              className="text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <Grid3x3 className="w-3 h-3" />
              Show Grid
            </Label>
          </div>

          {/* Enable/Disable Preview */}
          <div className="flex items-center gap-3 ml-auto">
            <Switch
              id="preview-toggle"
              checked={isEnabled}
              onCheckedChange={onEnabledChange}
            />
            <Label
              htmlFor="preview-toggle"
              className="text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              {isEnabled ? (
                <>
                  <Eye className="w-3 h-3" />
                  Preview On
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3" />
                  Preview Off
                </>
              )}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact Preview Controls
 *
 * Simplified version for smaller spaces
 */
export function CompactPreviewControls({
  theme,
  onThemeChange,
  isEnabled,
  onEnabledChange,
  className,
}: Pick<
  PreviewControlsProps,
  "theme" | "onThemeChange" | "isEnabled" | "onEnabledChange" | "className"
>) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Theme Toggle */}
      <div className="flex gap-1 rounded-lg border p-1">
        <Button
          size="sm"
          variant={theme === "light" ? "default" : "ghost"}
          onClick={() => onThemeChange("light")}
          className="h-7 px-2"
        >
          <Sun className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant={theme === "dark" ? "default" : "ghost"}
          onClick={() => onThemeChange("dark")}
          className="h-7 px-2"
        >
          <Moon className="w-3 h-3" />
        </Button>
      </div>

      {/* Preview Toggle */}
      <Button
        size="sm"
        variant={isEnabled ? "default" : "outline"}
        onClick={() => onEnabledChange(!isEnabled)}
        className="h-7 px-3"
      >
        {isEnabled ? (
          <>
            <Eye className="w-3 h-3 mr-1" />
            On
          </>
        ) : (
          <>
            <EyeOff className="w-3 h-3 mr-1" />
            Off
          </>
        )}
      </Button>
    </div>
  );
}
