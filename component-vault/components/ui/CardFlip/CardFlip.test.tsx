import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardFlip } from './CardFlip'
import type { CardFlipProps } from './CardFlip.types'

expect.extend(toHaveNoViolations)

describe('CardFlip', () => {
  const defaultProps: CardFlipProps = {
    front: 'Test Content',
    back: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CardFlip {...defaultProps} />)
      expect(screen.getByTestId('cardflip')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CardFlip {...defaultProps}>{testContent}</CardFlip>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies front prop correctly', () => {
      const testValue = 'Test Content'
      render(<CardFlip {...defaultProps} front={testValue} />)
      const element = screen.getByTestId('cardflip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies back prop correctly', () => {
      const testValue = 'Test Content'
      render(<CardFlip {...defaultProps} back={testValue} />)
      const element = screen.getByTestId('cardflip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CardFlip {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('cardflip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CardFlip {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('cardflip')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CardFlip {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CardFlip {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('cardflip')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CardFlip {...defaultProps} />)
      const element = screen.getByTestId('cardflip')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CardFlip {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
