import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroMeteor } from './HeroMeteor'
import type { HeroMeteorProps } from './HeroMeteor.types'

expect.extend(toHaveNoViolations)

describe('HeroMeteor', () => {
  const defaultProps: HeroMeteorProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroMeteor {...defaultProps} />)
      expect(screen.getByTestId('herometeor')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroMeteor {...defaultProps}>{testContent}</HeroMeteor>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroMeteor {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroMeteor {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroMeteor {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies meteorCount prop correctly', () => {
      const testValue = 42
      render(<HeroMeteor {...defaultProps} meteorCount={testValue} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<HeroMeteor {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroMeteor {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herometeor')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onDelay correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroMeteor {...defaultProps} onDelay={handler} />)

      const element = screen.getByTestId('herometeor')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroMeteor {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('herometeor')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroMeteor {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroMeteor {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herometeor')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroMeteor {...defaultProps} />)
      const element = screen.getByTestId('herometeor')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroMeteor {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
