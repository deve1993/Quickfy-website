import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TextReveal } from './TextReveal'
import type { TextRevealProps } from './TextReveal.types'

expect.extend(toHaveNoViolations)

describe('TextReveal', () => {
  const defaultProps: TextRevealProps = {
    text: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<TextReveal {...defaultProps} />)
      expect(screen.getByTestId('textreveal')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<TextReveal {...defaultProps}>{testContent}</TextReveal>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies text prop correctly', () => {
      const testValue = 'Test'
      render(<TextReveal {...defaultProps} text={testValue} />)
      const element = screen.getByTestId('textreveal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies revealedTextColor prop correctly', () => {
      const testValue = 'Test'
      render(<TextReveal {...defaultProps} revealedTextColor={testValue} />)
      const element = screen.getByTestId('textreveal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies hiddenTextColor prop correctly', () => {
      const testValue = 'Test'
      render(<TextReveal {...defaultProps} hiddenTextColor={testValue} />)
      const element = screen.getByTestId('textreveal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<TextReveal {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('textreveal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TextReveal {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<TextReveal {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('textreveal')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<TextReveal {...defaultProps} />)
      const element = screen.getByTestId('textreveal')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<TextReveal {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
