import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ParallaxScroll } from './ParallaxScroll'
import type { ParallaxScrollProps } from './ParallaxScroll.types'

expect.extend(toHaveNoViolations)

describe('ParallaxScroll', () => {
  const defaultProps: ParallaxScrollProps = {
    images: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ParallaxScroll {...defaultProps} />)
      expect(screen.getByTestId('parallaxscroll')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<ParallaxScroll {...defaultProps}>{testContent}</ParallaxScroll>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies images prop correctly', () => {
      const testValue = {}
      render(<ParallaxScroll {...defaultProps} images={testValue} />)
      const element = screen.getByTestId('parallaxscroll')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<ParallaxScroll {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('parallaxscroll')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ParallaxScroll {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<ParallaxScroll {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('parallaxscroll')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<ParallaxScroll {...defaultProps} />)
      const element = screen.getByTestId('parallaxscroll')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<ParallaxScroll {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
