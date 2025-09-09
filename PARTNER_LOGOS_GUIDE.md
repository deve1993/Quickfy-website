# Partner Logos Management System

This document explains how to manage partner logos in the QuickFy website.

## File Structure

```
├── public/logos/                    # SVG logo files
│   ├── techitalia.svg
│   ├── innovatecorp.svg
│   └── ...
├── src/
│   ├── types/partners.ts           # TypeScript types
│   ├── config/partners.ts          # Logo configuration
│   ├── hooks/usePartnerLogos.ts    # Custom hook (optional)
│   └── components/sections/
│       └── LogosSection.tsx        # Updated component
```

## How to Add a New Partner Logo

### Step 1: Add the SVG File
1. Create or obtain the partner's logo in SVG format
2. Save it to `public/logos/[company-name].svg`
3. Ensure the SVG has proper dimensions and is optimized

### Step 2: Update Configuration
1. Open `src/config/partners.ts`
2. Add a new entry to the `logos` array:

```typescript
{
  id: 'new-company',                    // Unique identifier
  name: 'New Company',                  // Display name
  logoPath: '/logos/new-company.svg',   // Path to SVG file
  width: 130,                          // Display width
  height: 40,                          // Display height
  website: 'https://newcompany.com',   // Optional website URL
  alt: 'New Company logo',             // Optional alt text
  enabled: true,                       // Enable/disable display
  order: 7                            // Display order (lower = first)
}
```

### Step 3: Test
1. Run `npm run dev`
2. Check that the new logo appears in the carousel
3. Verify hover effects and links work correctly

## Managing Existing Logos

### Temporarily Hide a Logo
Set `enabled: false` in the configuration:

```typescript
{
  id: 'company-to-hide',
  // ... other properties
  enabled: false,  // This will hide the logo
  // ... rest of config
}
```

### Change Display Order
Modify the `order` property:

```typescript
{
  id: 'company-name',
  // ... other properties
  order: 1,  // Lower numbers appear first
  // ... rest of config
}
```

### Update Logo Design
1. Replace the SVG file in `public/logos/`
2. Update dimensions in config if needed
3. Clear browser cache to see changes

## Configuration Options

### Animation Settings
```typescript
animation: {
  scrollDuration: 20,    // Seconds for one complete scroll
  enabled: true          // Enable/disable animation
}
```

### Display Settings
```typescript
display: {
  gap: 'gap-8 md:gap-12',      // Tailwind gap classes
  showHoverEffects: true       // Enable/disable hover effects
}
```

## Logo Design Guidelines

### SVG Requirements
- **Format**: SVG only
- **Dimensions**: Recommended 100-150px width, 30-50px height
- **Colors**: Use partner's official colors
- **Background**: Transparent
- **Optimization**: Minimize file size

### Design Consistency
- Keep similar visual weight across logos
- Ensure legibility at small sizes
- Test contrast against the background
- Consider grayscale filter effect

### Example SVG Structure
```svg
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Logo content -->
  <text x="60" y="25" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Company Name
  </text>
</svg>
```

## Advanced Usage

### Using the Custom Hook
```typescript
import { usePartnerLogos } from '@/hooks/usePartnerLogos';

function MyComponent() {
  const { logos, getPartner, stats } = usePartnerLogos();
  
  // Get specific partner
  const techItalia = getPartner('techitalia');
  
  // Get random 3 logos
  const randomLogos = getRandomLogos(3);
  
  // Display stats
  console.log(`${stats.enabled} out of ${stats.total} logos enabled`);
}
```

### Dynamic Logo Management
```typescript
import { addPartner } from '@/config/partners';

// Add new partner dynamically
addPartner({
  name: 'Dynamic Company',
  logoPath: '/logos/dynamic-company.svg',
  width: 125,
  height: 40,
  enabled: true,
  order: 100
});
```

## Troubleshooting

### Logo Not Displaying
1. Check file path is correct (`/logos/filename.svg`)
2. Verify `enabled: true` in configuration
3. Ensure SVG file is valid and accessible
4. Check browser console for errors

### Animation Issues
1. Verify `animation.enabled: true`
2. Check if logos array has enough items (minimum 3 recommended)
3. Test with `animation.scrollDuration` adjusted

### Performance Considerations
- Keep SVG files under 10KB each
- Limit total number of enabled logos (6-12 recommended)
- Use `priority={false}` for Image components (already implemented)
- Consider lazy loading for large logo sets

## File Locations Summary

- **Logo files**: `public/logos/[company-name].svg`
- **Configuration**: `src/config/partners.ts`
- **Types**: `src/types/partners.ts`
- **Component**: `src/components/sections/LogosSection.tsx`
- **Hook**: `src/hooks/usePartnerLogos.ts`