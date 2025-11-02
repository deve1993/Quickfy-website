import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Tooltip } from './Tooltip'
import type { TooltipProps } from './Tooltip.types'

expect.extend(toHaveNoViolations)

describe('Tooltip', () => {
  const defaultProps: TooltipProps = {
    content: 'Test Content',
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Tooltip {...defaultProps} />)
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Tooltip {...defaultProps}>{testContent}</Tooltip>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies content prop correctly', () => {
      const testValue = 'Test Content'
      render(<Tooltip {...defaultProps} content={testValue} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies placement prop correctly', () => {
      const testValue = undefined
      render(<Tooltip {...defaultProps} placement={testValue} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies delay prop correctly', () => {
      const testValue = 42
      render(<Tooltip {...defaultProps} delay={testValue} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies disabled prop correctly', () => {
      const testValue = true
      render(<Tooltip {...defaultProps} disabled={testValue} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<Tooltip {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onMouseEnter correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} onMouseEnter={handler} />)

      const element = screen.getByTestId('tooltip')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onMouseLeave correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} onMouseLeave={handler} />)

      const element = screen.getByTestId('tooltip')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onFocus correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} onFocus={handler} />)

      const element = screen.getByTestId('tooltip')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Tooltip {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('tooltip')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Tooltip {...defaultProps} />)
      const element = screen.getByTestId('tooltip')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Tooltip {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
