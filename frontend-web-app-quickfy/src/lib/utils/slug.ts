/**
 * Genera uno slug URL-friendly da una stringa
 *
 * @param text - Testo da convertire in slug
 * @returns Slug normalizzato (lowercase, trattini, senza caratteri speciali)
 *
 * @example
 * generateSlug("My Awesome Workspace") // "my-awesome-workspace"
 * generateSlug("Test  Multiple   Spaces") // "test-multiple-spaces"
 * generateSlug("Àccènts & Spëcial!") // "accents-special"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompone caratteri accentati
    .replace(/[\u0300-\u036f]/g, '') // Rimuove diacritici
    .replace(/[^a-z0-9\s-]/g, '') // Rimuove caratteri speciali
    .trim()
    .replace(/\s+/g, '-') // Sostituisce spazi con trattini
    .replace(/-+/g, '-') // Rimuove trattini multipli
    .replace(/^-|-$/g, ''); // Rimuove trattini iniziali/finali
}

/**
 * Valida se una stringa è un slug valido
 *
 * @param slug - Slug da validare
 * @returns true se il slug è valido
 *
 * @example
 * isValidSlug("my-workspace") // true
 * isValidSlug("My Workspace") // false
 * isValidSlug("workspace--name") // false
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Genera un slug univoco aggiungendo un numero se necessario
 *
 * @param baseSlug - Slug base
 * @param existingSlugs - Array di slug già esistenti
 * @returns Slug univoco
 *
 * @example
 * generateUniqueSlug("workspace", ["workspace", "workspace-2"]) // "workspace-3"
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}
