/**
 * Brand DNA Store
 *
 * Zustand store for managing brand DNA configuration with localStorage persistence.
 * Handles brand identity management, theme application, and import/export functionality.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BrandDNA,
  BrandState,
  BrandActions,
  BrandColors,
  BrandTypography,
  BrandSpacing,
  BrandAssets,
  BrandMetadata,
  BrandStrategy,
  BrandValue,
  ToneOfVoice,
  ValidationResult,
} from "@/types/brand";
import { getDefaultBrand } from "@/lib/brand/brandDefaults";
import {
  validateBrandDNA,
  validateImportedJSON,
} from "@/lib/brand/brandValidator";
import {
  loadGoogleFonts,
} from "@/lib/brand/brandVariables";

/**
 * Brand DNA Store
 *
 * Complete state management for brand identity system
 */
export const useBrandStore = create<BrandState & BrandActions>()(
  persist(
    (set, get) => ({
      // State
      brandDNA: null,
      isLoading: false,
      error: null,
      hasUnsavedChanges: false,

      // Actions

      /**
       * Set complete brand DNA
       */
      setBrand: (brandDNA: BrandDNA) => {
        set({
          brandDNA,
          hasUnsavedChanges: true,
          error: null,
        });
      },

      /**
       * Update colors
       */
      updateColors: (colors: Partial<BrandColors>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const updatedBrand: BrandDNA = {
          ...currentBrand,
          colors: {
            light: {
              ...currentBrand.colors.light,
              ...colors.light,
            },
            dark: {
              ...currentBrand.colors.dark,
              ...colors.dark,
            },
            chart: colors.chart || currentBrand.colors.chart,
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update typography
       */
      updateTypography: (typography: Partial<BrandTypography>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const updatedBrand: BrandDNA = {
          ...currentBrand,
          typography: {
            ...currentBrand.typography,
            ...typography,
            scale: {
              ...currentBrand.typography.scale,
              ...typography.scale,
            },
            lineHeight: {
              ...currentBrand.typography.lineHeight,
              ...typography.lineHeight,
            },
            letterSpacing: {
              ...currentBrand.typography.letterSpacing,
              ...typography.letterSpacing,
            },
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update spacing
       */
      updateSpacing: (spacing: Partial<BrandSpacing>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const updatedBrand: BrandDNA = {
          ...currentBrand,
          spacing: {
            radius: {
              ...currentBrand.spacing.radius,
              ...spacing.radius,
            },
            spacing: {
              ...currentBrand.spacing.spacing,
              ...spacing.spacing,
            },
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update assets
       */
      updateAssets: (assets: Partial<BrandAssets>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const updatedBrand: BrandDNA = {
          ...currentBrand,
          assets: {
            ...currentBrand.assets,
            ...assets,
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update metadata
       */
      updateMetadata: (metadata: Partial<BrandMetadata>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const updatedBrand: BrandDNA = {
          ...currentBrand,
          metadata: {
            ...currentBrand.metadata,
            ...metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update strategy
       */
      updateStrategy: (strategy: Partial<BrandStrategy>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const currentStrategy = currentBrand.strategy || {
          values: [],
          toneOfVoice: { traits: [] },
        };

        const updatedBrand: BrandDNA = {
          ...currentBrand,
          strategy: {
            ...currentStrategy,
            ...strategy,
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Add a brand value
       */
      addValue: (value: BrandValue) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const currentStrategy = currentBrand.strategy || {
          values: [],
          toneOfVoice: { traits: [] },
        };

        const updatedBrand: BrandDNA = {
          ...currentBrand,
          strategy: {
            ...currentStrategy,
            values: [...currentStrategy.values, value],
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Remove a brand value
       */
      removeValue: (valueId: string) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const currentStrategy = currentBrand.strategy;

        if (!currentStrategy) return;

        const updatedBrand: BrandDNA = {
          ...currentBrand,
          strategy: {
            ...currentStrategy,
            values: currentStrategy.values.filter((v) => v.id !== valueId),
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update a brand value
       */
      updateValue: (valueId: string, value: Partial<BrandValue>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const currentStrategy = currentBrand.strategy;

        if (!currentStrategy) return;

        const updatedBrand: BrandDNA = {
          ...currentBrand,
          strategy: {
            ...currentStrategy,
            values: currentStrategy.values.map((v) =>
              v.id === valueId ? { ...v, ...value } : v
            ),
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Update tone of voice
       */
      updateToneOfVoice: (tone: Partial<ToneOfVoice>) => {
        const currentBrand = get().brandDNA || getDefaultBrand();
        const currentStrategy = currentBrand.strategy || {
          values: [],
          toneOfVoice: { traits: [] },
        };

        const updatedBrand: BrandDNA = {
          ...currentBrand,
          strategy: {
            ...currentStrategy,
            toneOfVoice: {
              ...currentStrategy.toneOfVoice,
              ...tone,
            },
          },
          metadata: {
            ...currentBrand.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          brandDNA: updatedBrand,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Reset to default brand
       */
      reset: () => {
        const defaultBrand = getDefaultBrand();
        set({
          brandDNA: defaultBrand,
          hasUnsavedChanges: true,
          error: null,
        });
      },

      /**
       * Load brand from storage
       */
      loadBrand: async () => {
        set({ isLoading: true, error: null });

        try {
          const stored = localStorage.getItem("quickfy-brand-storage");
          if (stored) {
            const data = JSON.parse(stored);
            const brandDNA = data.state?.brandDNA;

            if (brandDNA) {
              // Validate loaded brand
              const validation = validateBrandDNA(brandDNA);
              if (!validation.valid) {
                throw new Error(
                  `Invalid brand data: ${validation.errors.map((e) => e.message).join(", ")}`
                );
              }

              set({
                brandDNA,
                hasUnsavedChanges: false,
                isLoading: false,
              });
            } else {
              // No brand in storage, use default
              const defaultBrand = getDefaultBrand();
              set({
                brandDNA: defaultBrand,
                hasUnsavedChanges: false,
                isLoading: false,
              });
            }
          } else {
            // No storage, use default
            const defaultBrand = getDefaultBrand();
            set({
              brandDNA: defaultBrand,
              hasUnsavedChanges: false,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to load brand",
            isLoading: false,
          });
        }
      },

      /**
       * Save brand to storage
       */
      saveBrand: async () => {
        set({ isLoading: true, error: null });

        try {
          const { brandDNA } = get();
          if (!brandDNA) {
            throw new Error("No brand data to save");
          }

          // Validate before saving
          const validation = validateBrandDNA(brandDNA);
          if (!validation.valid) {
            throw new Error(
              `Invalid brand data: ${validation.errors.map((e) => e.message).join(", ")}`
            );
          }

          // Save to localStorage (Zustand persist middleware handles this automatically)
          set({
            hasUnsavedChanges: false,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to save brand",
            isLoading: false,
          });
        }
      },

      /**
       * Import brand from JSON
       */
      importBrand: async (json: string): Promise<ValidationResult> => {
        set({ isLoading: true, error: null });

        try {
          // Validate JSON
          const validation = validateImportedJSON(json);
          if (!validation.valid) {
            set({
              error: `Invalid brand data: ${validation.errors.map((e) => e.message).join(", ")}`,
              isLoading: false,
            });
            return validation;
          }

          // Parse and set brand
          const importedBrand = JSON.parse(json) as BrandDNA;

          // Update metadata
          const brandWithUpdatedMetadata: BrandDNA = {
            ...importedBrand,
            metadata: {
              ...importedBrand.metadata,
              updatedAt: new Date().toISOString(),
            },
          };

          set({
            brandDNA: brandWithUpdatedMetadata,
            hasUnsavedChanges: true,
            isLoading: false,
          });

          return { valid: true, errors: [] };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to import brand";
          set({
            error: errorMessage,
            isLoading: false,
          });
          return {
            valid: false,
            errors: [
              {
                field: "json",
                message: errorMessage,
                code: "IMPORT_ERROR",
              },
            ],
          };
        }
      },

      /**
       * Export brand to JSON
       */
      exportBrand: (): string => {
        const { brandDNA } = get();
        if (!brandDNA) {
          throw new Error("No brand data to export");
        }

        const exportData = {
          ...brandDNA,
          exportedAt: new Date().toISOString(),
          exportVersion: "1.0.0",
        };

        return JSON.stringify(exportData, null, 2);
      },

      /**
       * Apply brand theme to DOM
       *
       * @deprecated This function is deprecated and should not be used.
       * Brand DNA variables are now applied only to preview components via
       * .brand-preview-scope selector, not globally to the entire app.
       *
       * Use BrandPreview component which handles scoped CSS automatically.
       */
      applyTheme: () => {
        console.warn(
          "[DEPRECATED] applyTheme() is deprecated. Brand DNA is now applied only to preview components, not globally."
        );

        const { brandDNA } = get();
        if (!brandDNA) {
          console.warn("No brand data to apply");
          return;
        }

        try {
          // Load Google Fonts (but don't apply them globally)
          // This only loads the font files from Google Fonts
          loadGoogleFonts(brandDNA, false);

          // Note: CSS variables are NO LONGER applied globally
          // They are applied with .brand-preview-scope selector by BrandPreview component
        } catch (error) {
          console.error("Failed to load brand fonts:", error);
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to load brand fonts",
          });
        }
      },

      /**
       * Mark changes as saved
       */
      markAsSaved: () => {
        set({ hasUnsavedChanges: false });
      },
    }),
    {
      name: "quickfy-brand-storage",
      partialize: (state) => ({
        brandDNA: state.brandDNA,
        // Don't persist loading states or errors
      }),
    }
  )
);

/**
 * Initialize brand store
 *
 * Call this on app startup to load brand from storage and apply theme
 */
export async function initializeBrandStore() {
  const store = useBrandStore.getState();

  // Load brand from storage
  await store.loadBrand();

  // Apply theme if brand exists
  if (store.brandDNA) {
    store.applyTheme();
  }
}

/**
 * Hook to get current brand DNA
 */
export function useBrand() {
  return useBrandStore((state) => state.brandDNA);
}

/**
 * Hook to check if brand has unsaved changes
 */
export function useHasUnsavedChanges() {
  return useBrandStore((state) => state.hasUnsavedChanges);
}

/**
 * Hook to get brand loading state
 */
export function useBrandLoading() {
  return useBrandStore((state) => state.isLoading);
}

/**
 * Hook to get brand error
 */
export function useBrandError() {
  return useBrandStore((state) => state.error);
}
