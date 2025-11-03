# Image Optimization Guide

**Complete guide for optimizing images in Quickfy**

---

## Table of Contents

- [Quick Start](#quick-start)
- [Using OptimizedImage Components](#using-optimizedimage-components)
- [Image Format Guidelines](#image-format-guidelines)
- [Performance Best Practices](#performance-best-practices)
- [Responsive Images](#responsive-images)
- [Image Placeholders](#image-placeholders)
- [Next.js Configuration](#nextjs-configuration)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Basic Image Usage

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";

// Simple image
<OptimizedImage
  src="/images/product.png"
  alt="Product Image"
  width={400}
  height={300}
/>
```

### Using Specialized Components

```tsx
import {
  AvatarImage,
  LogoImage,
  HeroImage
} from "@/components/ui/optimized-image";

// User avatar
<AvatarImage
  src={user.avatarUrl}
  alt={user.name}
  size={40}
  fallback={user.initials}
/>

// Company logo
<LogoImage
  src="/logo.svg"
  alt="Quickfy Logo"
  width={150}
  height={40}
  priority // Above-the-fold logo
/>

// Hero/banner image
<HeroImage
  src="/hero-dashboard.jpg"
  alt="Dashboard Overview"
  priority
  className="h-96"
/>
```

---

## Using OptimizedImage Components

### OptimizedImage (Base Component)

**Features:**
- Automatic lazy loading
- AVIF/WebP format optimization
- Blur-up loading effect
- Responsive sizing

**Props:**
```tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean; // Disable lazy loading for above-the-fold images
  withBlur?: boolean; // Enable/disable blur placeholder
  className?: string;
  loadingClassName?: string;
}
```

**Example:**
```tsx
<OptimizedImage
  src="/dashboard-preview.png"
  alt="Dashboard Analytics"
  width={800}
  height={600}
  priority={false} // Lazy load this image
  withBlur={true}   // Show blur effect while loading
  className="rounded-lg shadow-md"
/>
```

### AvatarImage

**Purpose:** User avatars with automatic fallbacks

**Props:**
```tsx
interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: number; // Pixel size (default: 40)
  className?: string;
  fallback?: string; // Text to show if no image
}
```

**Examples:**
```tsx
// With image
<AvatarImage
  src="/avatars/john-doe.jpg"
  alt="John Doe"
  size={48}
/>

// Without image (shows fallback)
<AvatarImage
  alt="Jane Smith"
  fallback="JS"
  size={40}
/>
```

### LogoImage

**Purpose:** Company/brand logos with priority loading

**Props:**
```tsx
interface LogoImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean; // Default: true
}
```

**Example:**
```tsx
<LogoImage
  src="/quickfy-logo.svg"
  alt="Quickfy Logo"
  width={180}
  height={50}
  priority={true} // Load immediately (above-the-fold)
/>
```

### HeroImage

**Purpose:** Large hero/banner images with responsive sizing

**Props:**
```tsx
interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean; // Default: true
  className?: string;
}
```

**Example:**
```tsx
<div className="relative h-[400px] md:h-[600px]">
  <HeroImage
    src="/hero-marketing.jpg"
    alt="Marketing Dashboard"
    priority
  />
</div>
```

---

## Image Format Guidelines

### SVG (Scalable Vector Graphics)
**✅ Use for:**
- Logos
- Icons
- Simple illustrations
- Graphics that need to scale

**Advantages:**
- Infinitely scalable
- Small file size
- No quality loss
- Easy to style with CSS

**Example:**
```tsx
<LogoImage src="/logo.svg" alt="Logo" width={150} height={40} />
```

### JPEG
**✅ Use for:**
- Photographs
- Complex images with many colors
- Marketing banners

**Optimization:**
- Quality: 80-85% for web
- Progressive JPEG for better perceived performance
- Compress with tools like TinyJPG, ImageOptim

**Example:**
```tsx
<OptimizedImage src="/team-photo.jpg" alt="Team" width={800} height={600} />
```

### PNG
**✅ Use for:**
- Images requiring transparency
- Screenshots
- Graphics with text

**Optimization:**
- Use PNG-8 for simple graphics
- PNG-24 for complex images with transparency
- Compress with TinyPNG

### WebP / AVIF
**✅ Next.js automatically converts to these formats!**
- 25-35% smaller than JPEG/PNG
- Better quality at smaller file sizes
- Automatic browser fallback

---

## Performance Best Practices

### 1. Always Specify Width and Height

```tsx
// ✅ Good - Prevents layout shift
<OptimizedImage
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
/>

// ❌ Bad - Causes layout shift
<img src="/product.jpg" alt="Product" />
```

### 2. Use Priority for Above-the-Fold Images

```tsx
// ✅ Hero image (visible immediately)
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority={true} // Loads immediately
/>

// ✅ Below-the-fold image
<OptimizedImage
  src="/feature.jpg"
  alt="Feature"
  width={600}
  height={400}
  priority={false} // Lazy loads
/>
```

### 3. Optimize Image Sizes

**Guidelines:**
- Full-width images: Max 1920px wide
- Thumbnails: 200-400px
- Avatars: 40-200px
- Icons: 16-64px

**Before upload:**
```bash
# Resize large images
# Example using ImageMagick
convert input.jpg -resize 1920x output.jpg

# Or use online tools:
# - Squoosh.app
# - TinyPNG
# - ImageOptim (Mac)
```

### 4. Use Appropriate Formats

| Use Case | Format | Size Example |
|----------|--------|--------------|
| Logo | SVG | 2-10 KB |
| Photo (small) | WebP/JPEG | 50-150 KB |
| Photo (large) | WebP/JPEG | 150-500 KB |
| Icon | SVG | 1-5 KB |
| Screenshot | PNG/WebP | 100-300 KB |

### 5. Lazy Load by Default

```tsx
// ✅ Lazy load by default (priority=false)
<OptimizedImage src="/image.jpg" alt="..." width={400} height={300} />

// Only use priority for:
// - Above-the-fold images
// - Logos in header
// - Hero images
```

---

## Responsive Images

### Using the sizes Prop

For images that change size based on viewport:

```tsx
<OptimizedImage
  src="/dashboard.jpg"
  alt="Dashboard"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 80vw,
         70vw"
/>
```

**How sizes works:**
- `100vw` = Full viewport width on mobile
- `80vw` = 80% viewport width on tablet
- `70vw` = 70% viewport width on desktop

### Responsive Example

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  <OptimizedImage
    src="/product.jpg"
    alt="Product"
    width={600}
    height={400}
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
  />
</div>
```

---

## Image Placeholders

### Blur Placeholder (Automatic)

```tsx
// Automatic blur effect while loading
<OptimizedImage
  src="/photo.jpg"
  alt="Photo"
  width={400}
  height={300}
  withBlur={true} // Default: true
/>
```

### Custom Placeholder

```tsx
<OptimizedImage
  src="/photo.jpg"
  alt="Photo"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Custom placeholder
/>
```

### Generate BlurData URLs

Use tools like:
- [Plaiceholder](https://plaiceholder.co/)
- [BlurHash](https://blurha.sh/)

---

## Next.js Configuration

### Current Configuration ([next.config.js](next.config.js:6-30))

```javascript
images: {
  // External image domains
  domains: ['localhost'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.quickfy.com',
    },
  ],
  // Formats
  formats: ['image/avif', 'image/webp'],
  // Device sizes for responsive images
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  // Image sizes for next/image
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  // Cache
  minimumCacheTTL: 60,
  // Disable optimization in dev for faster builds
  unoptimized: process.env.NODE_ENV === 'development',
}
```

### Adding External Image Domains

```javascript
// In next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.example.com',
      pathname: '/images/**',
    },
  ],
}
```

---

## Common Patterns

### Dashboard Card with Image

```tsx
import { Card } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";

function DashboardCard({ title, image }) {
  return (
    <Card>
      <OptimizedImage
        src={image}
        alt={title}
        width={400}
        height={250}
        className="rounded-t-lg"
      />
      <div className="p-4">
        <h3>{title}</h3>
      </div>
    </Card>
  );
}
```

### User Profile with Avatar

```tsx
import { AvatarImage } from "@/components/ui/optimized-image";

function UserProfile({ user }) {
  return (
    <div className="flex items-center gap-3">
      <AvatarImage
        src={user.avatar}
        alt={user.name}
        size={48}
        fallback={user.initials}
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
```

### Gallery Grid

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";

function Gallery({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <OptimizedImage
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 6} // Prioritize first 6 images
          />
        </div>
      ))}
    </div>
  );
}
```

### Background Image Pattern

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";

function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/hero-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-white">Welcome to Quickfy</h1>
      </div>
    </section>
  );
}
```

---

## Troubleshooting

### Issue: Images Not Loading

**Possible causes:**
1. **External domain not allowed**
   - Add domain to `next.config.js` `remotePatterns`

2. **Incorrect file path**
   - Images in `public/` should be referenced as `/image.jpg` (no `public/`)

3. **Missing alt attribute**
   - Always provide meaningful alt text

### Issue: Layout Shift

**Solution:**
- Always specify `width` and `height`
- Or use `fill` with a container that has defined dimensions

```tsx
// ✅ Fixed dimensions
<OptimizedImage src="/img.jpg" alt="..." width={400} height={300} />

// ✅ Fill parent (parent must have dimensions)
<div className="relative h-64 w-full">
  <OptimizedImage src="/img.jpg" alt="..." fill />
</div>
```

### Issue: Images Too Large

**Solution:**
- Resize before uploading
- Use appropriate format (JPEG for photos, PNG for transparency, SVG for graphics)
- Compress with tools like TinyPNG

**Target sizes:**
- Thumbnail: < 50 KB
- Medium image: < 200 KB
- Large image: < 500 KB
- SVG: < 10 KB

### Issue: Slow Loading

**Solutions:**
1. **Use priority for above-the-fold images**
2. **Lazy load below-the-fold images**
3. **Optimize image sizes**
4. **Use WebP/AVIF formats** (automatic with Next.js)
5. **Implement blur placeholders**

---

## Image Checklist

Before adding images to the project:

- [ ] Image is properly sized (not larger than needed)
- [ ] Image is compressed (< 500 KB for large images)
- [ ] Using appropriate format (SVG for logos, JPEG for photos)
- [ ] Width and height specified (or using fill with container)
- [ ] Alt text is descriptive and meaningful
- [ ] Using OptimizedImage components
- [ ] Priority set correctly (true for above-fold, false for below-fold)
- [ ] Responsive sizes configured if needed

---

## Additional Resources

- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Image Compression Tools](https://tinypng.com/)
- [SVG Optimization](https://jakearchibald.github.io/svgomg/)

---

**Questions or issues?** Check the [README](./README.md) or ask the development team.
