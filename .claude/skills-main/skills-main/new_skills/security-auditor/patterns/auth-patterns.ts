import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

/**
 * AUTHENTICATION & AUTHORIZATION PATTERNS
 */

/**
 * PATTERN 1: Secure Password Hashing
 */

export const passwordUtils = {
  // Hash password with bcrypt
  async hash(password: string): Promise<string> {
    const saltRounds = 12 // Higher is more secure but slower
    return bcrypt.hash(password, saltRounds)
  },

  // Verify password
  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  },

  // Check password strength
  checkStrength(password: string): {
    isStrong: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (password.length < 8) feedback.push('Use at least 8 characters')
    if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters')
    if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters')
    if (!/[0-9]/.test(password)) feedback.push('Add numbers')
    if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add special characters')

    return {
      isStrong: score >= 5,
      score,
      feedback,
    }
  },
}

/**
 * PATTERN 2: JWT Token Management
 */

interface JWTPayload {
  userId: string
  email: string
  role?: string
}

export const jwtUtils = {
  // Generate access token (short-lived)
  generateAccessToken(payload: JWTPayload): string {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET not configured')

    return jwt.sign(payload, secret, {
      expiresIn: '15m', // 15 minutes
      issuer: 'your-app',
      audience: 'your-app-users',
    })
  },

  // Generate refresh token (long-lived)
  generateRefreshToken(payload: JWTPayload): string {
    const secret = process.env.JWT_REFRESH_SECRET
    if (!secret) throw new Error('JWT_REFRESH_SECRET not configured')

    return jwt.sign(payload, secret, {
      expiresIn: '7d', // 7 days
      issuer: 'your-app',
      audience: 'your-app-users',
    })
  },

  // Verify access token
  verifyAccessToken(token: string): JWTPayload | null {
    try {
      const secret = process.env.JWT_SECRET
      if (!secret) throw new Error('JWT_SECRET not configured')

      return jwt.verify(token, secret, {
        issuer: 'your-app',
        audience: 'your-app-users',
      }) as JWTPayload
    } catch (error) {
      return null
    }
  },

  // Verify refresh token
  verifyRefreshToken(token: string): JWTPayload | null {
    try {
      const secret = process.env.JWT_REFRESH_SECRET
      if (!secret) throw new Error('JWT_REFRESH_SECRET not configured')

      return jwt.verify(token, secret, {
        issuer: 'your-app',
        audience: 'your-app-users',
      }) as JWTPayload
    } catch (error) {
      return null
    }
  },

  // Decode without verification (for inspecting expired tokens)
  decode(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload
    } catch {
      return null
    }
  },
}

/**
 * PATTERN 3: Secure Cookie Configuration
 */

export const cookieConfig = {
  // Development
  development: {
    httpOnly: true,
    secure: false, // Allow HTTP in development
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  },

  // Production
  production: {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
    domain: '.yourdomain.com', // Allow subdomains
  },
}

export function getCookieConfig() {
  return process.env.NODE_ENV === 'production'
    ? cookieConfig.production
    : cookieConfig.development
}

/**
 * PATTERN 4: Authentication Middleware (Express)
 */

export function authMiddleware(req: any, res: any, next: any) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null

  // Or from cookie
  const cookieToken = req.cookies?.accessToken

  const finalToken = token || cookieToken

  if (!finalToken) {
    return res.status(401).json({ error: 'No token provided' })
  }

  // Verify token
  const payload = jwtUtils.verifyAccessToken(finalToken)

  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  // Attach user to request
  req.user = payload

  next()
}

/**
 * PATTERN 5: Role-Based Access Control (RBAC)
 */

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export function requireRole(...allowedRoles: Role[]) {
  return (req: any, res: any, next: any) => {
    const userRole = req.user?.role as Role

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}

// Usage: app.get('/admin', authMiddleware, requireRole(Role.ADMIN), handler)

/**
 * PATTERN 6: Rate Limiting
 */

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(config: RateLimitConfig) {
  return (req: any, res: any, next: any) => {
    const identifier = req.ip || req.user?.userId || 'unknown'
    const now = Date.now()

    const record = rateLimitStore.get(identifier)

    // Reset if window expired
    if (!record || now > record.resetAt) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetAt: now + config.windowMs,
      })
      return next()
    }

    // Increment count
    record.count++

    // Check if limit exceeded
    if (record.count > config.maxRequests) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000)
      res.setHeader('Retry-After', retryAfter.toString())
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter,
      })
    }

    next()
  }
}

// Usage: app.use('/api', rateLimit({ windowMs: 60000, maxRequests: 100 }))

/**
 * PATTERN 7: Login Function
 */

export async function login(email: string, password: string) {
  // 1. Validate input
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  })

  const result = schema.safeParse({ email, password })
  if (!result.success) {
    throw new Error('Invalid input')
  }

  // 2. Find user (example with Prisma)
  // const user = await prisma.user.findUnique({ where: { email } })
  const user = { id: '123', email, password: 'hashed', role: 'user' } // Example

  if (!user) {
    // Don't reveal if user exists
    throw new Error('Invalid credentials')
  }

  // 3. Verify password
  const isValid = await passwordUtils.verify(password, user.password)

  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  // 4. Generate tokens
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = jwtUtils.generateAccessToken(payload)
  const refreshToken = jwtUtils.generateRefreshToken(payload)

  // 5. Store refresh token in database
  // await prisma.refreshToken.create({
  //   data: { token: refreshToken, userId: user.id }
  // })

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  }
}

/**
 * PATTERN 8: Refresh Token Function
 */

export async function refreshAccessToken(refreshToken: string) {
  // 1. Verify refresh token
  const payload = jwtUtils.verifyRefreshToken(refreshToken)

  if (!payload) {
    throw new Error('Invalid refresh token')
  }

  // 2. Check if token exists in database
  // const storedToken = await prisma.refreshToken.findUnique({
  //   where: { token: refreshToken }
  // })
  // if (!storedToken) {
  //   throw new Error('Token not found')
  // }

  // 3. Generate new access token
  const newAccessToken = jwtUtils.generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  })

  return { accessToken: newAccessToken }
}

/**
 * PATTERN 9: Logout Function
 */

export async function logout(refreshToken: string) {
  // Remove refresh token from database
  // await prisma.refreshToken.delete({
  //   where: { token: refreshToken }
  // })

  // Client should also:
  // - Clear localStorage/sessionStorage
  // - Remove cookies
  // - Redirect to login page
}

/**
 * PATTERN 10: Two-Factor Authentication (2FA)
 */

import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export const twoFactorAuth = {
  // Generate secret for user
  async generateSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: `YourApp (${email})`,
      issuer: 'YourApp',
    })

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)

    return {
      secret: secret.base32,
      qrCode: qrCodeUrl,
    }
  },

  // Verify 2FA token
  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2, // Allow 2 time steps before/after
    })
  },
}

/**
 * PATTERN 11: Password Reset Flow
 */

export const passwordReset = {
  // Generate reset token
  generateResetToken(): string {
    return jwt.sign({ type: 'password-reset' }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })
  },

  // Verify reset token
  verifyResetToken(token: string): boolean {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
      return payload.type === 'password-reset'
    } catch {
      return false
    }
  },

  // Send reset email (implement with your email service)
  async sendResetEmail(email: string, token: string) {
    const resetUrl = `https://yourapp.com/reset-password?token=${token}`
    // Send email with resetUrl
    console.log(`Send reset email to ${email}: ${resetUrl}`)
  },
}
