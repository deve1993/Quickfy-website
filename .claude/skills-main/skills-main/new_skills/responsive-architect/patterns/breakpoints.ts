// Breakpoint system and media query utilities

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const

// React hook for media queries
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export function useBreakpoint() {
  const xs = useMediaQuery(`(min-width: ${breakpoints.xs}px)`)
  const sm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`)
  const md = useMediaQuery(`(min-width: ${breakpoints.md}px)`)
  const lg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`)
  const xl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`)
  const xxl = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`)

  return { xs, sm, md, lg, xl, xxl }
}
