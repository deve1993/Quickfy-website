// Accessible Modal/Dialog Component Template
import { useEffect, useRef, ReactNode, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

export interface AccessibleModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean

  /**
   * Callback when modal should close
   */
  onClose: () => void

  /**
   * Modal title (required for accessibility)
   */
  title: string

  /**
   * Modal content
   */
  children: ReactNode

  /**
   * Optional description
   */
  description?: string

  /**
   * Size of the modal
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'

  /**
   * Whether clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean

  /**
   * Whether pressing Escape closes modal
   */
  closeOnEscape?: boolean

  /**
   * Initial focus element selector
   */
  initialFocus?: string

  /**
   * Custom ID for title (for aria-labelledby)
   */
  titleId?: string

  /**
   * Custom ID for description (for aria-describedby)
   */
  descriptionId?: string

  /**
   * Additional class name
   */
  className?: string
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocus,
  titleId = 'modal-title',
  descriptionId = 'modal-description',
  className = '',
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Focus trap logic
  useEffect(() => {
    if (!isOpen) return

    // Store currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Get all focusable elements
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus initial element or first focusable element
    const initialElement = initialFocus
      ? modalRef.current?.querySelector<HTMLElement>(initialFocus)
      : null

    setTimeout(() => {
      ;(initialElement || firstElement)?.focus()
    }, 0)

    // Trap focus inside modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen, initialFocus])

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnEscape, onClose])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''

      // Restore focus to previous element
      setTimeout(() => {
        previousActiveElement.current?.focus()
      }, 0)
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Handle overlay click
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      // Not a button, just a backdrop
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={`modal modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="modal__close"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Description */}
        {description && (
          <p id={descriptionId} className="modal__description">
            {description}
          </p>
        )}

        {/* Body */}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// Usage Examples:

// Basic modal
// <AccessibleModal
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   title="Confirm Action"
//   description="Are you sure you want to delete this item?"
// >
//   <button onClick={handleConfirm}>Confirm</button>
//   <button onClick={() => setIsOpen(false)}>Cancel</button>
// </AccessibleModal>

// Modal with initial focus on dangerous action
// <AccessibleModal
//   isOpen={isDeleteOpen}
//   onClose={closeDelete}
//   title="Delete Account"
//   initialFocus="#delete-button"
//   size="sm"
// >
//   <p>This action cannot be undone.</p>
//   <button onClick={closeDelete}>Cancel</button>
//   <button id="delete-button" onClick={handleDelete}>
//     Delete Account
//   </button>
// </AccessibleModal>

// Modal that cannot be dismissed by clicking overlay
// <AccessibleModal
//   isOpen={isMandatoryOpen}
//   onClose={closeMandatory}
//   title="Important Notice"
//   closeOnOverlayClick={false}
//   closeOnEscape={false}
// >
//   <p>You must accept terms to continue.</p>
//   <button onClick={handleAccept}>Accept Terms</button>
// </AccessibleModal>
