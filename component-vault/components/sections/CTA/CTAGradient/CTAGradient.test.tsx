import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CTAGradient } from './CTAGradient'
import type { CTAGradientProps } from './CTAGradient.types'

expect.extend(toHaveNoViolations)

describe('CTAGradient', () => {
  const defaultProps: CTAGradientProps = {
    title: 'Test',
    ctaText: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CTAGradient {...defaultProps} />)
      expect(screen.getByTestId('ctagradient')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CTAGradient {...defaultProps}>{testContent}</CTAGradient>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<CTAGradient {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('ctagradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<CTAGradient {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('ctagradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<CTAGradient {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('ctagradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CTAGradient {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('ctagradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CTAGradient {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('ctagradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CTAGradient {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('ctagradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CTAGradient {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CTAGradient {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('ctagradient')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CTAGradient {...defaultProps} />)
      const element = screen.getByTestId('ctagradient')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CTAGradient {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
