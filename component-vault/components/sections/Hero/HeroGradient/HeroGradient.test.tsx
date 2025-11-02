import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroGradient } from './HeroGradient'
import type { HeroGradientProps } from './HeroGradient.types'

expect.extend(toHaveNoViolations)

describe('HeroGradient', () => {
  const defaultProps: HeroGradientProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroGradient {...defaultProps} />)
      expect(screen.getByTestId('herogradient')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroGradient {...defaultProps}>{testContent}</HeroGradient>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroGradient {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroGradient {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroGradient {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies secondaryCtaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroGradient {...defaultProps} secondaryCtaText={testValue} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<HeroGradient {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroGradient {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herogradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroGradient {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('herogradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroGradient {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('herogradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroGradient {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroGradient {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herogradient')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroGradient {...defaultProps} />)
      const element = screen.getByTestId('herogradient')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroGradient {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
