import { z } from "zod";

// ============================================
// WORKSPACE VALIDATIONS
// ============================================

export const createWorkspaceSchema = z.object({
  name: z.string()
    .min(2, 'Nome workspace deve essere almeno 2 caratteri')
    .max(50, 'Nome workspace non può superare 50 caratteri')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Nome può contenere solo lettere, numeri, spazi e trattini'),

  description: z.string()
    .max(200, 'Descrizione non può superare 200 caratteri')
    .optional()
    .or(z.literal('')),

  slug: z.string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug può contenere solo lettere minuscole, numeri e trattini'),
});

export const updateWorkspaceSchema = z.object({
  name: z.string()
    .min(2, 'Nome workspace deve essere almeno 2 caratteri')
    .max(50, 'Nome workspace non può superare 50 caratteri')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Nome può contenere solo lettere, numeri, spazi e trattini')
    .optional(),

  description: z.string()
    .max(200, 'Descrizione non può superare 200 caratteri')
    .optional()
    .or(z.literal('')),

  settings: z.object({
    timezone: z.string().optional(),
    currency: z.string().optional(),
    locale: z.string().optional(),
    analyticsConnected: z.boolean().optional(),
    googleAdsConnected: z.boolean().optional(),
  }).optional(),
});

// ============================================
// MEMBER VALIDATIONS
// ============================================

export const inviteMemberSchema = z.object({
  email: z.string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'Email troppo corta')
    .max(100, 'Email troppo lunga'),

  role: z.enum(['admin', 'editor', 'viewer'], {
    required_error: 'Seleziona un ruolo',
    invalid_type_error: 'Ruolo non valido',
  }),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer'], {
    required_error: 'Seleziona un ruolo',
    invalid_type_error: 'Ruolo non valido',
  }),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Genera uno slug URL-friendly da un nome workspace
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Valida se un email è già presente tra i membri
 */
export function validateUniqueEmail(email: string, existingEmails: string[]): boolean {
  return !existingEmails.includes(email.toLowerCase());
}

/**
 * Valida se un utente può eseguire un'azione in base al ruolo
 */
export function canPerformAction(userRole: string, action: 'invite' | 'remove' | 'updateRole' | 'delete'): boolean {
  const permissions: Record<string, string[]> = {
    admin: ['invite', 'remove', 'updateRole', 'delete'],
    editor: ['invite'],
    viewer: [],
  };

  return permissions[userRole]?.includes(action) || false;
}
