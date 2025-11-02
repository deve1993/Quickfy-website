import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ButtonShimmer } from './ButtonShimmer'
import type { ButtonShimmerProps } from './ButtonShimmer.types'

expect.extend(toHaveNoViolations)

describe('ButtonShimmer', () => {
  const defaultProps: ButtonShimmerProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ButtonShimmer {...defaultProps} />)
      expect(screen.getByTestId('buttonshimmer')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<ButtonShimmer {...defaultProps}>{testContent}</ButtonShimmer>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<ButtonShimmer {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('buttonshimmer')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies shimmerColor prop correctly', () => {
      const testValue = 'Test'
      render(<ButtonShimmer {...defaultProps} shimmerColor={testValue} />)
      const element = screen.getByTestId('buttonshimmer')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onShimmerProps correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ButtonShimmer {...defaultProps} onShimmerProps={handler} />)

      const element = screen.getByTestId('buttonshimmer')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onShimmer correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ButtonShimmer {...defaultProps} onShimmer={handler} />)

      const element = screen.getByTestId('buttonshimmer')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ButtonShimmer {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('buttonshimmer')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ButtonShimmer {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<ButtonShimmer {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('buttonshimmer')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<ButtonShimmer {...defaultProps} />)
      const element = screen.getByTestId('buttonshimmer')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<ButtonShimmer {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
