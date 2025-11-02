---
name: form-builder
description: Generate form components with validation (Zod, Yup), React Hook Form integration, multi-step wizards, error handling, accessibility, and comprehensive testing patterns
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Form Builder

Expert skill for building production-ready form components with validation, state management, error handling, and accessibility. Specializes in React Hook Form, Zod validation, multi-step wizards, and form testing.

## Core Capabilities

### 1. Form Generation
- **Simple Forms**: Single-step forms with basic fields
- **Complex Forms**: Multi-field forms with nested structures
- **Multi-Step Wizards**: Step-by-step form flows
- **Dynamic Forms**: Add/remove fields dynamically
- **Conditional Fields**: Show/hide fields based on conditions
- **Form Arrays**: Repeatable field groups

### 2. Validation
- **Zod Integration**: Type-safe schema validation
- **Yup Support**: Alternative validation library
- **Custom Validators**: Project-specific validation rules
- **Async Validation**: Server-side validation
- **Cross-field Validation**: Validate based on multiple fields
- **Real-time Validation**: Validate on change/blur

### 3. State Management
- **React Hook Form**: Uncontrolled forms with minimal re-renders
- **Form State**: Values, errors, touched, dirty states
- **Form Context**: Share form state across components
- **Persistence**: Save/restore form state (localStorage)
- **Reset/Clear**: Reset to initial values
- **Submit States**: Loading, success, error states

### 4. Field Library
- **Text Input**: Single-line text, email, password
- **Textarea**: Multi-line text
- **Select**: Dropdown selection
- **Checkbox**: Single and group checkboxes
- **Radio**: Radio button groups
- **File Upload**: Single/multiple file upload
- **Date Picker**: Date and time selection
- **Switch**: Toggle switch
- **Slider**: Range selection

### 5. Error Handling
- **Field Errors**: Display errors below fields
- **Form-level Errors**: Display general form errors
- **Error Summary**: List all errors at top
- **Error Messages**: Clear, actionable messages
- **Error Recovery**: Help users fix errors
- **Server Errors**: Handle API validation errors

### 6. Accessibility
- **Semantic HTML**: Use proper form elements
- **Labels**: Associate labels with inputs
- **ARIA Attributes**: Live regions for errors
- **Keyboard Navigation**: Tab order, Enter to submit
- **Focus Management**: Auto-focus first error
- **Screen Reader**: Announce errors and states

### 7. Testing
- **Field Testing**: Test individual field behavior
- **Validation Testing**: Test validation rules
- **Submission Testing**: Test form submission
- **Error Testing**: Test error display
- **Async Testing**: Test async operations
- **Accessibility Testing**: Test a11y compliance

## Workflow

### Phase 1: Form Planning
1. **Define Requirements**
   - What data to collect?
   - What validation rules?
   - Single or multi-step?
   - Any conditional fields?

2. **Design Schema**
   - Define Zod/Yup schema
   - Validation rules
   - Default values
   - Error messages

3. **Plan UX**
   - Field layout
   - Error display
   - Submit button state
   - Success feedback

### Phase 2: Form Implementation
1. **Create Form Component**
   - Set up React Hook Form
   - Integrate validation schema
   - Create form fields
   - Add error handling

2. **Add Field Components**
   - Reusable field wrappers
   - Consistent styling
   - Error display
   - Accessibility attributes

3. **Implement Submission**
   - Handle form data
   - API integration
   - Loading states
   - Error handling
   - Success feedback

### Phase 3: Testing & Polish
1. **Write Tests**
   - Field interaction tests
   - Validation tests
   - Submission tests
   - Accessibility tests

2. **Add Polish**
   - Focus management
   - Loading indicators
   - Success animations
   - Error recovery

3. **Optimize Performance**
   - Minimize re-renders
   - Debounce validation
   - Lazy load large forms

## Form Patterns

### Simple Form (Login)

```typescript
// LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data)
      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <span id="password-error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('rememberMe')} />
          Remember me
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  )
}
```

### Complex Form with Nested Fields

```typescript
// ProfileForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  }),
  contact: z.object({
    email: z.string().email('Invalid email'),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
  }),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
    country: z.string().min(1, 'Country is required'),
  }),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.enum(['all', 'important', 'none']),
  }),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Personal Information</legend>

        <input {...register('personalInfo.firstName')} placeholder="First Name" />
        {errors.personalInfo?.firstName && (
          <span>{errors.personalInfo.firstName.message}</span>
        )}

        <input {...register('personalInfo.lastName')} placeholder="Last Name" />
        {errors.personalInfo?.lastName && (
          <span>{errors.personalInfo.lastName.message}</span>
        )}

        <input type="date" {...register('personalInfo.dateOfBirth')} />
        {errors.personalInfo?.dateOfBirth && (
          <span>{errors.personalInfo.dateOfBirth.message}</span>
        )}
      </fieldset>

      <fieldset>
        <legend>Contact</legend>

        <input type="email" {...register('contact.email')} placeholder="Email" />
        {errors.contact?.email && <span>{errors.contact.email.message}</span>}

        <input type="tel" {...register('contact.phone')} placeholder="Phone" />
        {errors.contact?.phone && <span>{errors.contact.phone.message}</span>}
      </fieldset>

      <fieldset>
        <legend>Address</legend>

        <input {...register('address.street')} placeholder="Street" />
        <input {...register('address.city')} placeholder="City" />
        <input {...register('address.zipCode')} placeholder="Zip Code" />
        <select {...register('address.country')}>
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </select>
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>

        <label>
          <input type="checkbox" {...register('preferences.newsletter')} />
          Subscribe to newsletter
        </label>

        <div>
          <label>
            <input type="radio" {...register('preferences.notifications')} value="all" />
            All notifications
          </label>
          <label>
            <input type="radio" {...register('preferences.notifications')} value="important" />
            Important only
          </label>
          <label>
            <input type="radio" {...register('preferences.notifications')} value="none" />
            None
          </label>
        </div>
      </fieldset>

      <button type="submit">Save Profile</button>
    </form>
  )
}
```

### Multi-Step Wizard

```typescript
// CheckoutWizard.tsx
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const step1Schema = z.object({
  shippingAddress: z.object({
    name: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(5),
  }),
})

const step2Schema = z.object({
  paymentMethod: z.enum(['card', 'paypal', 'bank']),
  cardNumber: z.string().regex(/^\d{16}$/).optional(),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/).optional(),
  cardCVC: z.string().regex(/^\d{3,4}$/).optional(),
})

const step3Schema = z.object({
  orderNotes: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms',
  }),
})

const checkoutSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutWizard() {
  const [step, setStep] = useState(1)

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  })

  const { handleSubmit, trigger } = methods

  const nextStep = async () => {
    let isValid = false

    if (step === 1) {
      isValid = await trigger(['shippingAddress'])
    } else if (step === 2) {
      isValid = await trigger(['paymentMethod', 'cardNumber', 'cardExpiry', 'cardCVC'])
    }

    if (isValid) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    await completeCheckout(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Progress Indicator */}
        <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
          Step {step} of 3
        </div>

        {/* Step Content */}
        {step === 1 && <ShippingStep />}
        {step === 2 && <PaymentStep />}
        {step === 3 && <ReviewStep />}

        {/* Navigation */}
        <div>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}

          {step < 3 ? (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit">Complete Order</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

function ShippingStep() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormData>()

  return (
    <fieldset>
      <legend>Shipping Address</legend>

      <input {...register('shippingAddress.name')} placeholder="Full Name" />
      {errors.shippingAddress?.name && (
        <span>{errors.shippingAddress.name.message}</span>
      )}

      <input {...register('shippingAddress.street')} placeholder="Street" />
      <input {...register('shippingAddress.city')} placeholder="City" />
      <input {...register('shippingAddress.zipCode')} placeholder="Zip Code" />
    </fieldset>
  )
}
```

### Dynamic Form (Add/Remove Fields)

```typescript
// TeamForm.tsx
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['developer', 'designer', 'manager']),
})

const teamSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  members: z.array(teamMemberSchema).min(1, 'At least one member is required'),
})

type TeamFormData = z.infer<typeof teamSchema>

export function TeamForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: '',
      members: [{ name: '', email: '', role: 'developer' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const onSubmit = async (data: TeamFormData) => {
    await createTeam(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="teamName">Team Name</label>
        <input id="teamName" {...register('teamName')} />
        {errors.teamName && <span>{errors.teamName.message}</span>}
      </div>

      <fieldset>
        <legend>Team Members</legend>

        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`members.${index}.name`)}
              placeholder="Name"
            />
            {errors.members?.[index]?.name && (
              <span>{errors.members[index].name.message}</span>
            )}

            <input
              type="email"
              {...register(`members.${index}.email`)}
              placeholder="Email"
            />
            {errors.members?.[index]?.email && (
              <span>{errors.members[index].email.message}</span>
            )}

            <select {...register(`members.${index}.role`)}>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>

            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: '', email: '', role: 'developer' })}
        >
          Add Member
        </button>
      </fieldset>

      {errors.members && <span>{errors.members.message}</span>}

      <button type="submit">Create Team</button>
    </form>
  )
}
```

### Async Validation

```typescript
// UsernameForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
})

type UsernameFormData = z.infer<typeof usernameSchema>

export function UsernameForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValidating },
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
  })

  const checkUsernameAvailability = async (username: string) => {
    const response = await fetch(`/api/check-username?username=${username}`)
    const data = await response.json()
    return data.available
  }

  const onSubmit = async (data: UsernameFormData) => {
    const isAvailable = await checkUsernameAvailability(data.username)

    if (!isAvailable) {
      setError('username', {
        type: 'manual',
        message: 'Username is already taken',
      })
      return
    }

    // Proceed with registration
    await registerUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register('username')}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {isValidating && <span>Checking availability...</span>}
        {errors.username && <span role="alert">{errors.username.message}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  )
}
```

## Reusable Field Components

### FormField Wrapper

```typescript
// FormField.tsx
import { useFormContext } from 'react-hook-form'

interface FormFieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  helpText?: string
  required?: boolean
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  helpText,
  required,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message as string | undefined

  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required && <span aria-label="required">*</span>}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          errorMessage
            ? `${name}-error`
            : helpText
            ? `${name}-help`
            : undefined
        }
      />

      {helpText && (
        <span id={`${name}-help`} className="help-text">
          {helpText}
        </span>
      )}

      {errorMessage && (
        <span id={`${name}-error`} role="alert" className="error-text">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

// Usage
<FormProvider {...methods}>
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormField name="email" label="Email" type="email" required />
    <FormField
      name="password"
      label="Password"
      type="password"
      helpText="Must be at least 8 characters"
      required
    />
  </form>
</FormProvider>
```

## Form Testing

### Testing Form Submission

```typescript
// LoginForm.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'user@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
      rememberMe: false,
    })
  })

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.type(screen.getByLabelText(/password/i), '123')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'user@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')

    const submitButton = screen.getByRole('button', { name: /log in/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/logging in/i)
  })
})
```

### Testing Field Validation

```typescript
// FormField.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormField } from './FormField'

const schema = z.object({
  email: z.string().email('Invalid email'),
})

function TestForm() {
  const methods = useForm({ resolver: zodResolver(schema) })
  return (
    <FormProvider {...methods}>
      <form>
        <FormField name="email" label="Email" type="email" required />
      </form>
    </FormProvider>
  )
}

describe('FormField', () => {
  it('shows error message for invalid input', async () => {
    const user = userEvent.setup()

    render(<TestForm />)

    const input = screen.getByLabelText(/email/i)
    await user.type(input, 'invalid')
    await user.tab() // Trigger blur

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows required indicator', () => {
    render(<TestForm />)
    expect(screen.getByLabelText(/required/i)).toBeInTheDocument()
  })
})
```

## Best Practices

### Form Design
1. **One Column Layout**: Easier to scan and complete
2. **Logical Grouping**: Group related fields together
3. **Clear Labels**: Descriptive, not placeholder
4. **Appropriate Fields**: Use correct input types
5. **Progress Indication**: Show progress in multi-step forms

### Validation
1. **Client-side First**: Fast feedback
2. **Server-side Always**: Trust nothing from client
3. **Inline Validation**: Validate on blur
4. **Clear Messages**: Tell users how to fix errors
5. **Positive Reinforcement**: Show success for valid fields

### Accessibility
1. **Keyboard Navigation**: All form controls accessible
2. **Labels**: Every field must have a label
3. **Error Announcement**: Use ARIA live regions
4. **Focus Management**: Move to first error on submit
5. **Help Text**: Provide guidance upfront

### Performance
1. **Uncontrolled Forms**: Use React Hook Form (minimal re-renders)
2. **Debounce Validation**: Avoid validating on every keystroke
3. **Code Splitting**: Lazy load large forms
4. **Optimistic Updates**: Update UI before server confirms
5. **Memoization**: Memo field components

### UX
1. **Autofocus**: Focus first field on mount
2. **Enter to Submit**: Allow Enter key to submit
3. **Clear Errors**: Clear errors when user starts fixing
4. **Loading States**: Show feedback during async operations
5. **Success Feedback**: Confirm successful submission

## When to Use This Skill

Activate this skill when you need to:
- Create login/registration forms
- Build contact/feedback forms
- Generate checkout/payment forms
- Create user profile forms
- Build multi-step wizards
- Implement dynamic forms
- Add file upload forms
- Create form validation
- Test form components
- Improve form accessibility
- Optimize form performance

## Output Format

When building forms, provide:
1. **Complete Form Component**: Production-ready code
2. **Validation Schema**: Zod/Yup schema with all rules
3. **Field Components**: Reusable field wrappers
4. **Test Suite**: Comprehensive form tests
5. **Accessibility Notes**: A11y compliance details
6. **Usage Examples**: How to integrate the form

Always build forms that are accessible, user-friendly, and thoroughly tested.
