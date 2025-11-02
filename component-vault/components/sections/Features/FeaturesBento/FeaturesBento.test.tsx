import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FeaturesBento } from './FeaturesBento'
import type { FeaturesBentoProps } from './FeaturesBento.types'

expect.extend(toHaveNoViolations)

describe('FeaturesBento', () => {
  const defaultProps: FeaturesBentoProps = {
    items: {},
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<FeaturesBento {...defaultProps} />)
      expect(screen.getByTestId('featuresbento')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<FeaturesBento {...defaultProps}>{testContent}</FeaturesBento>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesBento {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('featuresbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesBento {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('featuresbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies items prop correctly', () => {
      const testValue = {}
      render(<FeaturesBento {...defaultProps} items={testValue} />)
      const element = screen.getByTestId('featuresbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<FeaturesBento {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('featuresbento')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FeaturesBento {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<FeaturesBento {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('featuresbento')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<FeaturesBento {...defaultProps} />)
      const element = screen.getByTestId('featuresbento')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<FeaturesBento {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
