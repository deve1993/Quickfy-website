import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardBento } from './CardBento'
import type { CardBentoProps } from './CardBento.types'

expect.extend(toHaveNoViolations)

describe('CardBento', () => {
  const defaultProps: CardBentoProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CardBento {...defaultProps} />)
      expect(screen.getByTestId('cardbento')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CardBento {...defaultProps}>{testContent}</CardBento>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies span prop correctly', () => {
      const testValue = undefined
      render(<CardBento {...defaultProps} span={testValue} />)
      const element = screen.getByTestId('cardbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CardBento {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('cardbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CardBento {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CardBento {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('cardbento')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CardBento {...defaultProps} />)
      const element = screen.getByTestId('cardbento')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CardBento {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
