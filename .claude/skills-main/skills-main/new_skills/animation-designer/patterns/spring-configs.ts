// Spring configuration presets for Framer Motion
// Based on natural motion principles and common use cases

export type SpringConfig = {
  type: 'spring'
  stiffness: number
  damping: number
  mass?: number
  restDelta?: number
  restSpeed?: number
}

// ============================================
// Presets
// ============================================

/**
 * Gentle spring for subtle animations
 * Use for: Background elements, ambient animations
 */
export const gentle: SpringConfig = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
  mass: 1,
}

/**
 * Default spring for most interactions
 * Use for: Cards, buttons, modals
 */
export const default_: SpringConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
}

/**
 * Snappy spring for quick responses
 * Use for: Toggle switches, checkboxes, tabs
 */
export const snappy: SpringConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
}

/**
 * Bouncy spring with overshoot
 * Use for: Attention-grabbing elements, success messages
 */
export const bouncy: SpringConfig = {
  type: 'spring',
  stiffness: 600,
  damping: 15,
  mass: 1,
}

/**
 * Slow spring for dramatic effect
 * Use for: Hero sections, large modals, page transitions
 */
export const slow: SpringConfig = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
  mass: 2,
}

/**
 * Wobbly spring with lots of bounce
 * Use for: Playful interactions, error shakes
 */
export const wobbly: SpringConfig = {
  type: 'spring',
  stiffness: 180,
  damping: 8,
  mass: 1,
}

/**
 * Stiff spring with minimal bounce
 * Use for: Precise movements, drag handles
 */
export const stiff: SpringConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 1,
}

/**
 * Molasses spring - very slow and smooth
 * Use for: Parallax effects, smooth scrolling
 */
export const molasses: SpringConfig = {
  type: 'spring',
  stiffness: 50,
  damping: 20,
  mass: 3,
}

// ============================================
// Specific Use Cases
// ============================================

/**
 * Button press animation
 */
export const buttonPress: SpringConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
  mass: 0.5,
}

/**
 * Modal/Dialog open
 */
export const modalOpen: SpringConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.8,
}

/**
 * Drawer slide
 */
export const drawerSlide: SpringConfig = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
  mass: 1,
}

/**
 * Tab indicator movement
 */
export const tabIndicator: SpringConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

/**
 * Drag and drop
 */
export const dragAndDrop: SpringConfig = {
  type: 'spring',
  stiffness: 600,
  damping: 20,
  mass: 1,
}

/**
 * Toast notification
 */
export const toast: SpringConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.7,
}

/**
 * Accordion expand/collapse
 */
export const accordion: SpringConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
}

/**
 * Tooltip appearance
 */
export const tooltip: SpringConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  mass: 0.5,
}

// ============================================
// Custom Configuration Helpers
// ============================================

/**
 * Create a custom spring config
 */
export function createSpring(
  stiffness: number,
  damping: number,
  mass: number = 1
): SpringConfig {
  return {
    type: 'spring',
    stiffness,
    damping,
    mass,
  }
}

/**
 * Modify an existing spring preset
 */
export function modifySpring(
  preset: SpringConfig,
  overrides: Partial<SpringConfig>
): SpringConfig {
  return {
    ...preset,
    ...overrides,
  }
}

// ============================================
// Spring Parameter Guidelines
// ============================================

/*
STIFFNESS (how strong the spring is):
- Low (50-150): Slow, loose springs
- Medium (200-400): Natural feeling
- High (500-1000): Fast, tight springs

DAMPING (how much oscillation):
- Low (5-15): Lots of bounce
- Medium (20-30): Some bounce
- High (40-60): Minimal bounce

MASS (how heavy the element feels):
- Low (0.5-0.8): Light, quick
- Medium (1): Standard
- High (2-5): Heavy, slow

EXAMPLES:

Gentle floating:
{ stiffness: 100, damping: 10, mass: 1 }

Quick snap:
{ stiffness: 500, damping: 30, mass: 0.5 }

Playful bounce:
{ stiffness: 300, damping: 12, mass: 1 }

Smooth slide:
{ stiffness: 200, damping: 25, mass: 2 }
*/

// ============================================
// Export All Presets
// ============================================

export const springs = {
  // General presets
  gentle,
  default: default_,
  snappy,
  bouncy,
  slow,
  wobbly,
  stiff,
  molasses,

  // Specific use cases
  buttonPress,
  modalOpen,
  drawerSlide,
  tabIndicator,
  dragAndDrop,
  toast,
  accordion,
  tooltip,
}

// ============================================
// Usage Examples
// ============================================

/*
import { springs } from './spring-configs'
import { motion } from 'framer-motion'

// Using a preset
<motion.div
  animate={{ scale: 1.2 }}
  transition={springs.bouncy}
/>

// Using a specific use case
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={springs.buttonPress}
/>

// Modifying a preset
<motion.div
  animate={{ x: 100 }}
  transition={modifySpring(springs.default, { mass: 2 })}
/>

// Creating a custom spring
<motion.div
  animate={{ opacity: 1 }}
  transition={createSpring(200, 20, 1.5)}
/>
*/
