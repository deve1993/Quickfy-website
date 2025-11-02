import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ParticleConnect } from './ParticleConnect'
import type { ParticleConnectProps } from './ParticleConnect.types'

expect.extend(toHaveNoViolations)

describe('ParticleConnect', () => {
  const defaultProps: ParticleConnectProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ParticleConnect {...defaultProps} />)
      expect(screen.getByTestId('particleconnect')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<ParticleConnect {...defaultProps}>{testContent}</ParticleConnect>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies particleCount prop correctly', () => {
      const testValue = 42
      render(<ParticleConnect {...defaultProps} particleCount={testValue} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies particleColor prop correctly', () => {
      const testValue = 'Test'
      render(<ParticleConnect {...defaultProps} particleColor={testValue} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies lineColor prop correctly', () => {
      const testValue = 'Test'
      render(<ParticleConnect {...defaultProps} lineColor={testValue} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies connectionDistance prop correctly', () => {
      const testValue = 42
      render(<ParticleConnect {...defaultProps} connectionDistance={testValue} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies speed prop correctly', () => {
      const testValue = 42
      render(<ParticleConnect {...defaultProps} speed={testValue} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onDistance correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ParticleConnect {...defaultProps} onDistance={handler} />)

      const element = screen.getByTestId('particleconnect')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onFrameRef correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ParticleConnect {...defaultProps} onFrameRef={handler} />)

      const element = screen.getByTestId('particleconnect')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onFrame correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<ParticleConnect {...defaultProps} onFrame={handler} />)

      const element = screen.getByTestId('particleconnect')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ParticleConnect {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<ParticleConnect {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('particleconnect')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<ParticleConnect {...defaultProps} />)
      const element = screen.getByTestId('particleconnect')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<ParticleConnect {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
