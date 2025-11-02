// Accessible Button Component Template
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

export interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variants for different use cases
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'

  /**
   * Button sizes
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean

  /**
   * Icon to display before text
   */
  leftIcon?: ReactNode

  /**
   * Icon to display after text
   */
  rightIcon?: ReactNode

  /**
   * Accessible label for screen readers
   * REQUIRED if button contains only icons
   */
  'aria-label'?: string

  /**
   * ID of element that labels this button
   */
  'aria-labelledby'?: string

  /**
   * ID of element that describes this button
   */
  'aria-describedby'?: string

  /**
   * Pressed state for toggle buttons
   */
  'aria-pressed'?: boolean

  /**
   * Controls another element (e.g., menu, dialog)
   */
  'aria-controls'?: string

  /**
   * Expanded state for buttons that control collapsible content
   */
  'aria-expanded'?: boolean

  /**
   * Has popup menu/dialog
   */
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid'
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      type = 'button',
      'aria-label': ariaLabel,
      'aria-pressed': ariaPressed,
      ...props
    },
    ref
  ) => {
    // If button has no text content, aria-label is required
    const hasTextContent = typeof children === 'string' || typeof children === 'number'
    const needsAriaLabel = !hasTextContent && !ariaLabel && !props['aria-labelledby']

    if (needsAriaLabel && process.env.NODE_ENV === 'development') {
      console.warn(
        'AccessibleButton: Icon-only buttons must have aria-label or aria-labelledby'
      )
    }

    const isDisabled = disabled || loading

    const buttonClasses = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      loading && 'button--loading',
      isDisabled && 'button--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <span className="button__spinner" aria-hidden="true">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle
                className="spinner__circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>
        )}

        {/* Left Icon */}
        {leftIcon && !loading && (
          <span className="button__icon button__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button Content */}
        <span className={loading ? 'button__content--hidden' : 'button__content'}>
          {children}
        </span>

        {/* Right Icon */}
        {rightIcon && !loading && (
          <span className="button__icon button__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Screen Reader Loading Announcement */}
        {loading && (
          <span className="sr-only" role="status" aria-live="polite">
            Loading...
          </span>
        )}
      </button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'

// Usage Examples:

// Basic button
// <AccessibleButton onClick={handleSave}>Save</AccessibleButton>

// Icon-only button (MUST have aria-label)
// <AccessibleButton aria-label="Close dialog" onClick={onClose}>
//   <XIcon />
// </AccessibleButton>

// Button with icons
// <AccessibleButton leftIcon={<SaveIcon />} onClick={handleSave}>
//   Save Changes
// </AccessibleButton>

// Loading button
// <AccessibleButton loading={isSubmitting} onClick={handleSubmit}>
//   Submit Form
// </AccessibleButton>

// Toggle button
// <AccessibleButton aria-pressed={isMuted} onClick={toggleMute}>
//   <MicIcon /> {isMuted ? 'Unmute' : 'Mute'}
// </AccessibleButton>

// Button that controls a menu
// <AccessibleButton
//   aria-haspopup="menu"
//   aria-expanded={isOpen}
//   aria-controls="menu-id"
//   onClick={toggleMenu}
// >
//   Options <ChevronIcon />
// </AccessibleButton>
