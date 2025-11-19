import { NextRequest, NextResponse } from 'next/server';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  consent: boolean;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 5000); // Limit length
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - record.timestamp)) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter)
          }
        }
      );
    }

    // Parse request body
    const body = await request.json() as ContactFormData;

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.consent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email).toLowerCase(),
      company: body.company ? sanitizeInput(body.company) : undefined,
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      message: sanitizeInput(body.message),
      consent: Boolean(body.consent),
      timestamp: new Date().toISOString(),
      ip: ip !== 'unknown' ? ip : undefined
    };

    // Validate email format
    if (!isValidEmail(sanitizedData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (sanitizedData.name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email notification (using Resend, SendGrid, etc.)
    // 2. Save to database
    // 3. Integrate with CRM

    // For now, log the submission (in production, implement actual sending)
    console.log('Contact form submission:', {
      ...sanitizedData,
      ip: '[REDACTED]' // Don't log IP in production logs
    });

    // TODO: Implement actual email sending
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'QuickFy <noreply@quickfy.eu>',
    //   to: ['info@quickfy.eu'],
    //   subject: `Nuova richiesta contatto da ${sanitizedData.name}`,
    //   html: `
    //     <h2>Nuova richiesta di contatto</h2>
    //     <p><strong>Nome:</strong> ${sanitizedData.name}</p>
    //     <p><strong>Email:</strong> ${sanitizedData.email}</p>
    //     <p><strong>Azienda:</strong> ${sanitizedData.company || 'Non specificato'}</p>
    //     <p><strong>Telefono:</strong> ${sanitizedData.phone || 'Non specificato'}</p>
    //     <p><strong>Messaggio:</strong></p>
    //     <p>${sanitizedData.message}</p>
    //   `
    // });

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
