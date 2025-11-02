// Simple form template with basic validation
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define your schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Replace with your API call
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      // Reset form on success
      reset()

      // Show success message
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit form')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name Field */}
      <div className="form-field">
        <label htmlFor="name">
          Name <span aria-label="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" role="alert" className="error">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="form-field">
        <label htmlFor="email">
          Email <span aria-label="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert" className="error">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="form-field">
        <label htmlFor="message">
          Message <span aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" role="alert" className="error">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
