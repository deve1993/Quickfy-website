import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'
import type { ButtonProps } from './Button.types'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  const defaultProps: ButtonProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Button {...defaultProps} />)
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Button {...defaultProps}>{testContent}</Button>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Button {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('button')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Button {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('button')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies fullWidth prop correctly', () => {
      const testValue = true
      render(<Button {...defaultProps} fullWidth={testValue} />)
      const element = screen.getByTestId('button')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies loading prop correctly', () => {
      const testValue = true
      render(<Button {...defaultProps} loading={testValue} />)
      const element = screen.getByTestId('button')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies leftIcon prop correctly', () => {
      const testValue = 'Test Content'
      render(<Button {...defaultProps} leftIcon={testValue} />)
      const element = screen.getByTestId('button')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onProps correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Button {...defaultProps} onProps={handler} />)

      const element = screen.getByTestId('button')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Button {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('button')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onElement correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Button {...defaultProps} onElement={handler} />)

      const element = screen.getByTestId('button')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Button {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('button')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Button {...defaultProps} />)
      const element = screen.getByTestId('button')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Button {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
