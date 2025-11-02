import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Textarea } from './Textarea'
import type { TextareaProps } from './Textarea.types'

expect.extend(toHaveNoViolations)

describe('Textarea', () => {
  const defaultProps: TextareaProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Textarea {...defaultProps} />)
      expect(screen.getByTestId('textarea')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Textarea {...defaultProps}>{testContent}</Textarea>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Textarea {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('textarea')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Textarea {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('textarea')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies label prop correctly', () => {
      const testValue = 'Test'
      render(<Textarea {...defaultProps} label={testValue} />)
      const element = screen.getByTestId('textarea')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies error prop correctly', () => {
      const testValue = 'Test'
      render(<Textarea {...defaultProps} error={testValue} />)
      const element = screen.getByTestId('textarea')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies helperText prop correctly', () => {
      const testValue = 'Test'
      render(<Textarea {...defaultProps} helperText={testValue} />)
      const element = screen.getByTestId('textarea')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onChange correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Textarea {...defaultProps} onChange={handler} />)

      const element = screen.getByTestId('textarea')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Textarea {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Textarea {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('textarea')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Textarea {...defaultProps} />)
      const element = screen.getByTestId('textarea')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Textarea {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
