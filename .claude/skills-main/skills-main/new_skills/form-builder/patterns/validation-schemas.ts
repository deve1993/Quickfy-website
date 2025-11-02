// Common validation schemas using Zod
import { z } from 'zod'

// ============================================
// Basic Field Validations
// ============================================

export const email = z.string().email('Invalid email address')

export const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const username = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')

export const phone = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number')

export const zipCode = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code')

export const url = z.string().url('Invalid URL')

export const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')

export const creditCard = z
  .string()
  .regex(/^\d{16}$/, 'Invalid card number (16 digits)')

export const cvv = z
  .string()
  .regex(/^\d{3,4}$/, 'Invalid CVV (3-4 digits)')

export const expiryDate = z
  .string()
  .regex(/^\d{2}\/\d{2}$/, 'Invalid expiry (MM/YY)')

// ============================================
// Form-level Validations
// ============================================

// Password confirmation
export const passwordConfirmation = z
  .object({
    password: password,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Date range validation
export const dateRange = z
  .object({
    startDate: date,
    endDate: date,
  })
  .refine(data => new Date(data.startDate) <= new Date(data.endDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
  })

// Age validation (must be 18+)
export const ageVerification = z
  .string()
  .refine(
    dateString => {
      const birthDate = new Date(dateString)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18
    },
    { message: 'You must be at least 18 years old' }
  )

// ============================================
// Complete Form Schemas
// ============================================

// Login Form
export const loginSchema = z.object({
  email: email,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

// Registration Form
export const registrationSchema = z
  .object({
    username: username,
    email: email,
    password: password,
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Contact Form
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: email,
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Profile Form
export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: email,
  phone: phone.optional(),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
  website: url.optional().or(z.literal('')),
  dateOfBirth: date.optional(),
})

// Address Form
export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: zipCode,
  country: z.string().min(1, 'Country is required'),
})

// Payment Form
export const paymentSchema = z.object({
  cardNumber: creditCard,
  cardName: z.string().min(1, 'Cardholder name is required'),
  expiryDate: expiryDate,
  cvv: cvv,
  billingAddress: addressSchema,
})

// ============================================
// Async Validation Helpers
// ============================================

// Check if email is available (example)
export const createAsyncEmailValidation = (checkEmail: (email: string) => Promise<boolean>) => {
  return z.string().email().refine(
    async email => {
      return await checkEmail(email)
    },
    { message: 'Email is already taken' }
  )
}

// Check if username is available (example)
export const createAsyncUsernameValidation = (
  checkUsername: (username: string) => Promise<boolean>
) => {
  return username.refine(
    async username => {
      return await checkUsername(username)
    },
    { message: 'Username is already taken' }
  )
}

// ============================================
// Conditional Validation
// ============================================

// Shipping form with conditional billing address
export const shippingSchema = z
  .object({
    shippingAddress: addressSchema,
    sameAsBilling: z.boolean(),
    billingAddress: addressSchema.optional(),
  })
  .refine(
    data => {
      // If not same as billing, billing address is required
      if (!data.sameAsBilling && !data.billingAddress) {
        return false
      }
      return true
    },
    {
      message: 'Billing address is required',
      path: ['billingAddress'],
    }
  )

// Payment method with conditional fields
export const paymentMethodSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('card'),
    cardNumber: creditCard,
    expiryDate: expiryDate,
    cvv: cvv,
  }),
  z.object({
    method: z.literal('paypal'),
    paypalEmail: email,
  }),
  z.object({
    method: z.literal('bank'),
    accountNumber: z.string().min(10, 'Invalid account number'),
    routingNumber: z.string().min(9, 'Invalid routing number'),
  }),
])
