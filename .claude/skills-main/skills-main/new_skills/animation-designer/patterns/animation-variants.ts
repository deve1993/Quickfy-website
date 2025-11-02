// Reusable animation variant patterns for Framer Motion
import { Variants } from 'framer-motion'

// ============================================
// Entrance Animations
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const scaleInCenter: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
}

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// ============================================
// Exit Animations
// ============================================

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const slideOutLeft: Variants = {
  visible: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
}

export const slideOutRight: Variants = {
  visible: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.3 },
  },
}

export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
}

// ============================================
// Hover Effects
// ============================================

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  hover: {
    y: -5,
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    transition: { duration: 0.2 },
  },
}

export const hoverGlow: Variants = {
  rest: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
  hover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.2 },
  },
}

export const hoverRotate: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 5,
    transition: { duration: 0.2 },
  },
}

// ============================================
// Tap/Press Effects
// ============================================

export const tapScale: Variants = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export const tapPulse: Variants = {
  tap: {
    scale: [1, 0.95, 1],
    transition: { duration: 0.3 },
  },
}

// ============================================
// Stagger Containers
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const staggerSlowContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

// ============================================
// Stagger Items
// ============================================

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

// ============================================
// Modal/Dialog Variants
// ============================================

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2 },
  },
}

export const drawerSlide: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3 },
  },
}

// ============================================
// Page Transitions
// ============================================

export const pageFade: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

export const pageSlideLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export const pageSlideUp: Variants = {
  initial: { opacity: 0, y: 100 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

// ============================================
// Card Variants
// ============================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

export const cardFlip: Variants = {
  front: { rotateY: 0 },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, type: 'spring' },
  },
}

// ============================================
// Loading/Skeleton Variants
// ============================================

export const pulse: Variants = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const shimmer: Variants = {
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const spin: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// ============================================
// Attention Seekers
// ============================================

export const shake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
}

export const bounce: Variants = {
  bounce: {
    y: [0, -30, 0, -15, 0],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.5, 0.7, 1],
    },
  },
}

export const wiggle: Variants = {
  wiggle: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.5 },
  },
}

// ============================================
// Accordion/Collapse
// ============================================

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

// ============================================
// Export All Variants
// ============================================

export const variants = {
  // Entrance
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInCenter,
  rotateIn,

  // Exit
  fadeOut,
  slideOutLeft,
  slideOutRight,
  scaleOut,

  // Hover
  hoverScale,
  hoverLift,
  hoverGlow,
  hoverRotate,

  // Tap
  tapScale,
  tapPulse,

  // Stagger
  staggerContainer,
  staggerFastContainer,
  staggerSlowContainer,
  staggerItem,
  staggerItemScale,

  // Modal
  modalBackdrop,
  modalContent,
  drawerSlide,

  // Page
  pageFade,
  pageSlideLeft,
  pageSlideUp,

  // Card
  cardHover,
  cardFlip,

  // Loading
  pulse,
  shimmer,
  spin,

  // Attention
  shake,
  bounce,
  wiggle,

  // Accordion
  accordionContent,
}
