# Backend Security Specifications for Quickfy

**Document Version**: 1.0
**Date**: 2025-11-02
**Target**: Backend Development Team

---

## 🎯 Overview

This document outlines the **mandatory security requirements** for the Quickfy backend API. The frontend implements client-side sanitization and validation, but these are **NOT sufficient** for security. The backend MUST implement all security measures described below.

---

## 🔐 1. Authentication & Authorization

### 1.1 JWT Token Management

**Requirements:**
- **HttpOnly Cookies**: Store JWT tokens in HttpOnly cookies (NOT localStorage)
- **Secure Flag**: Enable Secure flag in production (HTTPS only)
- **SameSite**: Set SameSite=Strict to prevent CSRF
- **Token Expiration**:
  - Access token: 15 minutes
  - Refresh token: 7 days
- **Token Rotation**: Implement refresh token rotation

**Implementation Example:**
```typescript
// Set-Cookie header format
Set-Cookie: accessToken=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=900
Set-Cookie: refreshToken=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/api/auth/refresh
```

### 1.2 Password Security

**Requirements:**
- **Hashing Algorithm**: bcrypt with cost factor ≥ 12
- **Password Requirements**:
  - Minimum 8 characters
  - At least 1 uppercase, 1 lowercase, 1 number, 1 special char
- **Password Reset**: Time-limited tokens (30 minutes expiry)
- **Failed Login Protection**: Lock account after 5 failed attempts (15 min lockout)

---

## 🛡️ 2. CSRF Protection

### 2.1 CSRF Tokens

**Requirements:**
- Implement CSRF tokens for ALL state-changing operations (POST, PUT, PATCH, DELETE)
- Token generation: Cryptographically secure random tokens
- Token validation: Server-side verification on every request
- Token expiry: 1 hour

**Headers:**
```
X-CSRF-Token: <csrf_token>
```

### 2.2 Double Submit Cookie Pattern

**Alternative implementation:**
```
Cookie: csrf_token=<token>
Header: X-CSRF-Token=<token>
```
Backend validates that cookie value matches header value.

---

## 🚦 3. Rate Limiting

**Requirements per endpoint:**

| Endpoint Category | Rate Limit | Window | Action on Exceed |
|------------------|------------|---------|------------------|
| Authentication (`/api/auth/*`) | 5 requests | 15 min | 429 + 15min ban |
| Data Mutations (POST/PUT/DELETE) | 100 requests | 1 hour | 429 + temporary throttle |
| Data Reads (GET) | 1000 requests | 1 hour | 429 response |
| File Uploads | 10 files | 1 hour | 429 + quota exceeded |

**Implementation:**
- Use IP-based rate limiting + user ID (if authenticated)
- Include retry headers: `Retry-After`, `X-RateLimit-Remaining`
- Log rate limit violations for monitoring

---

## 🔒 4. Input Validation & Sanitization

### 4.1 Server-Side Validation

**CRITICAL**: NEVER trust frontend validation. Always validate on backend.

**Requirements:**
- **Type validation**: Ensure correct data types
- **Length validation**: Enforce max lengths for all strings
- **Format validation**: Email, URL, phone numbers, etc.
- **Whitelist validation**: Only accept expected values (enums, predefined lists)
- **Range validation**: Numeric values within expected ranges

**Example Schema (using Zod or similar):**
```typescript
const ticketSchema = z.object({
  subject: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['open', 'in_progress', 'waiting', 'closed']),
});
```

### 4.2 SQL Injection Prevention

**Requirements:**
- **ALWAYS use parameterized queries / prepared statements**
- NEVER concatenate user input directly into SQL
- Use ORM with proper escaping (Prisma, TypeORM, Sequelize)

**Example (CORRECT):**
```typescript
// ✅ SAFE
db.query('SELECT * FROM tickets WHERE id = ?', [ticketId]);

// ❌ UNSAFE - NEVER DO THIS
db.query(`SELECT * FROM tickets WHERE id = ${ticketId}`);
```

### 4.3 NoSQL Injection Prevention

**Requirements:**
- Validate and sanitize all MongoDB queries
- Use `$` operator whitelisting
- Never pass raw user input to query operators

---

## 🌐 5. Security Headers

**Mandatory HTTP headers for ALL responses:**

```http
# Prevent XSS
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

# Content Security Policy
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.quickfy.com;

# HTTPS enforcement (production)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Referrer policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions policy
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 📁 6. File Upload Security

**Requirements:**

### 6.1 File Type Validation
- **Whitelist approach**: Only allow specific MIME types
- **Magic number validation**: Check file signatures, not just extensions
- **Allowed types**: `image/jpeg`, `image/png`, `image/gif`, `application/pdf`
- **Max file size**: 5MB per file
- **Filename sanitization**: Remove path traversal characters (`../`, `..\\`)

### 6.2 File Storage
- Store files OUTSIDE web root
- Generate random filenames (UUID)
- Scan files with antivirus before storage (ClamAV)
- Serve files through dedicated endpoint with proper headers

**Example:**
```typescript
// Original: user_upload.php.jpg
// Stored as: a3f2c891-b4d5-4e3a-9c1f-8b7a6d5e4c3b.jpg
// Path: /app/storage/uploads/<uuid>.jpg (not in /public)
```

---

## 🔍 7. API Security Best Practices

### 7.1 CORS Configuration

**Production:**
```typescript
cors({
  origin: 'https://quickfy.com', // Specific domain only
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
})
```

### 7.2 Request Size Limits

```typescript
{
  json: '10mb',    // JSON payloads
  urlencoded: '10mb', // Form data
  raw: '5mb',      // Raw data
  multipart: '50mb', // File uploads
}
```

### 7.3 Error Handling

**NEVER expose:**
- Stack traces in production
- Database error messages
- Internal file paths
- Framework/library versions
- Sensitive configuration details

**Return generic errors:**
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred. Please try again later.",
  "requestId": "uuid-for-logging"
}
```

Log detailed errors server-side only.

---

## 📊 8. Logging & Monitoring

**Requirements:**

### 8.1 Security Event Logging
- Failed login attempts (IP, timestamp, username)
- Rate limit violations
- CSRF token mismatches
- Invalid JWT tokens
- Suspicious file uploads
- SQL injection attempts (detected patterns)

### 8.2 Audit Trail
- User actions (create, update, delete)
- Admin actions (elevated permissions)
- Data exports
- Password changes
- 2FA enable/disable

### 8.3 Monitoring Alerts
- Threshold: >10 failed logins/min from single IP → Alert
- Threshold: >100 rate limit violations/hour → Alert
- Threshold: Any SQL injection pattern detected → Immediate alert

---

## 🗄️ 9. Database Security

**Requirements:**

### 9.1 Connection Security
- Use SSL/TLS for database connections
- Database user with **minimum required privileges**
- Separate users for read-only vs. read-write operations
- Never use root/admin database user

### 9.2 Data Encryption
- **Encryption at rest**: Enable for database storage
- **Sensitive fields**: Encrypt PII (email, phone, address) using AES-256
- **Encryption keys**: Store in environment variables or vault (NOT in code)

### 9.3 Backup & Recovery
- Automated daily backups
- Encrypted backup storage
- Test recovery process monthly
- Retain backups for 30 days

---

## 🔐 10. Environment & Configuration

### 10.1 Environment Variables

**NEVER commit to git:**
- Database credentials
- API keys
- JWT secret
- Encryption keys
- Third-party service tokens

**Use:**
```
.env (gitignored)
or
Vault service (HashiCorp Vault, AWS Secrets Manager)
```

### 10.2 Production Checklist

- [ ] Debug mode disabled
- [ ] Development dependencies not installed
- [ ] Error stack traces hidden
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Monitoring/alerting active
- [ ] Database encrypted
- [ ] Regular security updates

---

## 📝 11. Additional Recommendations

### 11.1 Dependency Security
- Run `npm audit` monthly
- Update dependencies regularly
- Use Dependabot or Snyk for vulnerability alerts
- Pin dependency versions in production

### 11.2 API Versioning
```
/api/v1/tickets
/api/v1/goals
```
- Allows security patches without breaking clients
- Deprecate old versions with 6-month notice

### 11.3 GDPR Compliance
- Data retention policies
- User data export functionality
- Account deletion (right to be forgotten)
- Privacy policy endpoint

---

## 🚨 Security Incident Response

**In case of breach:**

1. **Immediate**: Disable affected endpoints
2. **Within 1 hour**: Notify security team
3. **Within 24 hours**: Assess impact, notify affected users
4. **Within 72 hours**: Report to authorities (if required by GDPR)
5. **Post-mortem**: Document incident, implement fixes

---

## 📧 Contact

For security questions or to report vulnerabilities:
- **Email**: security@quickfy.com
- **Response time**: Within 24 hours

---

## ✅ Compliance Verification

Before going to production, the backend MUST pass:

- [ ] Penetration testing (OWASP Top 10)
- [ ] Security audit by independent party
- [ ] Load testing with rate limits enabled
- [ ] GDPR compliance review
- [ ] Disaster recovery drill

---

**Document ends**

_This document should be reviewed and updated quarterly._
