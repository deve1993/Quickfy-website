// Accessible Form Field Components Template
import { useId, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

// ============================================
// Form Field Wrapper
// ============================================

interface FormFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  helpText?: string
  required?: boolean
  optional?: boolean
}

export function FormField({
  label,
  children,
  error,
  helpText,
  required = false,
  optional = false,
}: FormFieldProps) {
  const errorId = useId()
  const helpId = useId()

  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-label="required">
            {' '}
            *
          </span>
        )}
        {optional && (
          <span className="form-field__optional" aria-label="optional">
            {' '}
            (optional)
          </span>
        )}
      </label>

      {helpText && (
        <p id={helpId} className="form-field__help">
          {helpText}
        </p>
      )}

      {children}

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="form-field__error"
        >
          {error}
        </div>
      )}
    </div>
  )
}

// ============================================
// Text Input
// ============================================

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helpText?: string
}

export function AccessibleInput({
  label,
  error,
  helpText,
  required,
  ...props
}: AccessibleInputProps) {
  const id = useId()
  const errorId = useId()
  const helpId = useId()

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-label="required">
            {' '}
            *
          </span>
        )}
      </label>

      {helpText && (
        <p id={helpId} className="form-field__help">
          {helpText}
        </p>
      )}

      <input
        {...props}
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          [error && errorId, helpText && helpId].filter(Boolean).join(' ') || undefined
        }
        aria-required={required}
        className="form-field__input"
      />

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="form-field__error"
        >
          {error}
        </div>
      )}
    </div>
  )
}

// ============================================
// Textarea
// ============================================

interface AccessibleTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helpText?: string
  currentLength?: number
  maxLength?: number
}

export function AccessibleTextarea({
  label,
  error,
  helpText,
  required,
  currentLength,
  maxLength,
  ...props
}: AccessibleTextareaProps) {
  const id = useId()
  const errorId = useId()
  const helpId = useId()
  const countId = useId()

  const showCount = currentLength !== undefined && maxLength !== undefined
  const remainingChars = showCount ? maxLength - currentLength : 0

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-label="required">
            {' '}
            *
          </span>
        )}
      </label>

      {helpText && (
        <p id={helpId} className="form-field__help">
          {helpText}
        </p>
      )}

      <textarea
        {...props}
        id={id}
        required={required}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={
          [error && errorId, helpText && helpId, showCount && countId]
            .filter(Boolean)
            .join(' ') || undefined
        }
        aria-required={required}
        className="form-field__textarea"
      />

      {showCount && (
        <p id={countId} className="form-field__count" aria-live="polite">
          {remainingChars} characters remaining
        </p>
      )}

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="form-field__error"
        >
          {error}
        </div>
      )}
    </div>
  )
}

// ============================================
// Checkbox
// ============================================

interface AccessibleCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
}

export function AccessibleCheckbox({
  label,
  description,
  ...props
}: AccessibleCheckboxProps) {
  const id = useId()
  const descId = useId()

  return (
    <div className="form-field form-field--checkbox">
      <input
        {...props}
        type="checkbox"
        id={id}
        aria-describedby={description ? descId : undefined}
        className="form-field__checkbox"
      />
      <label htmlFor={id} className="form-field__checkbox-label">
        {label}
        {description && (
          <span id={descId} className="form-field__checkbox-description">
            {description}
          </span>
        )}
      </label>
    </div>
  )
}

// ============================================
// Radio Group
// ============================================

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface AccessibleRadioGroupProps {
  name: string
  legend: string
  options: RadioOption[]
  value?: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

export function AccessibleRadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: AccessibleRadioGroupProps) {
  const errorId = useId()

  return (
    <fieldset
      className="form-field form-field--radio-group"
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="form-field__legend">
        {legend}
        {required && (
          <span className="form-field__required" aria-label="required">
            {' '}
            *
          </span>
        )}
      </legend>

      {options.map((option) => {
        const id = `${name}-${option.value}`
        const descId = `${id}-desc`

        return (
          <div key={option.value} className="form-field__radio">
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              aria-describedby={option.description ? descId : undefined}
              required={required}
              className="form-field__radio-input"
            />
            <label htmlFor={id} className="form-field__radio-label">
              {option.label}
              {option.description && (
                <span id={descId} className="form-field__radio-description">
                  {option.description}
                </span>
              )}
            </label>
          </div>
        )
      })}

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="form-field__error"
        >
          {error}
        </div>
      )}
    </fieldset>
  )
}

// ============================================
// Select
// ============================================

interface SelectOption {
  value: string
  label: string
}

interface AccessibleSelectProps {
  label: string
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  error?: string
  helpText?: string
  required?: boolean
  placeholder?: string
}

export function AccessibleSelect({
  label,
  options,
  value,
  onChange,
  error,
  helpText,
  required,
  placeholder,
}: AccessibleSelectProps) {
  const id = useId()
  const errorId = useId()
  const helpId = useId()

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-label="required">
            {' '}
            *
          </span>
        )}
      </label>

      {helpText && (
        <p id={helpId} className="form-field__help">
          {helpText}
        </p>
      )}

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          [error && errorId, helpText && helpId].filter(Boolean).join(' ') || undefined
        }
        aria-required={required}
        className="form-field__select"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="form-field__error"
        >
          {error}
        </div>
      )}
    </div>
  )
}

// Usage Examples:

// Text Input
// <AccessibleInput
//   label="Email Address"
//   type="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   error={emailError}
//   helpText="We'll never share your email"
//   required
// />

// Textarea with character count
// <AccessibleTextarea
//   label="Bio"
//   value={bio}
//   onChange={(e) => setBio(e.target.value)}
//   currentLength={bio.length}
//   maxLength={500}
//   helpText="Tell us about yourself"
// />

// Checkbox
// <AccessibleCheckbox
//   label="I accept the terms and conditions"
//   description="You must accept the terms to continue"
//   checked={acceptedTerms}
//   onChange={(e) => setAcceptedTerms(e.target.checked)}
// />

// Radio Group
// <AccessibleRadioGroup
//   name="plan"
//   legend="Choose a plan"
//   options={[
//     { value: 'free', label: 'Free', description: '$0/month' },
//     { value: 'pro', label: 'Pro', description: '$10/month' },
//   ]}
//   value={plan}
//   onChange={setPlan}
//   required
// />

// Select
// <AccessibleSelect
//   label="Country"
//   options={countries}
//   value={country}
//   onChange={setCountry}
//   placeholder="Select a country"
//   required
// />
