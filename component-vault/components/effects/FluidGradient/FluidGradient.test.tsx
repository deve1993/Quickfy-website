import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FluidGradient } from './FluidGradient'
import type { FluidGradientProps } from './FluidGradient.types'

expect.extend(toHaveNoViolations)

describe('FluidGradient', () => {
  const defaultProps: FluidGradientProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<FluidGradient {...defaultProps} />)
      expect(screen.getByTestId('fluidgradient')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<FluidGradient {...defaultProps}>{testContent}</FluidGradient>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies colors prop correctly', () => {
      const testValue = undefined
      render(<FluidGradient {...defaultProps} colors={testValue} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies speed prop correctly', () => {
      const testValue = 42
      render(<FluidGradient {...defaultProps} speed={testValue} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies blur prop correctly', () => {
      const testValue = 42
      render(<FluidGradient {...defaultProps} blur={testValue} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies interactive prop correctly', () => {
      const testValue = true
      render(<FluidGradient {...defaultProps} interactive={testValue} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies mouseRadius prop correctly', () => {
      const testValue = 42
      render(<FluidGradient {...defaultProps} mouseRadius={testValue} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onFrameRef correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<FluidGradient {...defaultProps} onFrameRef={handler} />)

      const element = screen.getByTestId('fluidgradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onFrame correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<FluidGradient {...defaultProps} onFrame={handler} />)

      const element = screen.getByTestId('fluidgradient')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FluidGradient {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<FluidGradient {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('fluidgradient')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<FluidGradient {...defaultProps} />)
      const element = screen.getByTestId('fluidgradient')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<FluidGradient {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
