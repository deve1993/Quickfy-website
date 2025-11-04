/**
 * Tipi per il sistema di notifiche
 */

/**
 * Categorie di notifiche disponibili nell'applicazione
 */
export type NotificationCategory =
  | 'review'    // Nuove recensioni ricevute
  | 'ticket'    // Ticket urgenti/messaggi di supporto
  | 'system'    // Alert di sistema
  | 'report'    // Report settimanali pronti
  | 'mention';  // Menzioni/commenti

/**
 * Interfaccia principale per una notifica
 */
export interface Notification {
  /** ID univoco della notifica */
  id: string;

  /** Categoria della notifica */
  category: NotificationCategory;

  /** Titolo della notifica */
  title: string;

  /** Messaggio/descrizione della notifica */
  message: string;

  /** Timestamp creazione (ISO string o Date) */
  timestamp: string;

  /** Stato lettura (true = letta, false = non letta) */
  read: boolean;

  /** URL di destinazione (opzionale) */
  href?: string;

  /** Dati aggiuntivi specifici per categoria (opzionale) */
  metadata?: NotificationMetadata;
}

/**
 * Metadati aggiuntivi per notifiche specifiche
 */
export interface NotificationMetadata {
  /** Nome utente che ha generato la notifica */
  userName?: string;

  /** Avatar URL dell'utente */
  userAvatar?: string;

  /** Rating (per recensioni) */
  rating?: number;

  /** Priorità (per ticket) */
  priority?: 'low' | 'medium' | 'high' | 'urgent';

  /** Tipo di report */
  reportType?: string;

  /** ID entità correlata */
  entityId?: string;
}

/**
 * Tipo per filtrare le notifiche
 */
export type NotificationFilter = NotificationCategory | 'all';

/**
 * Configurazione per icone e colori delle categorie
 */
export interface NotificationCategoryConfig {
  icon: string;
  color: string;
  label: string;
}

/**
 * Mappa configurazioni per ogni categoria
 */
export type NotificationCategoryConfigMap = Record<
  NotificationCategory,
  NotificationCategoryConfig
>;
