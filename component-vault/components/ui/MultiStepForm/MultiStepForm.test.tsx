import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MultiStepForm } from './MultiStepForm'
import type { MultiStepFormProps } from './MultiStepForm.types'

expect.extend(toHaveNoViolations)

describe('MultiStepForm', () => {
  const defaultProps: MultiStepFormProps = {
    steps: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<MultiStepForm {...defaultProps} />)
      expect(screen.getByTestId('multistepform')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<MultiStepForm {...defaultProps}>{testContent}</MultiStepForm>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies steps prop correctly', () => {
      const testValue = {}
      render(<MultiStepForm {...defaultProps} steps={testValue} />)
      const element = screen.getByTestId('multistepform')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<MultiStepForm {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('multistepform')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onComplete correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<MultiStepForm {...defaultProps} onComplete={handler} />)

      const element = screen.getByTestId('multistepform')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<MultiStepForm {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('multistepform')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<MultiStepForm {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<MultiStepForm {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('multistepform')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<MultiStepForm {...defaultProps} />)
      const element = screen.getByTestId('multistepform')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<MultiStepForm {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
