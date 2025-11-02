import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroSpotlight } from './HeroSpotlight'
import type { HeroSpotlightProps } from './HeroSpotlight.types'

expect.extend(toHaveNoViolations)

describe('HeroSpotlight', () => {
  const defaultProps: HeroSpotlightProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroSpotlight {...defaultProps} />)
      expect(screen.getByTestId('herospotlight')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroSpotlight {...defaultProps}>{testContent}</HeroSpotlight>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroSpotlight {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroSpotlight {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroSpotlight {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies secondaryCtaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroSpotlight {...defaultProps} secondaryCtaText={testValue} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<HeroSpotlight {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onShimmer correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroSpotlight {...defaultProps} onShimmer={handler} />)

      const element = screen.getByTestId('herospotlight')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroSpotlight {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herospotlight')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroSpotlight {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('herospotlight')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroSpotlight {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroSpotlight {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herospotlight')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroSpotlight {...defaultProps} />)
      const element = screen.getByTestId('herospotlight')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroSpotlight {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
