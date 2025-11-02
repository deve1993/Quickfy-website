// Card animation templates with various effects
import { motion } from 'framer-motion'

// ============================================
// Flip Card (3D flip effect)
// ============================================

import { useState } from 'react'

export function FlipCard({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1000, cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: isFlipped ? 'absolute' : 'relative',
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: isFlipped ? 'relative' : 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// Hover Lift Card
// ============================================

export function HoverLiftCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      {children}
    </motion.div>
  )
}

// ============================================
// Tilt Card (3D tilt on hover)
// ============================================

import { useMotionValue, useTransform } from 'framer-motion'

export function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="card"
    >
      {children}
    </motion.div>
  )
}

// ============================================
// Expand Card (Click to expand)
// ============================================

export function ExpandCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="card"
      style={{ cursor: 'pointer' }}
    >
      <motion.div layout="position">{title}</motion.div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}

// ============================================
// Stacked Cards (Deck of cards)
// ============================================

import { PanInfo } from 'framer-motion'

interface Card {
  id: number
  content: React.ReactNode
}

export function StackedCards({ cards }: { cards: Card[] }) {
  const [stack, setStack] = useState(cards)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      // Remove top card
      setStack((prev) => prev.slice(1))
    }
  }

  if (stack.length === 0) {
    return <div className="card">No more cards</div>
  }

  return (
    <div style={{ position: 'relative', width: 300, height: 400 }}>
      {stack.map((card, index) => (
        <motion.div
          key={card.id}
          drag={index === 0}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={index === 0 ? handleDragEnd : undefined}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: stack.length - index,
          }}
          initial={false}
          animate={{
            scale: 1 - index * 0.05,
            y: index * 10,
            opacity: index < 3 ? 1 : 0,
          }}
          className="card"
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Reveal Card (Content reveals on hover)
// ============================================

export function RevealCard({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) {
  return (
    <motion.div
      className="card"
      style={{ position: 'relative', overflow: 'hidden' }}
      whileHover="hover"
      initial="rest"
    >
      <motion.img
        src={image}
        alt={title}
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        variants={{
          rest: { y: '100%' },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// Parallax Card (Layers move at different speeds)
// ============================================

export function ParallaxCard({ layers }: { layers: React.ReactNode[] }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {layers.map((layer, index) => {
        const layerX = useTransform(x, (value) => value * (index + 1) * 0.5)
        const layerY = useTransform(y, (value) => value * (index + 1) * 0.5)

        return (
          <motion.div
            key={index}
            style={{
              x: layerX,
              y: layerY,
              position: index > 0 ? 'absolute' : 'relative',
              top: 0,
              left: 0,
            }}
          >
            {layer}
          </motion.div>
        )
      })}
    </div>
  )
}
