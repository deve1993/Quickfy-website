// Responsive Grid System Template
import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: string
  className?: string
}

export function ResponsiveGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = '1rem',
  className = '',
}: ResponsiveGridProps) {
  return (
    <div
      className={`responsive-grid ${className}`}
      style={{
        display: 'grid',
        gap,
        gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`,
      }}
    >
      {children}
      <style jsx>{`
        @media (min-width: 768px) {
          .responsive-grid {
            grid-template-columns: repeat(${columns.tablet}, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .responsive-grid {
            grid-template-columns: repeat(${columns.desktop}, 1fr);
          }
        }
      `}</style>
    </div>
  )
}
