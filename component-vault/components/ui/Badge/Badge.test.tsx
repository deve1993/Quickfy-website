import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Badge } from './Badge'
import type { BadgeProps } from './Badge.types'

expect.extend(toHaveNoViolations)

describe('Badge', () => {
  const defaultProps: BadgeProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Badge {...defaultProps} />)
      expect(screen.getByTestId('badge')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Badge {...defaultProps}>{testContent}</Badge>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Badge {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('badge')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Badge {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('badge')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies style prop correctly', () => {
      const testValue = undefined
      render(<Badge {...defaultProps} style={testValue} />)
      const element = screen.getByTestId('badge')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies icon prop correctly', () => {
      const testValue = 'Test Content'
      render(<Badge {...defaultProps} icon={testValue} />)
      const element = screen.getByTestId('badge')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies closable prop correctly', () => {
      const testValue = true
      render(<Badge {...defaultProps} closable={testValue} />)
      const element = screen.getByTestId('badge')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onClose correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Badge {...defaultProps} onClose={handler} />)

      const element = screen.getByTestId('badge')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Badge {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('badge')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Badge {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Badge {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('badge')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Badge {...defaultProps} />)
      const element = screen.getByTestId('badge')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Badge {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
