/**
 * Brand Identity Page
 *
 * Complete brand DNA management interface.
 * Two main sections: Strategic DNA + Visual Identity
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Palette,
  Type,
  Image as ImageIcon,
  Eye,
  Download,
  Upload,
  Save,
  RotateCcw,
  Info,
  Sparkles,
  AlertTriangle,
  Dna,
  Brush,
  X,
  ChevronDown,
  FileJson,
  FileText,
} from "lucide-react";

// Brand components - Visual Identity
import { ColorPalette } from "@/components/brand/ColorPalette";
import { FontSelector } from "@/components/brand/FontSelector";
import { FontPreview } from "@/components/brand/FontPreview";
import { TypographyScale } from "@/components/brand/TypographyScale";
import { AssetManager } from "@/components/brand/AssetManager";
import { BrandPreview } from "@/components/brand/BrandPreview";
import { TemplateSelector } from "@/components/brand/TemplateSelector";
import { BeforeAfter } from "@/components/brand/BeforeAfter";

// Brand components - Strategic DNA
import { StrategyEditor } from "@/components/brand/StrategyEditor";
import { ValuesManager } from "@/components/brand/ValuesManager";
import { ToneOfVoiceEditor } from "@/components/brand/ToneOfVoiceEditor";

// Brand utilities
import { useBrandStore } from "@/store/useBrandStore";
import { getDefaultBrand } from "@/lib/brand/brandDefaults";
import { downloadBrand, type ExportFormat } from "@/lib/brand/brandExporter";
import { importFromFile } from "@/lib/brand/brandImporter";
import type { BrandTemplate } from "@/types/brand";

export default function BrandIdentityPage() {
  const {
    brandDNA,
    hasUnsavedChanges,
    isLoading,
    setBrand,
    updateColors,
    updateTypography,
    updateAssets,
    updateMetadata,
    updateStrategy,
    addValue,
    removeValue,
    updateValue,
    updateToneOfVoice,
    reset,
    saveBrand,
    applyTheme,
  } = useBrandStore();

  const [mainTab, setMainTab] = useState<"strategy" | "visual">("strategy");
  const [visualTab, setVisualTab] = useState("overview");
  const [showPreview, setShowPreview] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  // Loading states (M1 fix)
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Confirm dialogs state (C3 fix)
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<BrandTemplate | null>(null);
  const [pendingImportBrand, setPendingImportBrand] = useState<any>(null);

  // Dismissible alert state (M2 fix)
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  // Store original brand for Before/After comparison (C1 fix)
  const originalBrandRef = useRef(brandDNA || getDefaultBrand());
  const [originalBrand, setOriginalBrand] = useState(brandDNA || getDefaultBrand());

  // Initialize originalBrand when brandDNA is first loaded (C1 fix)
  useEffect(() => {
    if (brandDNA && !originalBrandRef.current) {
      originalBrandRef.current = brandDNA;
      setOriginalBrand(brandDNA);
    }
  }, [brandDNA]);

  // Keyboard shortcuts (M4 fix)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          handleSave();
        }
      }
      // Esc to close preview or dialogs
      if (e.key === "Escape") {
        if (showComparison) {
          setShowComparison(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, isSaving, showComparison]);

  // Autosave (M7 fix)
  useEffect(() => {
    if (!hasUnsavedChanges || isLoading || isSaving) return;

    const autosaveTimer = setTimeout(() => {
      handleSave();
    }, 30000); // Autosave after 30 seconds of inactivity

    return () => clearTimeout(autosaveTimer);
  }, [hasUnsavedChanges, brandDNA, isLoading, isSaving]);

  // Handle save (C2 fix: error handling, M1 fix: loading state)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveBrand();
      applyTheme();
      toast.success("Brand saved successfully!");
    } catch (error) {
      console.error("Failed to save brand:", error);
      toast.error(
        `Failed to save brand: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle reset (C2 fix: error handling, C3 fix: use ConfirmDialog)
  const handleReset = () => {
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setIsResetting(true);
    try {
      reset();
      applyTheme();
      // Update originalBrand to new default (M6 fix)
      const defaultBrand = getDefaultBrand();
      setOriginalBrand(defaultBrand);
      originalBrandRef.current = defaultBrand;
      toast.success("Brand reset to default settings");
    } catch (error) {
      console.error("Failed to reset brand:", error);
      toast.error(
        `Failed to reset brand: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsResetting(false);
    }
  };

  // Handle export (C2 fix: error handling, M1 fix: loading state)
  const handleExport = (format: ExportFormat) => {
    setIsExporting(true);
    try {
      if (!brandDNA) {
        toast.error("No brand data to export");
        return;
      }
      downloadBrand(brandDNA, format);
      toast.success(`Brand exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Failed to export brand:", error);
      toast.error(
        `Failed to export brand: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setTimeout(() => setIsExporting(false), 500); // Small delay for UX
    }
  };

  // Handle import (C2 fix: error handling, C3 fix: use ConfirmDialog)
  const handleImport = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = async (e: any) => {
        try {
          const file = e.target?.files?.[0];
          if (file) {
            const result = await importFromFile(file);
            if (result.success && result.brandDNA) {
              setPendingImportBrand(result.brandDNA);
              setImportDialogOpen(true);
            } else {
              toast.error(`Failed to import: ${result.error}`);
            }
          }
        } catch (error) {
          console.error("Failed to import brand:", error);
          toast.error(
            `Failed to import brand: ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }
      };
      input.click();
    } catch (error) {
      console.error("Failed to create file input:", error);
      toast.error("Failed to open file selector");
    }
  };

  const confirmImport = () => {
    if (pendingImportBrand) {
      setIsImporting(true);
      try {
        setBrand(pendingImportBrand);
        applyTheme();
        // Update originalBrand after successful import
        setOriginalBrand(pendingImportBrand);
        originalBrandRef.current = pendingImportBrand;
        toast.success(`Brand "${pendingImportBrand.metadata.name}" imported successfully!`);
        setPendingImportBrand(null);
      } catch (error) {
        console.error("Failed to apply imported brand:", error);
        toast.error(
          `Failed to apply imported brand: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsImporting(false);
      }
    }
  };

  // Handle template selection (C2 fix: error handling, C3 fix: use ConfirmDialog)
  const handleTemplateSelect = (template: BrandTemplate) => {
    setPendingTemplate(template);
    setTemplateDialogOpen(true);
  };

  const confirmTemplateSelect = () => {
    if (pendingTemplate) {
      try {
        setBrand(pendingTemplate.brandDNA);
        applyTheme();
        // Update originalBrand after template selection
        setOriginalBrand(pendingTemplate.brandDNA);
        originalBrandRef.current = pendingTemplate.brandDNA;
        toast.success(`Template "${pendingTemplate.name}" applied successfully!`);
        setPendingTemplate(null);
      } catch (error) {
        console.error("Failed to apply template:", error);
        toast.error(
          `Failed to apply template: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }
  };

  if (!brandDNA) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading brand settings...</p>
      </div>
    );
  }

  const strategy = brandDNA.strategy || {
    purpose: undefined,
    vision: undefined,
    mission: undefined,
    values: [],
    toneOfVoice: { traits: [] },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Brand Identity</h1>
            <p className="text-muted-foreground">
              Manage your company&apos;s visual identity and brand DNA
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSave} disabled={!hasUnsavedChanges || isLoading || isSaving}>
              <Save className={`w-4 h-4 mr-2 ${isSaving ? "animate-spin" : ""}`} />
              {isSaving ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={isResetting}>
              <RotateCcw className={`w-4 h-4 mr-2 ${isResetting ? "animate-spin" : ""}`} />
              {isResetting ? "Ripristino..." : "Ripristina Predefiniti"}
            </Button>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleImport} disabled={isImporting}>
                <Upload className={`w-4 h-4 mr-2 ${isImporting ? "animate-pulse" : ""}`} />
                {isImporting ? "Importazione..." : "Importa"}
              </Button>
              {/* M3 fix: Export dropdown with format options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isExporting}
                  >
                    <Download className={`w-4 h-4 mr-2 ${isExporting ? "animate-pulse" : ""}`} />
                    {isExporting ? "Esportazione..." : "Esporta"}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => handleExport("json")}
                    disabled={isExporting}
                  >
                    <FileJson className="w-4 h-4 mr-2" />
                    Esporta come JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("css")}
                    disabled={isExporting}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Esporta come CSS Variables
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("tailwind")}
                    disabled={isExporting}
                  >
                    <Brush className="w-4 h-4 mr-2" />
                    Esporta come Tailwind Config
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("typescript")}
                    disabled={isExporting}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Esporta come TypeScript
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Alert (M2 fix: dismissible) */}
      {!isAlertDismissed && (
        <Alert className="relative pr-12">
          <Info className="w-4 h-4" />
          <AlertDescription className="text-sm">
            Le modifiche sono applicate in tempo reale per l'anteprima. Clicca <strong>Salva Modifiche</strong> per
            applicarle permanentemente alla tua applicazione.
          </AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={() => setIsAlertDismissed(true)}
            aria-label="Chiudi avviso"
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* MAIN TABS: Strategic DNA + Visual Identity */}
          <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as "strategy" | "visual")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="strategy" className="gap-2">
                <Dna className="w-4 h-4" />
                <span className="hidden sm:inline">🧬 DNA Strategico</span>
                <span className="sm:hidden">DNA</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="gap-2">
                <Brush className="w-4 h-4" />
                <span className="hidden sm:inline">🎨 Identità Visiva</span>
                <span className="sm:hidden">Visual</span>
              </TabsTrigger>
            </TabsList>

            {/* ========== TAB 1: STRATEGIC DNA ========== */}
            <TabsContent value="strategy" className="space-y-6 mt-6">
              {/* Purpose, Vision, Mission */}
              <StrategyEditor
                strategy={strategy}
                onChange={(updatedStrategy) => updateStrategy(updatedStrategy)}
              />

              {/* Values */}
              <ValuesManager
                values={strategy.values}
                onAdd={(value) => addValue(value)}
                onUpdate={(valueId, value) => updateValue(valueId, value)}
                onRemove={(valueId) => removeValue(valueId)}
              />

              {/* Tone of Voice */}
              <ToneOfVoiceEditor
                toneOfVoice={strategy.toneOfVoice}
                onChange={(tone) => updateToneOfVoice(tone)}
              />
            </TabsContent>

            {/* ========== TAB 2: VISUAL IDENTITY ========== */}
            <TabsContent value="visual" className="mt-6">
              <Tabs value={visualTab} onValueChange={setVisualTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Panoramica
                  </TabsTrigger>
                  <TabsTrigger value="colors">
                    <Palette className="w-4 h-4 mr-2" />
                    Colori
                  </TabsTrigger>
                  <TabsTrigger value="typography">
                    <Type className="w-4 h-4 mr-2" />
                    Tipografia
                  </TabsTrigger>
                  <TabsTrigger value="assets">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Risorse
                  </TabsTrigger>
                  <TabsTrigger value="templates">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Modelli
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informazioni Brand</CardTitle>
                      <CardDescription>
                        Informazioni di base sul tuo brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome Brand</label>
                        <input
                          type="text"
                          value={brandDNA.metadata.name}
                          onChange={(e) =>
                            updateMetadata({ name: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg transition-all ${
                            !brandDNA.metadata.name.trim()
                              ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20"
                              : "focus:ring-2 focus:ring-primary"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tagline</label>
                        <input
                          type="text"
                          value={brandDNA.metadata.tagline || ""}
                          onChange={(e) =>
                            updateMetadata({ tagline: e.target.value })
                          }
                          placeholder="La tua tagline..."
                          className={`w-full px-3 py-2 border rounded-lg transition-all ${
                            !brandDNA.metadata.tagline?.trim()
                              ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20"
                              : "focus:ring-2 focus:ring-primary"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Descrizione</label>
                        <textarea
                          value={brandDNA.metadata.description || ""}
                          onChange={(e) =>
                            updateMetadata({ description: e.target.value })
                          }
                          placeholder="Descrivi il tuo brand..."
                          className={`w-full px-3 py-2 border rounded-lg min-h-[100px] transition-all ${
                            !brandDNA.metadata.description?.trim()
                              ? "ring-1 ring-blue-500/40 border-blue-400/60 bg-blue-50/30 dark:bg-blue-950/20"
                              : "focus:ring-2 focus:ring-primary"
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-muted-foreground">
                          Primary Color
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg border-2"
                            style={{
                              backgroundColor: `hsl(${brandDNA.colors.light.primary})`,
                            }}
                          />
                          <div className="text-xs font-mono">
                            {brandDNA.colors.light.primary}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-muted-foreground">
                          Typography
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">
                            {brandDNA.typography.fontHeading.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {brandDNA.typography.fontBody.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Colors Tab */}
                <TabsContent value="colors" className="space-y-6 mt-6">
                  <ColorPalette
                    lightColors={brandDNA.colors.light}
                    darkColors={brandDNA.colors.dark}
                    onLightColorsChange={(colors) =>
                      updateColors({ light: colors })
                    }
                    onDarkColorsChange={(colors) =>
                      updateColors({ dark: colors })
                    }
                    onReset={() => {
                      const defaultBrand = getDefaultBrand();
                      updateColors(defaultBrand.colors);
                    }}
                  />
                </TabsContent>

                {/* Typography Tab */}
                <TabsContent value="typography" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Font Selection</CardTitle>
                      <CardDescription>
                        Choose fonts for headings and body text
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-3">Heading Font</h4>
                        <FontSelector
                          value={brandDNA.typography.fontHeading}
                          onChange={(font) =>
                            updateTypography({ fontHeading: font })
                          }
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-3">Body Font</h4>
                        <FontSelector
                          value={brandDNA.typography.fontBody}
                          onChange={(font) =>
                            updateTypography({ fontBody: font })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <TypographyScale
                    typography={brandDNA.typography}
                    onChange={updateTypography}
                  />

                  <FontPreview
                    headingFont={brandDNA.typography.fontHeading}
                    bodyFont={brandDNA.typography.fontBody}
                    monoFont={brandDNA.typography.fontMono}
                  />
                </TabsContent>

                {/* Assets Tab */}
                <TabsContent value="assets" className="space-y-6 mt-6">
                  <AssetManager
                    assets={brandDNA.assets}
                    onChange={updateAssets}
                  />
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-6 mt-6">
                  <TemplateSelector
                    currentBrand={brandDNA}
                    onSelect={handleTemplateSelect}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Preview */}
        {showPreview && (
          <div className="space-y-6">
            <BrandPreview
              brandDNA={brandDNA}
              showControls={true}
              initialTheme="light"
            />

            {/* Comparison Toggle */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? "Hide" : "Show"} Before/After
            </Button>

            {showComparison && (
              <BeforeAfter
                before={originalBrand}
                after={brandDNA}
                labels={{ before: "Original", after: "Current" }}
              />
            )}
          </div>
        )}
      </div>

      {/* Confirm Dialogs (C3 fix) */}
      <ConfirmDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onConfirm={confirmReset}
        title="Ripristinare impostazioni predefinite?"
        description="Questa operazione eliminerà tutte le modifiche non salvate e ripristinerà il brand alle impostazioni predefinite. Questa azione non può essere annullata."
        confirmText="Ripristina"
        cancelText="Annulla"
        variant="destructive"
      />

      <ConfirmDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onConfirm={confirmImport}
        title={`Importare "${pendingImportBrand?.metadata?.name || 'brand'}"?`}
        description="Questa operazione sostituirà le impostazioni del brand corrente. Tutte le modifiche non salvate andranno perse."
        confirmText="Importa"
        cancelText="Annulla"
      />

      <ConfirmDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        onConfirm={confirmTemplateSelect}
        title={`Applicare modello "${pendingTemplate?.name || 'template'}"?`}
        description="Questa operazione sostituirà le impostazioni del brand corrente con il modello selezionato. Tutte le modifiche non salvate andranno perse."
        confirmText="Applica Modello"
        cancelText="Annulla"
      />
    </div>
  );
}
