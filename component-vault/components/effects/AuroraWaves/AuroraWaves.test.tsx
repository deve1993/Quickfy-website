import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AuroraWaves } from './AuroraWaves'
import type { AuroraWavesProps } from './AuroraWaves.types'

expect.extend(toHaveNoViolations)

describe('AuroraWaves', () => {
  const defaultProps: AuroraWavesProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<AuroraWaves {...defaultProps} />)
      expect(screen.getByTestId('aurorawaves')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<AuroraWaves {...defaultProps}>{testContent}</AuroraWaves>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies colors prop correctly', () => {
      const testValue = undefined
      render(<AuroraWaves {...defaultProps} colors={testValue} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies speed prop correctly', () => {
      const testValue = 42
      render(<AuroraWaves {...defaultProps} speed={testValue} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies amplitude prop correctly', () => {
      const testValue = 42
      render(<AuroraWaves {...defaultProps} amplitude={testValue} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies waveCount prop correctly', () => {
      const testValue = 42
      render(<AuroraWaves {...defaultProps} waveCount={testValue} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies blur prop correctly', () => {
      const testValue = 42
      render(<AuroraWaves {...defaultProps} blur={testValue} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onFrameRef correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<AuroraWaves {...defaultProps} onFrameRef={handler} />)

      const element = screen.getByTestId('aurorawaves')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onFrame correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<AuroraWaves {...defaultProps} onFrame={handler} />)

      const element = screen.getByTestId('aurorawaves')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<AuroraWaves {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<AuroraWaves {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('aurorawaves')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<AuroraWaves {...defaultProps} />)
      const element = screen.getByTestId('aurorawaves')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<AuroraWaves {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
