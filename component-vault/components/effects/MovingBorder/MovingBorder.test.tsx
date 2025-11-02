import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MovingBorder } from './MovingBorder'
import type { MovingBorderProps } from './MovingBorder.types'

expect.extend(toHaveNoViolations)

describe('MovingBorder', () => {
  const defaultProps: MovingBorderProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<MovingBorder {...defaultProps} />)
      expect(screen.getByTestId('movingborder')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<MovingBorder {...defaultProps}>{testContent}</MovingBorder>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<MovingBorder {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('movingborder')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies containerClassName prop correctly', () => {
      const testValue = 'Test'
      render(<MovingBorder {...defaultProps} containerClassName={testValue} />)
      const element = screen.getByTestId('movingborder')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies borderColors prop correctly', () => {
      const testValue = undefined
      render(<MovingBorder {...defaultProps} borderColors={testValue} />)
      const element = screen.getByTestId('movingborder')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies duration prop correctly', () => {
      const testValue = 42
      render(<MovingBorder {...defaultProps} duration={testValue} />)
      const element = screen.getByTestId('movingborder')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onDuration correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<MovingBorder {...defaultProps} onDuration={handler} />)

      const element = screen.getByTestId('movingborder')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<MovingBorder {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<MovingBorder {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('movingborder')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<MovingBorder {...defaultProps} />)
      const element = screen.getByTestId('movingborder')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<MovingBorder {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
