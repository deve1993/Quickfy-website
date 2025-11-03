/**
 * Logo Preview Component
 *
 * Preview logos with theme switching to see how they look on different backgrounds.
 * Shows both light and dark theme variants side by side.
 */

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Image as ImageIcon } from "lucide-react";
import type { Logo } from "@/types/brand";
import { cn } from "@/lib/utils";

interface LogoPreviewProps {
  /**
   * Logo to preview
   */
  logo?: Logo;
  /**
   * Show both themes side by side
   */
  showBoth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Logo Preview Component
 */
export function LogoPreview({ logo, showBoth = true, className }: LogoPreviewProps) {
  if (!logo) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm">Logo Preview</CardTitle>
          <CardDescription>No logo uploaded yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Upload a logo to preview</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">Logo Preview</CardTitle>
        <CardDescription>
          See how your logo looks on different backgrounds
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showBoth ? (
          <div className="grid grid-cols-2 gap-4">
            {/* Light Theme */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sun className="w-3 h-3" />
                <span>Light Theme</span>
              </div>
              <div className="p-6 rounded-lg bg-white border flex items-center justify-center min-h-[120px]">
                {logo.lightUrl ? (
                  <img
                    src={logo.lightUrl}
                    alt={`${logo.name} - light theme`}
                    className="max-w-full max-h-[100px] object-contain"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">No light version</p>
                )}
              </div>
            </div>

            {/* Dark Theme */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Moon className="w-3 h-3" />
                <span>Dark Theme</span>
              </div>
              <div className="p-6 rounded-lg bg-slate-900 border flex items-center justify-center min-h-[120px]">
                {logo.darkUrl ? (
                  <img
                    src={logo.darkUrl}
                    alt={`${logo.name} - dark theme`}
                    className="max-w-full max-h-[100px] object-contain"
                  />
                ) : (
                  <p className="text-xs text-slate-400">No dark version</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-lg border bg-card flex items-center justify-center min-h-[120px]">
            <img
              src={logo.lightUrl || logo.darkUrl}
              alt={logo.name}
              className="max-w-full max-h-[100px] object-contain"
            />
          </div>
        )}

        {/* Logo Info */}
        <div className="mt-4 p-3 rounded-lg bg-muted/50 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{logo.name}</span>
          </div>
          {logo.width && logo.height && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Dimensions:</span>
              <Badge variant="secondary" className="text-[10px]">
                {logo.width} × {logo.height}
              </Badge>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Variants:</span>
            <div className="flex gap-1">
              {logo.lightUrl && (
                <Badge variant="secondary" className="text-[10px]">
                  <Sun className="w-2 h-2 mr-1" />
                  Light
                </Badge>
              )}
              {logo.darkUrl && (
                <Badge variant="secondary" className="text-[10px]">
                  <Moon className="w-2 h-2 mr-1" />
                  Dark
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Background Previews */}
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">Background Variations</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { bg: "bg-white", label: "White" },
              { bg: "bg-slate-100", label: "Light Gray" },
              { bg: "bg-slate-800", label: "Dark Gray" },
              { bg: "bg-slate-950", label: "Black" },
            ].map(({ bg, label }) => (
              <div key={bg} className="space-y-1">
                <div className={cn("p-3 rounded border flex items-center justify-center h-16", bg)}>
                  <img
                    src={bg.includes("slate-8") || bg.includes("slate-9") ? logo.darkUrl || logo.lightUrl : logo.lightUrl || logo.darkUrl}
                    alt={label}
                    className="max-w-full max-h-[40px] object-contain"
                  />
                </div>
                <p className="text-[10px] text-center text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
