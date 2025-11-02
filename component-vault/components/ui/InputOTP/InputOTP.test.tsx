import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InputOTP } from './InputOTP'
import type { InputOTPProps } from './InputOTP.types'

expect.extend(toHaveNoViolations)

describe('InputOTP', () => {
  const defaultProps: InputOTPProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<InputOTP {...defaultProps} />)
      expect(screen.getByTestId('inputotp')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<InputOTP {...defaultProps}>{testContent}</InputOTP>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies length prop correctly', () => {
      const testValue = 42
      render(<InputOTP {...defaultProps} length={testValue} />)
      const element = screen.getByTestId('inputotp')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<InputOTP {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('inputotp')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onComplete correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<InputOTP {...defaultProps} onComplete={handler} />)

      const element = screen.getByTestId('inputotp')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onChange correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<InputOTP {...defaultProps} onChange={handler} />)

      const element = screen.getByTestId('inputotp')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onKeyDown correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<InputOTP {...defaultProps} onKeyDown={handler} />)

      const element = screen.getByTestId('inputotp')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<InputOTP {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<InputOTP {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('inputotp')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<InputOTP {...defaultProps} />)
      const element = screen.getByTestId('inputotp')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<InputOTP {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
