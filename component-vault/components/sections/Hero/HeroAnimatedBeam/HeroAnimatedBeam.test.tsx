import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroAnimatedBeam } from './HeroAnimatedBeam'
import type { HeroAnimatedBeamProps } from './HeroAnimatedBeam.types'

expect.extend(toHaveNoViolations)

describe('HeroAnimatedBeam', () => {
  const defaultProps: HeroAnimatedBeamProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroAnimatedBeam {...defaultProps} />)
      expect(screen.getByTestId('heroanimatedbeam')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroAnimatedBeam {...defaultProps}>{testContent}</HeroAnimatedBeam>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroAnimatedBeam {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroAnimatedBeam {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroAnimatedBeam {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies secondaryCtaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroAnimatedBeam {...defaultProps} secondaryCtaText={testValue} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<HeroAnimatedBeam {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroAnimatedBeam {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('heroanimatedbeam')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroAnimatedBeam {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('heroanimatedbeam')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroAnimatedBeam {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('heroanimatedbeam')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroAnimatedBeam {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroAnimatedBeam {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('heroanimatedbeam')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroAnimatedBeam {...defaultProps} />)
      const element = screen.getByTestId('heroanimatedbeam')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroAnimatedBeam {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
