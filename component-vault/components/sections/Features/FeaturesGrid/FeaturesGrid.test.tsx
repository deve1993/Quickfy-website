import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FeaturesGrid } from './FeaturesGrid'
import type { FeaturesGridProps } from './FeaturesGrid.types'

expect.extend(toHaveNoViolations)

describe('FeaturesGrid', () => {
  const defaultProps: FeaturesGridProps = {
    features: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<FeaturesGrid {...defaultProps} />)
      expect(screen.getByTestId('featuresgrid')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<FeaturesGrid {...defaultProps}>{testContent}</FeaturesGrid>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesGrid {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesGrid {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies features prop correctly', () => {
      const testValue = {}
      render(<FeaturesGrid {...defaultProps} features={testValue} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies columns prop correctly', () => {
      const testValue = undefined
      render(<FeaturesGrid {...defaultProps} columns={testValue} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesGrid {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FeaturesGrid {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<FeaturesGrid {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('featuresgrid')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<FeaturesGrid {...defaultProps} />)
      const element = screen.getByTestId('featuresgrid')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<FeaturesGrid {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
