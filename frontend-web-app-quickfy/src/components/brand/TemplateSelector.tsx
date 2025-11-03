/**
 * Template Selector Component
 *
 * Browse and apply pre-configured brand DNA templates.
 * Provides quick start with professionally designed brand identities.
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IsolatedBrandPreview } from "./BrandPreview";
import { BRAND_TEMPLATES } from "@/lib/brand/templates";
import type { BrandTemplate, BrandDNA } from "@/types/brand";
import { Check, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  /**
   * Currently selected brand DNA (for comparison)
   */
  currentBrand?: BrandDNA;
  /**
   * Callback when template is selected
   */
  onSelect: (template: BrandTemplate) => void;
  /**
   * Show preview for each template
   */
  showPreview?: boolean;
}

/**
 * Template Selector Component
 */
export function TemplateSelector({
  currentBrand,
  onSelect,
  showPreview = true,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const handleSelect = (template: BrandTemplate) => {
    setSelectedTemplate(template.id);
    onSelect(template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Brand Templates</h3>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={previewTheme === "light" ? "default" : "outline"}
            onClick={() => setPreviewTheme("light")}
          >
            Light
          </Button>
          <Button
            size="sm"
            variant={previewTheme === "dark" ? "default" : "outline"}
            onClick={() => setPreviewTheme("dark")}
          >
            Dark
          </Button>
        </div>
      </div>

      {/* Info Alert */}
      <Alert>
        <Info className="w-4 h-4" />
        <AlertDescription className="text-sm">
          Choose a template as a starting point. You can customize every aspect
          after selection. Your current brand settings will be replaced.
        </AlertDescription>
      </Alert>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BRAND_TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isCurrent = currentBrand?.metadata.name === template.brandDNA.metadata.name;

          return (
            <Card
              key={template.id}
              className={cn(
                "transition-all cursor-pointer hover:shadow-lg",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => handleSelect(template)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      {isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      {template.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs capitalize"
                  >
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Preview */}
                {showPreview && (
                  <div className="rounded-lg overflow-hidden border bg-muted/30">
                    <div className="scale-[0.7] origin-top-left w-[142%] h-[200px] overflow-hidden">
                      <IsolatedBrandPreview
                        brandDNA={template.brandDNA}
                        theme={previewTheme}
                      />
                    </div>
                  </div>
                )}

                {/* Template Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Primary Color:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          backgroundColor: `hsl(${template.brandDNA.colors.light.primary})`,
                        }}
                      />
                      <code className="font-mono text-[10px]">
                        {template.brandDNA.colors.light.primary.split(" ")[0]}°
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Heading Font:</span>
                    <span className="font-medium">
                      {template.brandDNA.typography.fontHeading.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Body Font:</span>
                    <span className="font-medium">
                      {template.brandDNA.typography.fontBody.name}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  className="w-full"
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(template);
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3 mr-2" />
                      Selected
                    </>
                  ) : isCurrent ? (
                    "Currently Applied"
                  ) : (
                    "Apply Template"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Template Summary */}
      {selectedTemplate && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Template Selected
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground">
              {BRAND_TEMPLATES.find((t) => t.id === selectedTemplate)?.name} will be applied
              to your brand. You can customize all settings after applying the template.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/**
 * Compact Template Selector
 *
 * Simplified version for smaller spaces
 */
export function CompactTemplateSelector({
  onSelect,
}: Pick<TemplateSelectorProps, "onSelect">) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Quick Start Templates</p>
      <div className="grid grid-cols-2 gap-2">
        {BRAND_TEMPLATES.map((template) => (
          <Button
            key={template.id}
            variant="outline"
            className="h-auto p-3 flex flex-col items-start text-left"
            onClick={() => onSelect(template)}
          >
            <span className="font-semibold text-sm">{template.name}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {template.category}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
