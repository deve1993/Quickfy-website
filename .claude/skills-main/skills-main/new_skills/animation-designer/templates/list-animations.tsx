// List animation templates with stagger and entrance effects
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Stagger Fade In List
// ============================================

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function StaggerList<T>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  return (
    <motion.ul
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="list"
    >
      {items.map((item, index) => (
        <motion.li key={index} variants={staggerItemVariants}>
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ============================================
// Slide In List (from left/right alternating)
// ============================================

export function SlideInList<T>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  return (
    <motion.ul className="list">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ============================================
// Scale In List (zoom effect)
// ============================================

export function ScaleInList<T>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  return (
    <motion.ul className="list">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ============================================
// Animated Add/Remove List
// ============================================

export function AnimatedList<T extends { id: string | number }>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  return (
    <ul className="list">
      <AnimatePresence>
        {items.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, height: 0, x: -50 }}
            animate={{ opacity: 1, height: 'auto', x: 0 }}
            exit={{ opacity: 0, height: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

// ============================================
// Reorder List (Drag to reorder)
// ============================================

import { Reorder } from 'framer-motion'
import { useState } from 'react'

export function ReorderList<T extends { id: string | number }>({
  items: initialItems,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  const [items, setItems] = useState(initialItems)

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems} className="list">
      {items.map((item) => (
        <Reorder.Item key={item.id} value={item}>
          {renderItem(item)}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}

// ============================================
// Grid Layout Animation
// ============================================

export function AnimatedGrid<T>({
  items,
  renderItem,
  columns = 3,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  columns?: number
}) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 20,
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4 },
            },
          }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ============================================
// Masonry Layout Animation
// ============================================

export function AnimatedMasonry<T>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  return (
    <motion.div
      style={{
        columns: '3 300px',
        columnGap: 20,
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
          style={{
            breakInside: 'avoid',
            marginBottom: 20,
          }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ============================================
// Infinite Scroll List (Load more on scroll)
// ============================================

import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function InfiniteScrollList<T>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  onLoadMore: () => void
  hasMore: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView && hasMore) {
      onLoadMore()
    }
  }, [isInView, hasMore, onLoadMore])

  return (
    <div>
      <motion.ul className="list">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 10) * 0.05 }}
          >
            {renderItem(item, index)}
          </motion.li>
        ))}
      </motion.ul>

      {hasMore && (
        <div ref={ref} style={{ padding: 20, textAlign: 'center' }}>
          Loading more...
        </div>
      )}
    </div>
  )
}
