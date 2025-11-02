import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroTypewriter } from './HeroTypewriter'
import type { HeroTypewriterProps } from './HeroTypewriter.types'

expect.extend(toHaveNoViolations)

describe('HeroTypewriter', () => {
  const defaultProps: HeroTypewriterProps = {
    words: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroTypewriter {...defaultProps} />)
      expect(screen.getByTestId('herotypewriter')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroTypewriter {...defaultProps}>{testContent}</HeroTypewriter>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies titlePrefix prop correctly', () => {
      const testValue = 'Test'
      render(<HeroTypewriter {...defaultProps} titlePrefix={testValue} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies words prop correctly', () => {
      const testValue = {}
      render(<HeroTypewriter {...defaultProps} words={testValue} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroTypewriter {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroTypewriter {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies secondaryCtaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroTypewriter {...defaultProps} secondaryCtaText={testValue} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroTypewriter {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herotypewriter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroTypewriter {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('herotypewriter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroTypewriter {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('herotypewriter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroTypewriter {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroTypewriter {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herotypewriter')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroTypewriter {...defaultProps} />)
      const element = screen.getByTestId('herotypewriter')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroTypewriter {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
