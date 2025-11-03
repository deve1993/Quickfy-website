# Brand DNA System

Complete brand identity management system for Quickfy. Configure colors, typography, logos, and create a cohesive brand experience across your application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Components](#components)
- [API Reference](#api-reference)
- [Templates](#templates)
- [Export & Import](#export--import)
- [Best Practices](#best-practices)

---

## Overview

The Brand DNA System allows you to:

- **Define Colors**: Complete color palette with light/dark theme support
- **Manage Typography**: Choose Google Fonts and customize scales
- **Upload Assets**: Logos, favicons, and brand images
- **Live Preview**: See changes in real-time before applying
- **Export/Import**: Share brand configurations across teams
- **Templates**: Start with professionally designed presets

**Location**: `/dashboard/brand`

---

## Features

### 🎨 Color Management

- **Semantic Colors**: Primary, secondary, accent, destructive, muted
- **System Colors**: Background, foreground, card, border, input, ring
- **Chart Colors**: 5-color palette for data visualization
- **Light/Dark Themes**: Separate palettes for each theme
- **WCAG Validation**: Real-time contrast checking (AA/AAA compliance)
- **HSL Format**: Easy color manipulation with Hue, Saturation, Lightness

### ✍️ Typography System

- **20+ Google Fonts**: Curated selection across categories
- **Font Pairing**: Pre-selected combinations that work well
- **Typography Scale**: 13 sizes (xs to 9xl)
- **Line Height**: Tight, normal, relaxed options
- **Letter Spacing**: Fine-tune character spacing
- **Live Preview**: See fonts in context immediately

### 🖼️ Asset Management

- **Primary Logo**: Main brand logo (light/dark variants)
- **Secondary Logo**: Alternative logo for specific contexts
- **Favicon**: Browser tab icon
- **Automatic Optimization**: Resize and compress uploads
- **Drag & Drop**: Easy file upload interface
- **Format Support**: PNG, JPG, SVG, WebP (max 5MB)

### 👁️ Live Preview

- **Component Showcase**: See brand applied to real UI elements
- **Theme Switching**: Toggle between light and dark instantly
- **Responsive Preview**: Mobile, tablet, desktop views
- **Before/After Comparison**: Compare with original settings
- **Grid Overlay**: Design alignment assistance

### 📦 Export & Import

- **Multiple Formats**:
  - JSON (full configuration)
  - CSS (CSS variables)
  - Tailwind (tailwind.config.js)
  - TypeScript (type-safe constants)
- **Shareable Links**: Base64 encoded for easy sharing
- **Validation**: Import checks for errors and warnings
- **Migration**: Backwards compatibility support

### 🎭 Templates

5 pre-configured brand identities:

1. **Default**: Modern Quickfy blue theme
2. **Minimal**: Clean neutral grayscale
3. **Vibrant**: Bold purple and pink
4. **Professional**: Corporate deep blue with serif
5. **Creative**: Artistic magenta and yellow

---

## Getting Started

### Accessing Brand DNA

Navigate to **Dashboard → Brand Identity** or visit `/dashboard/brand`

### Quick Start

1. **Choose a Template** (optional)
   - Go to "Templates" tab
   - Click "Apply Template" on any preset
   - Customize to your needs

2. **Configure Colors**
   - Go to "Colors" tab
   - Adjust primary, secondary, accent colors
   - Switch between light/dark themes
   - Check contrast ratios

3. **Select Fonts**
   - Go to "Typography" tab
   - Choose heading and body fonts
   - Adjust font scale if needed

4. **Upload Assets**
   - Go to "Assets" tab
   - Upload logos (light and dark versions)
   - Add favicon

5. **Preview & Save**
   - Review live preview
   - Compare before/after
   - Click "Save Changes"

---

## Architecture

### File Structure

```
src/
├── app/
│   └── dashboard/
│       └── brand/
│           ├── page.tsx          # Main Brand DNA page
│           └── layout.tsx         # Page layout
├── components/
│   ├── brand/
│   │   ├── ColorPicker.tsx       # HSL color picker
│   │   ├── ColorPalette.tsx      # Complete palette manager
│   │   ├── ColorScale.tsx        # Scale generator (50-900)
│   │   ├── ContrastChecker.tsx   # WCAG validator
│   │   ├── FontSelector.tsx      # Google Fonts browser
│   │   ├── FontPreview.tsx       # Font display
│   │   ├── TypographyScale.tsx   # Scale editor
│   │   ├── LogoUploader.tsx      # Drag & drop upload
│   │   ├── LogoPreview.tsx       # Logo display
│   │   ├── AssetManager.tsx      # Asset management
│   │   ├── BrandPreview.tsx      # Live preview
│   │   ├── ComponentShowcase.tsx # UI showcase
│   │   ├── PreviewControls.tsx   # Preview options
│   │   ├── BeforeAfter.tsx       # Comparison view
│   │   └── TemplateSelector.tsx  # Template browser
│   └── providers/
│       └── BrandProvider.tsx     # App-wide provider
├── store/
│   └── useBrandStore.ts          # Zustand store
├── lib/
│   └── brand/
│       ├── brandDefaults.ts      # Default configuration
│       ├── brandValidator.ts     # Validation & WCAG
│       ├── brandVariables.ts     # CSS generation
│       ├── cssInjector.ts        # Runtime injection
│       ├── brandExporter.ts      # Export utilities
│       ├── brandImporter.ts      # Import utilities
│       ├── googleFonts.ts        # Font catalog
│       ├── imageOptimizer.ts     # Image processing
│       └── templates/
│           ├── index.ts
│           ├── default.ts
│           ├── minimal.ts
│           ├── vibrant.ts
│           ├── professional.ts
│           └── creative.ts
└── types/
    └── brand.ts                  # TypeScript types
```

### Data Flow

```
User Action
    ↓
Component (UI)
    ↓
useBrandStore (Zustand)
    ↓
localStorage (Persistence)
    ↓
BrandProvider (Application)
    ↓
CSS Variables (Runtime)
```

---

## Components

### ColorPicker

Interactive HSL color picker with sliders for Hue, Saturation, and Lightness.

```tsx
import { ColorPicker } from "@/components/brand/ColorPicker";

<ColorPicker
  value="221.2 83.2% 53.3%"
  onChange={(color) => console.log(color)}
  label="Primary Color"
  description="Main brand color"
/>
```

### FontSelector

Browse and select from 20+ Google Fonts with live preview.

```tsx
import { FontSelector } from "@/components/brand/FontSelector";

<FontSelector
  value={currentFont}
  onChange={(font) => updateFont(font)}
  category="sans-serif"
  previewText="The quick brown fox"
/>
```

### BrandPreview

Live preview of brand applied to UI components.

```tsx
import { BrandPreview } from "@/components/brand/BrandPreview";

<BrandPreview
  brandDNA={brandDNA}
  showControls={true}
  initialTheme="light"
/>
```

---

## API Reference

### useBrandStore

Zustand store for brand management.

```tsx
import { useBrandStore } from "@/store/useBrandStore";

const {
  brandDNA,              // Current brand DNA
  hasUnsavedChanges,     // Unsaved changes flag
  isLoading,             // Loading state
  setBrand,              // Set complete brand
  updateColors,          // Update colors
  updateTypography,      // Update typography
  updateAssets,          // Update assets
  updateMetadata,        // Update metadata
  reset,                 // Reset to default
  saveBrand,             // Save to localStorage
  applyTheme,            // Apply to DOM
} = useBrandStore();
```

### Custom Hooks

```tsx
// Get brand DNA
const brandDNA = useBrandDNA();

// Get colors for theme
const colors = useBrandColors("light");

// Get specific color
const primary = useBrandColor("primary", "light");

// Get typography
const typography = useBrandTypography();

// Get font
const headingFont = useBrandFont("heading");

// Get assets
const assets = useBrandAssets();
const logoUrl = usePrimaryLogo("light");
```

---

## Templates

### Using Templates

```tsx
import { BRAND_TEMPLATES } from "@/lib/brand/templates";
import { useBrandStore } from "@/store/useBrandStore";

const { setBrand, applyTheme } = useBrandStore();

// Apply template
const applyTemplate = (templateId: string) => {
  const template = BRAND_TEMPLATES.find(t => t.id === templateId);
  if (template) {
    setBrand(template.brandDNA);
    applyTheme();
  }
};
```

### Creating Custom Templates

```tsx
import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "@/lib/brand/brandDefaults";

export const myTemplate: BrandTemplate = {
  id: "my-template",
  name: "My Custom Template",
  description: "Custom brand identity",
  category: "default",
  brandDNA: {
    ...getDefaultBrand(),
    colors: {
      // Your custom colors
    },
    typography: {
      // Your custom typography
    },
  },
};
```

---

## Export & Import

### Exporting

```tsx
import { downloadBrand, copyBrandToClipboard } from "@/lib/brand/brandExporter";

// Download as JSON
downloadBrand(brandDNA, "json");

// Download as CSS
downloadBrand(brandDNA, "css");

// Download as Tailwind config
downloadBrand(brandDNA, "tailwind");

// Copy to clipboard
await copyBrandToClipboard(brandDNA, "json");
```

### Importing

```tsx
import { importFromFile, importFromJSON } from "@/lib/brand/brandImporter";

// Import from file
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".json";
fileInput.onchange = async (e) => {
  const file = e.target.files[0];
  const result = await importFromFile(file);

  if (result.success && result.brandDNA) {
    setBrand(result.brandDNA);
    applyTheme();
  } else {
    console.error(result.error);
  }
};
fileInput.click();

// Import from JSON string
const result = importFromJSON(jsonString);
```

---

## Best Practices

### Color Selection

- **Accessibility First**: Always check WCAG contrast ratios
- **Consistent Palette**: Use your brand colors consistently
- **Dark Mode**: Ensure readability in both themes
- **Test Thoroughly**: Preview on different devices

### Typography

- **Limit Fonts**: Use 2-3 fonts maximum
- **Hierarchy**: Establish clear heading hierarchy
- **Readability**: Body text should be easily readable (16px minimum)
- **Performance**: Limit font weights to reduce load time

### Assets

- **Optimize Images**: Keep file sizes under 1MB
- **SVG Preferred**: Use SVG for logos when possible
- **Multiple Variants**: Provide light/dark logo versions
- **Proper Sizing**: Upload high-resolution images

### Performance

- **Lazy Loading**: Assets are loaded on demand
- **Font Subsetting**: Only load required font weights
- **CSS Variables**: Efficient theme switching
- **localStorage**: Fast local persistence

---

## Troubleshooting

### Brand Not Applying

1. Check if `BrandProvider` is in `providers.tsx`
2. Clear localStorage: `localStorage.removeItem("quickfy-brand-storage")`
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Import Errors

- Verify JSON format is correct
- Check all required fields are present
- Ensure color values are valid HSL format

### Font Not Loading

- Check internet connection (Google Fonts CDN)
- Verify font name spelling
- Clear browser cache

---

## Version History

- **v1.2.0** - Brand DNA System
- **v1.1.0** - Image optimization & accessibility
- **v1.0.0** - Initial release

---

## Support

For issues or questions:
- GitHub: https://github.com/deve1993/frontend-web-app-quickfy
- Documentation: `/BRAND_DNA.md`

---

**Built with ❤️ by the Quickfy Team**
