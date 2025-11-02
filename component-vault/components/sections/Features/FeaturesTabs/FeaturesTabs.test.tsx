import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FeaturesTabs } from './FeaturesTabs'
import type { FeaturesTabsProps } from './FeaturesTabs.types'

expect.extend(toHaveNoViolations)

describe('FeaturesTabs', () => {
  const defaultProps: FeaturesTabsProps = {
    tabs: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<FeaturesTabs {...defaultProps} />)
      expect(screen.getByTestId('featurestabs')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<FeaturesTabs {...defaultProps}>{testContent}</FeaturesTabs>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesTabs {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('featurestabs')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesTabs {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('featurestabs')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies tabs prop correctly', () => {
      const testValue = {}
      render(<FeaturesTabs {...defaultProps} tabs={testValue} />)
      const element = screen.getByTestId('featurestabs')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesTabs {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('featurestabs')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<FeaturesTabs {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('featurestabs')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FeaturesTabs {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<FeaturesTabs {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('featurestabs')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<FeaturesTabs {...defaultProps} />)
      const element = screen.getByTestId('featurestabs')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<FeaturesTabs {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
