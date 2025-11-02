import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Modal } from './Modal'
import type { ModalProps } from './Modal.types'

expect.extend(toHaveNoViolations)

describe('Modal', () => {
  const defaultProps: ModalProps = {
    open: true,
    onClose: {},
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Modal {...defaultProps} />)
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Modal {...defaultProps}>{testContent}</Modal>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies open prop correctly', () => {
      const testValue = true
      render(<Modal {...defaultProps} open={testValue} />)
      const element = screen.getByTestId('modal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<Modal {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('modal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies footer prop correctly', () => {
      const testValue = 'Test Content'
      render(<Modal {...defaultProps} footer={testValue} />)
      const element = screen.getByTestId('modal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Modal {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('modal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies showCloseButton prop correctly', () => {
      const testValue = true
      render(<Modal {...defaultProps} showCloseButton={testValue} />)
      const element = screen.getByTestId('modal')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onClose correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Modal {...defaultProps} onClose={handler} />)

      const element = screen.getByTestId('modal')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Modal {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('modal')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Modal {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('modal')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Modal {...defaultProps} />)
      const element = screen.getByTestId('modal')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Modal {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
