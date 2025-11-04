/**
 * Asset Manager Component
 *
 * Comprehensive management for all brand assets including logos and images.
 * Handles multiple asset types with theme variants.
 */

"use client";

import { useState } from "react";
import { LogoUploader } from "./LogoUploader";
import { LogoPreview } from "./LogoPreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Sun, Moon } from "lucide-react";
import type { BrandAssets, Logo } from "@/types/brand";

interface AssetManagerProps {
  /**
   * Current brand assets
   */
  assets: BrandAssets;
  /**
   * Callback when assets change
   */
  onChange: (assets: BrandAssets) => void;
  /**
   * Enable advanced mode with theme-specific assets
   * @default false
   */
  advancedMode?: boolean;
}

/**
 * Asset Manager Component
 */
export function AssetManager({ assets, onChange, advancedMode = false }: AssetManagerProps) {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  // Handle logo upload
  const handleLogoUpload = (
    type: "primaryLogo" | "secondaryLogo" | "favicon",
    logoData: Partial<Logo>
  ) => {
    const existingLogo = assets[type];

    // Merge with existing logo data
    const updatedLogo: Logo = {
      id: existingLogo?.id || `${type}-${Date.now()}`,
      name: logoData.name || existingLogo?.name || "Untitled",
      lightUrl: logoData.lightUrl || existingLogo?.lightUrl || "",
      darkUrl: logoData.darkUrl || existingLogo?.darkUrl || "",
      width: logoData.width || existingLogo?.width,
      height: logoData.height || existingLogo?.height,
      fileSize: logoData.fileSize || existingLogo?.fileSize,
      uploadedAt: logoData.uploadedAt || existingLogo?.uploadedAt || new Date().toISOString(),
    };

    onChange({
      ...assets,
      [type]: updatedLogo,
    });
  };

  // Handle logo removal
  const handleLogoRemove = (type: "primaryLogo" | "secondaryLogo" | "favicon") => {
    onChange({
      ...assets,
      [type]: undefined,
    });
  };

  // Simple mode: unified logo upload (no theme variants)
  if (!advancedMode) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Risorse Brand</h3>
        </div>

        {/* Primary Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Logo Principale</CardTitle>
            <CardDescription>
              Logo principale del tuo brand (usato per tutti i temi)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LogoUploader
                type="primary"
                theme="light"
                currentLogo={assets.primaryLogo}
                onUpload={(logo) => handleLogoUpload("primaryLogo", logo)}
                onRemove={() => handleLogoRemove("primaryLogo")}
              />
              <LogoPreview logo={assets.primaryLogo} showBoth={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Advanced mode: full controls with theme variants
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Brand Assets</h3>
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
          {/* Primary Logo */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Primary Logo</h4>
              <p className="text-xs text-muted-foreground">
                Main logo used across your application and marketing materials
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LogoUploader
                type="primary"
                theme={activeTheme}
                currentLogo={assets.primaryLogo}
                onUpload={(logo) => handleLogoUpload("primaryLogo", logo)}
                onRemove={() => handleLogoRemove("primaryLogo")}
              />
              <LogoPreview logo={assets.primaryLogo} showBoth={false} />
            </div>
          </div>

          {/* Secondary Logo */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Secondary Logo</h4>
              <p className="text-xs text-muted-foreground">
                Alternative logo variation for specific contexts or compact layouts
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LogoUploader
                type="secondary"
                theme={activeTheme}
                currentLogo={assets.secondaryLogo}
                onUpload={(logo) => handleLogoUpload("secondaryLogo", logo)}
                onRemove={() => handleLogoRemove("secondaryLogo")}
              />
              <LogoPreview logo={assets.secondaryLogo} showBoth={false} />
            </div>
          </div>

          {/* Favicon */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Favicon</h4>
              <p className="text-xs text-muted-foreground">
                Small icon displayed in browser tabs and bookmarks (32x32 or larger)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LogoUploader
                type="favicon"
                theme={activeTheme}
                currentLogo={assets.favicon}
                onUpload={(logo) => handleLogoUpload("favicon", logo)}
                onRemove={() => handleLogoRemove("favicon")}
              />
              <LogoPreview logo={assets.favicon} showBoth={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* All Logos Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">All Assets Overview</CardTitle>
          <CardDescription>
            Quick view of all your uploaded brand assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-center">Primary Logo</p>
              <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center p-4">
                {assets.primaryLogo?.lightUrl || assets.primaryLogo?.darkUrl ? (
                  <img
                    src={assets.primaryLogo.lightUrl || assets.primaryLogo.darkUrl}
                    alt="Primary logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground opacity-50" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-center">Secondary Logo</p>
              <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center p-4">
                {assets.secondaryLogo?.lightUrl || assets.secondaryLogo?.darkUrl ? (
                  <img
                    src={assets.secondaryLogo.lightUrl || assets.secondaryLogo.darkUrl}
                    alt="Secondary logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground opacity-50" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-center">Favicon</p>
              <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center p-4">
                {assets.favicon?.lightUrl || assets.favicon?.darkUrl ? (
                  <img
                    src={assets.favicon.lightUrl || assets.favicon.darkUrl}
                    alt="Favicon"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground opacity-50" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
