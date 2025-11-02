import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Card } from './Card'
import type { CardProps } from './Card.types'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  const defaultProps: CardProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Card {...defaultProps} />)
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Card {...defaultProps}>{testContent}</Card>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<Card {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('card')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies hoverable prop correctly', () => {
      const testValue = true
      render(<Card {...defaultProps} hoverable={testValue} />)
      const element = screen.getByTestId('card')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies padding prop correctly', () => {
      const testValue = undefined
      render(<Card {...defaultProps} padding={testValue} />)
      const element = screen.getByTestId('card')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Card {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('card')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onProps correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Card {...defaultProps} onProps={handler} />)

      const element = screen.getByTestId('card')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Card {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('card')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Card {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('card')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Card {...defaultProps} />)
      const element = screen.getByTestId('card')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Card {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
