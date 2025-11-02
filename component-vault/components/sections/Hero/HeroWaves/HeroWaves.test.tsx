import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroWaves } from './HeroWaves'
import type { HeroWavesProps } from './HeroWaves.types'

expect.extend(toHaveNoViolations)

describe('HeroWaves', () => {
  const defaultProps: HeroWavesProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroWaves {...defaultProps} />)
      expect(screen.getByTestId('herowaves')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroWaves {...defaultProps}>{testContent}</HeroWaves>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroWaves {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('herowaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroWaves {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herowaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroWaves {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herowaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<HeroWaves {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('herowaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroWaves {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herowaves')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroWaves {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('herowaves')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroWaves {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroWaves {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herowaves')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroWaves {...defaultProps} />)
      const element = screen.getByTestId('herowaves')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroWaves {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
