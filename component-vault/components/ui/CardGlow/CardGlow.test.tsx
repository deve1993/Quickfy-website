import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardGlow } from './CardGlow'
import type { CardGlowProps } from './CardGlow.types'

expect.extend(toHaveNoViolations)

describe('CardGlow', () => {
  const defaultProps: CardGlowProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CardGlow {...defaultProps} />)
      expect(screen.getByTestId('cardglow')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CardGlow {...defaultProps}>{testContent}</CardGlow>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CardGlow {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('cardglow')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies glowColor prop correctly', () => {
      const testValue = 'Test'
      render(<CardGlow {...defaultProps} glowColor={testValue} />)
      const element = screen.getByTestId('cardglow')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CardGlow {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CardGlow {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('cardglow')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CardGlow {...defaultProps} />)
      const element = screen.getByTestId('cardglow')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CardGlow {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
