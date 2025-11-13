# Background System

## Overview

A comprehensive parallax background system for the QuickFy website featuring animated line patterns with moderate intensity and mobile optimization.

## Components

### BackgroundSystem
Main wrapper component that coordinates all background layers:
- **Location**: `src/components/ui/BackgroundSystem.tsx`
- **Integration**: Added to the root layout for global coverage
- **Features**: Error boundaries, performance optimization, layered effects

### ParallaxBackground
Core parallax animation component with line patterns:
- **Location**: `src/components/ui/ParallaxBackground.tsx`
- **Features**: 
  - Scroll-based parallax effects
  - Dynamic line generation with various sizes
  - Mobile-optimized performance
  - Accessibility compliance (respects reduced motion preferences)

### AmbientOverlay
Subtle ambient effects for depth and cohesion:
- **Location**: `src/components/ui/AmbientOverlay.tsx`
- **Features**: Radial gradients, animated noise texture

## Performance Features

### Mobile Optimization
- Reduced element count on mobile devices
- Lower animation intensity for better performance
- Respects device capabilities and connection speed

### Accessibility
- Honors `prefers-reduced-motion` setting
- Graceful degradation on low-end devices
- No interference with screen readers

### Browser Support
- Uses modern CSS features with fallbacks
- Hardware acceleration with `will-change`
- Optimized for all major browsers

## Configuration

The system automatically configures based on:
- Device type (desktop/mobile)
- Hardware capabilities
- User preferences (motion sensitivity)
- Network connection quality

## Styling

### Colors Used
- Very light gray tones: `rgba(248, 250, 252, 0.02)` to `rgba(226, 232, 240, 0.08)`
- Blur effects: 0.5px to 2px for softness
- Gradient transitions for natural appearance

### Animation Characteristics
- **Intensity**: Moderate (visible but not distracting)
- **Density**: Mix of 60-80 elements depending on device
- **Speed**: Varied parallax speeds for depth perception
- **Pattern**: Line-based with multiple orientations

## Integration

The background system is automatically included in all pages through the root layout (`src/app/[locale]/layout.tsx`) and requires no additional setup for new pages or sections.

## Browser Performance

- **Desktop**: Full animation with 80+ elements
- **Mobile**: Optimized with 60 elements and reduced intensity
- **Low-end devices**: Minimal configuration with 50 elements
- **Reduced motion**: Completely disabled when user prefers less motion

The system provides complete coverage across all sections and future pages while maintaining excellent performance on all devices.