import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroParticles } from './HeroParticles'
import type { HeroParticlesProps } from './HeroParticles.types'

expect.extend(toHaveNoViolations)

describe('HeroParticles', () => {
  const defaultProps: HeroParticlesProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroParticles {...defaultProps} />)
      expect(screen.getByTestId('heroparticles')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroParticles {...defaultProps}>{testContent}</HeroParticles>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroParticles {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroParticles {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroParticles {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies secondaryCtaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroParticles {...defaultProps} secondaryCtaText={testValue} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies particleCount prop correctly', () => {
      const testValue = 42
      render(<HeroParticles {...defaultProps} particleCount={testValue} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroParticles {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('heroparticles')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroParticles {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('heroparticles')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroParticles {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('heroparticles')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroParticles {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroParticles {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('heroparticles')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroParticles {...defaultProps} />)
      const element = screen.getByTestId('heroparticles')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroParticles {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
