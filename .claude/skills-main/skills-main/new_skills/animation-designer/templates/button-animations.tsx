// Button animation templates with various effects
import { motion } from 'framer-motion'

// ============================================
// Spring Button (Natural bounce)
// ============================================

export function SpringButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      onClick={onClick}
      className="button"
    >
      {children}
    </motion.button>
  )
}

// ============================================
// Glow Button (Hover glow effect)
// ============================================

export function GlowButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="button"
    >
      {children}
    </motion.button>
  )
}

// ============================================
// Slide Button (Text slides in)
// ============================================

export function SlideButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      className="button"
    >
      {children}
    </motion.button>
  )
}

// ============================================
// Ripple Button (Click ripple effect)
// ============================================

import { useState } from 'react'

export function RippleButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)

    onClick?.()
  }

  return (
    <button onClick={handleClick} className="button ripple-button" style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </button>
  )
}

// ============================================
// Loading Button (Shows loading state)
// ============================================

export function LoadingButton({
  children,
  onClick,
  isLoading,
}: {
  children: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
}) {
  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.05 } : undefined}
      whileTap={!isLoading ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={isLoading}
      className="button"
      style={{ position: 'relative' }}
    >
      <motion.span
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 0.2 },
            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            border: '2px solid white',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
      )}
    </motion.button>
  )
}

// ============================================
// Magnetic Button (Follows cursor)
// ============================================

import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      className="button"
    >
      {children}
    </motion.button>
  )
}

// ============================================
// Shake Button (Error shake)
// ============================================

import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export function ShakeButton({
  children,
  onClick,
  triggerShake,
}: {
  children: React.ReactNode
  onClick?: () => void
  triggerShake?: boolean
}) {
  const controls = useAnimation()

  useEffect(() => {
    if (triggerShake) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      })
    }
  }, [triggerShake, controls])

  return (
    <motion.button animate={controls} onClick={onClick} className="button">
      {children}
    </motion.button>
  )
}
