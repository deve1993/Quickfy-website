import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Input } from './Input'
import type { InputProps } from './Input.types'

expect.extend(toHaveNoViolations)

describe('Input', () => {
  const defaultProps: InputProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Input {...defaultProps} />)
      expect(screen.getByTestId('input')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Input {...defaultProps}>{testContent}</Input>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Input {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('input')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Input {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('input')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies label prop correctly', () => {
      const testValue = 'Test'
      render(<Input {...defaultProps} label={testValue} />)
      const element = screen.getByTestId('input')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies error prop correctly', () => {
      const testValue = 'Test'
      render(<Input {...defaultProps} error={testValue} />)
      const element = screen.getByTestId('input')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies helperText prop correctly', () => {
      const testValue = 'Test'
      render(<Input {...defaultProps} helperText={testValue} />)
      const element = screen.getByTestId('input')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Input {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('input')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Input {...defaultProps} />)
      const element = screen.getByTestId('input')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Input {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
