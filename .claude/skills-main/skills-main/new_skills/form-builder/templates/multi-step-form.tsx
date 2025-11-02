// Multi-step wizard form template
import { useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define schemas for each step
const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
})

const step2Schema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
})

const step3Schema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry (MM/YY)'),
  cardCVC: z.string().regex(/^\d{3,4}$/, 'Invalid CVC'),
})

// Merge all schemas
const formSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type FormData = z.infer<typeof formSchema>

export function MultiStepForm() {
  const [step, setStep] = useState(1)

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  const { handleSubmit, trigger } = methods

  const nextStep = async () => {
    let isValid = false

    // Validate current step fields only
    if (step === 1) {
      isValid = await trigger(['firstName', 'lastName', 'email'])
    } else if (step === 2) {
      isValid = await trigger(['address', 'city', 'zipCode'])
    }

    if (isValid) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit form')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Progress Indicator */}
        <div className="progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Address</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}

        {/* Navigation */}
        <div className="form-navigation">
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
            <button type="submit">Complete</button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

// Step 1: Personal Information
function Step1() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <fieldset>
      <legend>Personal Information</legend>

      <div className="form-field">
        <label htmlFor="firstName">First Name *</label>
        <input id="firstName" {...register('firstName')} />
        {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="lastName">Last Name *</label>
        <input id="lastName" {...register('lastName')} />
        {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>
    </fieldset>
  )
}

// Step 2: Address
function Step2() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <fieldset>
      <legend>Address</legend>

      <div className="form-field">
        <label htmlFor="address">Street Address *</label>
        <input id="address" {...register('address')} />
        {errors.address && <span role="alert">{errors.address.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="city">City *</label>
        <input id="city" {...register('city')} />
        {errors.city && <span role="alert">{errors.city.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="zipCode">Zip Code *</label>
        <input id="zipCode" {...register('zipCode')} />
        {errors.zipCode && <span role="alert">{errors.zipCode.message}</span>}
      </div>
    </fieldset>
  )
}

// Step 3: Payment
function Step3() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <fieldset>
      <legend>Payment Information</legend>

      <div className="form-field">
        <label htmlFor="cardNumber">Card Number *</label>
        <input id="cardNumber" {...register('cardNumber')} placeholder="1234567812345678" />
        {errors.cardNumber && <span role="alert">{errors.cardNumber.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cardExpiry">Expiry *</label>
          <input id="cardExpiry" {...register('cardExpiry')} placeholder="MM/YY" />
          {errors.cardExpiry && <span role="alert">{errors.cardExpiry.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="cardCVC">CVC *</label>
          <input id="cardCVC" {...register('cardCVC')} placeholder="123" />
          {errors.cardCVC && <span role="alert">{errors.cardCVC.message}</span>}
        </div>
      </div>
    </fieldset>
  )
}
