---
name: animation-designer
description: Create advanced animations with Framer Motion, gesture handling, micro-interactions, spring physics, orchestration, and performance optimization for UI components
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Animation Designer

Expert skill for creating production-ready animations for UI components. Specializes in Framer Motion, gesture interactions, spring physics, animation orchestration, scroll-triggered animations, and performance optimization.

## Core Capabilities

### 1. Animation Types
- **Entrance Animations**: Fade, slide, scale, rotate on mount
- **Exit Animations**: Smooth transitions on unmount
- **Hover Effects**: Interactive micro-interactions
- **Gesture Animations**: Drag, tap, pan gestures
- **Scroll Animations**: Parallax, scroll-triggered effects
- **Layout Animations**: Automatic layout transitions
- **Keyframe Animations**: Complex multi-step animations
- **SVG Animations**: Path drawing, morphing

### 2. Framer Motion Integration
- **Motion Components**: Animated variants of HTML elements
- **Variants**: Reusable animation states
- **Animation Controls**: Programmatic animation control
- **Shared Layout**: Smooth transitions between components
- **AnimatePresence**: Exit animations for removed elements
- **useMotionValue**: Low-level animation control
- **useSpring**: Spring physics animations

### 3. Gesture Handling
- **Drag**: Draggable elements with constraints
- **Hover**: Hover effects with scale/color changes
- **Tap**: Press animations and haptic feedback
- **Pan**: Swipe gestures with momentum
- **Focus**: Keyboard focus animations
- **Constraints**: Limit drag areas
- **Momentum**: Inertia-based animations

### 4. Spring Physics
- **Natural Motion**: Physics-based springs
- **Stiffness**: Control spring tension
- **Damping**: Control oscillation
- **Mass**: Control inertia
- **Presets**: Quick spring configurations
- **Velocity**: Initial velocity control

### 5. Animation Orchestration
- **Stagger Children**: Cascade animations
- **Sequence**: Chain animations
- **Delay**: Time-based delays
- **When**: Conditional orchestration
- **Repeat**: Loop animations
- **YoYo**: Reverse animations

### 6. Performance
- **GPU Acceleration**: Use transform/opacity
- **Will-change**: Hint browser for optimization
- **Reduce Motion**: Respect user preferences
- **Lazy Animation**: Animate only in viewport
- **Layout Thrashing**: Avoid forced reflows
- **Animation Budget**: 60fps target

## Workflow

### Phase 1: Animation Planning
1. **Define Goals**
   - What should animate?
   - Purpose of animation?
   - Interaction triggers?
   - Duration and timing?

2. **Choose Animation Type**
   - Simple transitions?
   - Complex sequences?
   - Gesture-based?
   - Scroll-triggered?

3. **Plan Performance**
   - Animation budget?
   - Mobile considerations?
   - Reduced motion support?

### Phase 2: Implementation
1. **Set Up Framer Motion**
   - Install dependencies
   - Create motion components
   - Define variants

2. **Implement Animations**
   - Basic transitions
   - Gesture handlers
   - Spring configurations
   - Animation controls

3. **Add Orchestration**
   - Stagger children
   - Sequence animations
   - Conditional logic

### Phase 3: Polish & Optimize
1. **Fine-tune Timing**
   - Adjust duration
   - Modify easing
   - Test spring values

2. **Optimize Performance**
   - Use GPU properties only
   - Add will-change hints
   - Implement reduced motion

3. **Test Interactions**
   - Test all gestures
   - Verify animations
   - Check accessibility

## Animation Patterns

### Basic Entrance Animation

```typescript
// FadeIn.tsx
import { motion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Variants Pattern (Reusable States)

```typescript
// AnimatedCard.tsx
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="card"
    >
      {children}
    </motion.div>
  )
}
```

### Stagger Children Animation

```typescript
// StaggerList.tsx
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
}

interface StaggerListProps {
  items: string[]
}

export function StaggerList({ items }: StaggerListProps) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Draggable Component

```typescript
// DraggableBox.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion'

export function DraggableBox() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Rotate based on drag position
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        cursor: 'grab',
      }}
      className="draggable-box"
    >
      Drag me!
    </motion.div>
  )
}
```

### Spring Animation

```typescript
// BouncyButton.tsx
import { motion } from 'framer-motion'

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
  mass: 1,
}

interface BouncyButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function BouncyButton({ children, onClick }: BouncyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={springConfig}
      onClick={onClick}
      className="bouncy-button"
    >
      {children}
    </motion.button>
  )
}
```

### Scroll-Triggered Animation

```typescript
// ScrollFadeIn.tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ScrollFadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div ref={ref} style={{ opacity, scale }}>
      {children}
    </motion.div>
  )
}
```

### AnimatePresence for Exit Animations

```typescript
// Modal.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-content"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Shared Layout Animation

```typescript
// TabNav.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Home', 'About', 'Contact', 'Blog']

export function TabNav() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tab-nav">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={activeTab === index ? 'active' : ''}
          style={{ position: 'relative' }}
        >
          {tab}

          {activeTab === index && (
            <motion.div
              layoutId="active-tab-indicator"
              className="tab-indicator"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

### Path Drawing Animation

```typescript
// AnimatedLogo.tsx
import { motion } from 'framer-motion'

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

export function AnimatedLogo() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <motion.path
        d="M 50 100 L 150 100 M 100 50 L 100 150"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  )
}
```

### Programmatic Animation Control

```typescript
// ControlledAnimation.tsx
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export function ControlledAnimation() {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ scale: 1.5, transition: { duration: 0.5 } })
      await controls.start({ rotate: 180, transition: { duration: 0.5 } })
      await controls.start({ scale: 1, rotate: 0, transition: { duration: 0.5 } })
    }

    sequence()
  }, [controls])

  return (
    <motion.div animate={controls} className="controlled-box">
      Controlled Animation
    </motion.div>
  )
}
```

### Infinite Loop Animation

```typescript
// PulsingCircle.tsx
import { motion } from 'framer-motion'

export function PulsingCircle() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="pulsing-circle"
    />
  )
}
```

## Advanced Patterns

### Gesture-Based Card Stack

```typescript
// CardStack.tsx
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState } from 'react'

interface Card {
  id: number
  content: string
}

export function CardStack({ cards }: { cards: Card[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-45, 45])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100

    if (Math.abs(info.offset.x) > swipeThreshold) {
      // Swiped
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    }
  }

  return (
    <div className="card-stack">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        className="card"
      >
        {cards[currentIndex].content}
      </motion.div>
    </div>
  )
}
```

### Parallax Scroll Effect

```typescript
// ParallaxSection.tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  )
}
```

### Morphing Shape

```typescript
// MorphingShape.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'

const shapes = {
  circle: 'M 100 50 A 50 50 0 1 1 100 150 A 50 50 0 1 1 100 50',
  square: 'M 50 50 L 150 50 L 150 150 L 50 150 Z',
  triangle: 'M 100 50 L 150 150 L 50 150 Z',
}

export function MorphingShape() {
  const [shape, setShape] = useState<keyof typeof shapes>('circle')

  return (
    <>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <motion.path
          d={shapes[shape]}
          fill="currentColor"
          initial={false}
          animate={{ d: shapes[shape] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>

      <div className="shape-controls">
        {Object.keys(shapes).map((s) => (
          <button key={s} onClick={() => setShape(s as keyof typeof shapes)}>
            {s}
          </button>
        ))}
      </div>
    </>
  )
}
```

### Page Transition

```typescript
// PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Performance Optimization

### GPU-Accelerated Properties

```typescript
// Only animate these properties for best performance:
// - transform (scale, rotate, translateX, translateY)
// - opacity

// ✅ GOOD - GPU accelerated
<motion.div
  animate={{
    x: 100,        // translateX
    y: 100,        // translateY
    scale: 1.5,
    rotate: 45,
    opacity: 0.5,
  }}
/>

// ❌ BAD - Causes layout thrashing
<motion.div
  animate={{
    width: '500px',   // Triggers layout
    height: '500px',  // Triggers layout
    top: '100px',     // Triggers layout
    left: '100px',    // Triggers layout
  }}
/>
```

### Reduced Motion Support

```typescript
// RespectReducedMotion.tsx
import { motion, useReducedMotion } from 'framer-motion'

export function RespectReducedMotion({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Lazy Animation (Viewport Detection)

```typescript
// LazyAnimation.tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function LazyAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### Will-Change Optimization

```typescript
// OptimizedAnimation.tsx
import { motion } from 'framer-motion'

export function OptimizedAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{
        // Hint browser to optimize these properties
        willChange: 'transform, opacity',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}
```

## Best Practices

### Animation Timing
1. **Micro-interactions**: 100-300ms (button hover, tap)
2. **Component transitions**: 300-500ms (modal open, page transition)
3. **Complex sequences**: 500-1000ms (multi-step animations)
4. **Ambient animations**: 2-5s (infinite loops, breathing effects)

### Easing Functions
- **easeOut**: Entrances (starts fast, ends slow)
- **easeIn**: Exits (starts slow, ends fast)
- **easeInOut**: Smooth both ways (default for most)
- **linear**: Constant speed (loading indicators)
- **spring**: Natural, physics-based (interactive elements)

### Accessibility
1. **Respect prefers-reduced-motion**: Always check and disable/simplify animations
2. **Keep focus visible**: Don't animate elements that have focus
3. **Avoid flashing**: No animations faster than 3 flashes per second
4. **Provide alternatives**: Offer non-animated version if needed
5. **Test with screen readers**: Ensure animations don't interfere

### Performance
1. **60 FPS Target**: Keep animations smooth
2. **Use transform/opacity**: GPU-accelerated properties only
3. **Avoid layout animations**: Don't animate width/height/position
4. **Lazy load animations**: Only animate when in viewport
5. **Batch animations**: Group simultaneous animations
6. **Profile regularly**: Use DevTools Performance tab

### UX Guidelines
1. **Purpose-driven**: Every animation should have a reason
2. **Subtle by default**: Don't distract from content
3. **Consistent timing**: Use animation system/tokens
4. **Interruptible**: Allow users to skip/cancel animations
5. **Contextual**: Match animation to the action

## When to Use This Skill

Activate this skill when you need to:
- Add entrance/exit animations to components
- Create hover effects and micro-interactions
- Implement drag-and-drop functionality
- Build gesture-based interfaces
- Add scroll-triggered animations
- Create page transitions
- Animate SVG graphics
- Optimize animation performance
- Implement shared layout transitions
- Build complex animation sequences

## Output Format

When creating animations, provide:
1. **Complete Animation Component**: Production-ready code with Framer Motion
2. **Variants Definition**: Reusable animation states
3. **Spring Configurations**: Fine-tuned physics parameters
4. **Performance Notes**: GPU optimization and reduced motion support
5. **Accessibility Considerations**: A11y compliance details
6. **Usage Examples**: How to integrate animations

Always create animations that are smooth, purposeful, performant, and accessible.
