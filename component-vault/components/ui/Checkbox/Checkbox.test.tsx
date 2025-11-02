import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Checkbox } from './Checkbox'
import type { CheckboxProps } from './Checkbox.types'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  const defaultProps: CheckboxProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Checkbox {...defaultProps} />)
      expect(screen.getByTestId('checkbox')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Checkbox {...defaultProps}>{testContent}</Checkbox>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Checkbox {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies label prop correctly', () => {
      const testValue = 'Test'
      render(<Checkbox {...defaultProps} label={testValue} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies description prop correctly', () => {
      const testValue = 'Test'
      render(<Checkbox {...defaultProps} description={testValue} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies error prop correctly', () => {
      const testValue = 'Test'
      render(<Checkbox {...defaultProps} error={testValue} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies indeterminate prop correctly', () => {
      const testValue = true
      render(<Checkbox {...defaultProps} indeterminate={testValue} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Checkbox {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Checkbox {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('checkbox')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Checkbox {...defaultProps} />)
      const element = screen.getByTestId('checkbox')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Checkbox {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
