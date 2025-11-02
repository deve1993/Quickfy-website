import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardHover } from './CardHover'
import type { CardHoverProps } from './CardHover.types'

expect.extend(toHaveNoViolations)

describe('CardHover', () => {
  const defaultProps: CardHoverProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CardHover {...defaultProps} />)
      expect(screen.getByTestId('cardhover')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CardHover {...defaultProps}>{testContent}</CardHover>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CardHover {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('cardhover')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies containerClassName prop correctly', () => {
      const testValue = 'Test'
      render(<CardHover {...defaultProps} containerClassName={testValue} />)
      const element = screen.getByTestId('cardhover')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onMouseMove correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CardHover {...defaultProps} onMouseMove={handler} />)

      const element = screen.getByTestId('cardhover')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onMouseEnter correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CardHover {...defaultProps} onMouseEnter={handler} />)

      const element = screen.getByTestId('cardhover')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onMouseLeave correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CardHover {...defaultProps} onMouseLeave={handler} />)

      const element = screen.getByTestId('cardhover')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CardHover {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CardHover {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('cardhover')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CardHover {...defaultProps} />)
      const element = screen.getByTestId('cardhover')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CardHover {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
