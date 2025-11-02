import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InfiniteMovingCards } from './InfiniteMovingCards'
import type { InfiniteMovingCardsProps } from './InfiniteMovingCards.types'

expect.extend(toHaveNoViolations)

describe('InfiniteMovingCards', () => {
  const defaultProps: InfiniteMovingCardsProps = {
    items: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<InfiniteMovingCards {...defaultProps} />)
      expect(screen.getByTestId('infinitemovingcards')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<InfiniteMovingCards {...defaultProps}>{testContent}</InfiniteMovingCards>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies items prop correctly', () => {
      const testValue = {}
      render(<InfiniteMovingCards {...defaultProps} items={testValue} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies direction prop correctly', () => {
      const testValue = undefined
      render(<InfiniteMovingCards {...defaultProps} direction={testValue} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies speed prop correctly', () => {
      const testValue = undefined
      render(<InfiniteMovingCards {...defaultProps} speed={testValue} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies pauseOnHover prop correctly', () => {
      const testValue = true
      render(<InfiniteMovingCards {...defaultProps} pauseOnHover={testValue} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<InfiniteMovingCards {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<InfiniteMovingCards {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<InfiniteMovingCards {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('infinitemovingcards')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<InfiniteMovingCards {...defaultProps} />)
      const element = screen.getByTestId('infinitemovingcards')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<InfiniteMovingCards {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
