import DOMPurify from 'dompurify'
import validator from 'validator'
import { z } from 'zod'
import { useCallback, useMemo } from 'react'

/**
 * INPUT SANITIZATION & VALIDATION
 *
 * Prevent XSS, SQL injection, and other injection attacks
 */

/**
 * PATTERN 1: HTML Sanitization with DOMPurify
 */

// Safe HTML rendering component
interface SafeHTMLProps {
  html: string
  allowedTags?: string[]
  allowedAttributes?: string[]
  className?: string
}

export function SafeHTML({
  html,
  allowedTags,
  allowedAttributes,
  className,
}: SafeHTMLProps) {
  const sanitizedHTML = useMemo(() => {
    const config: any = {}

    if (allowedTags) {
      config.ALLOWED_TAGS = allowedTags
    }

    if (allowedAttributes) {
      config.ALLOWED_ATTR = allowedAttributes
    }

    return DOMPurify.sanitize(html, config)
  }, [html, allowedTags, allowedAttributes])

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}

// Sanitization functions
export const sanitize = {
  // Basic HTML sanitization
  html: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target'],
    })
  },

  // Rich text with more tags
  richText: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'b',
        'i',
        'em',
        'strong',
        'code',
        'pre',
        'img',
      ],
      ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'class'],
    })
  },

  // Strip all HTML
  text: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    })
  },

  // URL sanitization
  url: (url: string): string => {
    const clean = DOMPurify.sanitize(url)
    // Only allow http/https protocols
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      return ''
    }
    return clean
  },
}

/**
 * PATTERN 2: Input Validation with validator.js
 */

export const validate = {
  email: (email: string): boolean => {
    return validator.isEmail(email)
  },

  url: (url: string): boolean => {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true,
    })
  },

  alphanumeric: (str: string): boolean => {
    return validator.isAlphanumeric(str)
  },

  numeric: (str: string): boolean => {
    return validator.isNumeric(str)
  },

  length: (str: string, min: number, max: number): boolean => {
    return validator.isLength(str, { min, max })
  },

  strongPassword: (password: string): boolean => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  },

  creditCard: (card: string): boolean => {
    return validator.isCreditCard(card)
  },

  phoneNumber: (phone: string, locale?: string): boolean => {
    return validator.isMobilePhone(phone, locale as any)
  },

  date: (date: string): boolean => {
    return validator.isDate(date)
  },

  ipAddress: (ip: string): boolean => {
    return validator.isIP(ip)
  },
}

/**
 * PATTERN 3: Zod Schema Validation
 */

// User registration schema
export const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

  confirmPassword: z.string(),

  age: z.number().int().min(13, 'You must be at least 13 years old'),

  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

// API input schema
export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  tags: z.array(z.string()).max(10),
  published: z.boolean().default(false),
})

/**
 * PATTERN 4: Safe Form Component
 */

interface SafeFormProps {
  onSubmit: (data: any) => void
  children: React.ReactNode
}

export function SafeForm({ onSubmit, children }: SafeFormProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const data: Record<string, any> = {}

      // Sanitize all form inputs
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          data[key] = sanitize.text(value.trim())
        } else {
          data[key] = value
        }
      }

      onSubmit(data)
    },
    [onSubmit]
  )

  return <form onSubmit={handleSubmit}>{children}</form>
}

/**
 * PATTERN 5: Sanitized Input Components
 */

interface SanitizedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  sanitizer?: (value: string) => string
}

export function SanitizedInput({
  value,
  onChange,
  sanitizer = sanitize.text,
  ...props
}: SanitizedInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizer(e.target.value)
      onChange(sanitized)
    },
    [onChange, sanitizer]
  )

  return <input value={value} onChange={handleChange} {...props} />
}

/**
 * PATTERN 6: SQL Injection Prevention
 *
 * Always use parameterized queries!
 */

// ❌ VULNERABLE - Never do this!
export function vulnerableQuery(userId: string) {
  // DO NOT USE
  const query = `SELECT * FROM users WHERE id = ${userId}`
  return query
}

// ✅ SAFE - Use parameterized queries
export function safeQuery(userId: string) {
  // With Prisma
  // const user = await prisma.user.findUnique({ where: { id: userId } })

  // With raw SQL (PostgreSQL example)
  // const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])

  // With MySQL
  // const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId])

  return 'Use parameterized queries!'
}

/**
 * PATTERN 7: Path Traversal Prevention
 */

export function sanitizeFilePath(filename: string): string {
  // Remove any path traversal attempts
  const clean = filename.replace(/\.\./g, '').replace(/\//g, '_')

  // Only allow alphanumeric, dash, underscore, and dot
  return clean.replace(/[^a-zA-Z0-9_.-]/g, '_')
}

/**
 * PATTERN 8: Command Injection Prevention
 */

export function sanitizeShellCommand(input: string): string {
  // Remove shell metacharacters
  return input.replace(/[;&|`$()><]/g, '')
}

// ❌ DANGEROUS - Never pass user input directly to shell
export function dangerousShellCommand(userInput: string) {
  // DO NOT USE
  // exec(`ls -la ${userInput}`)
}

// ✅ SAFE - Use allowed commands with validation
export function safeShellCommand(action: 'list' | 'read', filename: string) {
  const sanitized = sanitizeFilePath(filename)

  // Whitelist allowed actions
  switch (action) {
    case 'list':
      // Use safe API instead of shell
      break
    case 'read':
      // Use fs.readFile with validated path
      break
    default:
      throw new Error('Invalid action')
  }
}

/**
 * PATTERN 9: Custom Validation Hook
 */

export function useValidation<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback(
    (data: unknown): data is T => {
      const result = schema.safeParse(data)

      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.errors.forEach((err) => {
          const path = err.path.join('.')
          fieldErrors[path] = err.message
        })
        setErrors(fieldErrors)
        return false
      }

      setErrors({})
      return true
    },
    [schema]
  )

  const getFieldError = useCallback(
    (field: string) => errors[field],
    [errors]
  )

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  return { validate, errors, getFieldError, clearError }
}

// Usage example
export function RegistrationForm() {
  const { validate, errors, getFieldError } = useValidation(userRegistrationSchema)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (validate(data)) {
      // Data is valid and type-safe
      console.log('Valid data:', data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      {getFieldError('username') && <span>{getFieldError('username')}</span>}
      {/* More fields */}
    </form>
  )
}

// Add React import
import { useState } from 'react'
