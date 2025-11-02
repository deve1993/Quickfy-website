import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Select } from './Select'
import type { SelectProps } from './Select.types'

expect.extend(toHaveNoViolations)

describe('Select', () => {
  const defaultProps: SelectProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Select {...defaultProps} />)
      expect(screen.getByTestId('select')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Select {...defaultProps}>{testContent}</Select>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies variant prop correctly', () => {
      const testValue = undefined
      render(<Select {...defaultProps} variant={testValue} />)
      const element = screen.getByTestId('select')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Select {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('select')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies label prop correctly', () => {
      const testValue = 'Test'
      render(<Select {...defaultProps} label={testValue} />)
      const element = screen.getByTestId('select')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies error prop correctly', () => {
      const testValue = 'Test'
      render(<Select {...defaultProps} error={testValue} />)
      const element = screen.getByTestId('select')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies helperText prop correctly', () => {
      const testValue = 'Test'
      render(<Select {...defaultProps} helperText={testValue} />)
      const element = screen.getByTestId('select')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Select {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Select {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('select')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Select {...defaultProps} />)
      const element = screen.getByTestId('select')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Select {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
