import { z } from 'zod';

/**
 * Schema validazione per signup form
 */
export const signupSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve essere almeno 2 caratteri')
    .max(50, 'Nome non può superare 50 caratteri'),

  email: z.string()
    .email('Email non valida')
    .min(1, 'Email obbligatoria'),

  password: z.string()
    .min(8, 'Password deve essere almeno 8 caratteri')
    .regex(/[A-Z]/, 'Password deve contenere almeno una maiuscola')
    .regex(/[a-z]/, 'Password deve contenere almeno una minuscola')
    .regex(/[0-9]/, 'Password deve contenere almeno un numero')
    .regex(/[^A-Za-z0-9]/, 'Password deve contenere almeno un carattere speciale'),

  confirmPassword: z.string()
    .min(1, 'Conferma password obbligatoria'),

  acceptTerms: z.boolean()
    .refine(val => val === true, {
      message: 'Devi accettare i termini e condizioni'
    })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Le password non corrispondono',
  path: ['confirmPassword']
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Schema validazione per workspace form
 */
export const workspaceSchema = z.object({
  name: z.string()
    .min(2, 'Nome workspace deve essere almeno 2 caratteri')
    .max(50, 'Nome workspace non può superare 50 caratteri')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Nome può contenere solo lettere, numeri, spazi e trattini'),

  description: z.string()
    .max(200, 'Descrizione non può superare 200 caratteri')
    .optional()
    .or(z.literal(''))
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;

/**
 * Schema validazione per billing form
 */
export const billingSchema = z.object({
  companyName: z.string()
    .min(2, 'Ragione sociale obbligatoria')
    .max(100, 'Ragione sociale non può superare 100 caratteri'),

  vatNumber: z.string()
    .regex(/^[A-Z]{2}[0-9]{11}$/, 'Partita IVA non valida (formato: IT12345678901)')
    .optional()
    .or(z.literal('')),

  address: z.string()
    .min(5, 'Indirizzo obbligatorio')
    .max(200, 'Indirizzo non può superare 200 caratteri'),

  city: z.string()
    .min(2, 'Città obbligatoria')
    .max(100, 'Città non può superare 100 caratteri'),

  postalCode: z.string()
    .regex(/^\d{5}$/, 'CAP non valido (5 cifre)'),

  country: z.string()
    .length(2, 'Codice paese non valido')
    .default('IT')
});

export type BillingFormData = z.infer<typeof billingSchema>;

/**
 * Valida forza password
 * @param password
 * @returns weak | medium | strong
 */
export function calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password || password.length < 8) return 'weak';

  let strength = 0;

  // Lunghezza
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Complessità
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 3) return 'weak';
  if (strength <= 5) return 'medium';
  return 'strong';
}
