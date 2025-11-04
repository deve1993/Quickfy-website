import type { Notification } from '@/types';

/**
 * Funzione helper per generare timestamp relativi
 */
function getRelativeTimestamp(minutesAgo: number): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
}

/**
 * Dati mock per il sistema di notifiche
 * Include tutti i tipi di notifiche: review, ticket, system, report, mention
 */
export const mockNotifications: Notification[] = [
  // === RECENSIONI (REVIEWS) ===
  {
    id: 'notif-1',
    category: 'review',
    title: 'Nuova recensione 5 stelle',
    message: 'Maria Rossi ha lasciato una recensione positiva per il tuo servizio "Consulenza Marketing"',
    timestamp: getRelativeTimestamp(30), // 30 minuti fa
    read: false,
    href: '/dashboard/reviews/rev-12345',
    metadata: {
      userName: 'Maria Rossi',
      rating: 5,
      entityId: 'rev-12345',
    },
  },
  {
    id: 'notif-2',
    category: 'review',
    title: 'Risposta a recensione richiesta',
    message: 'Giovanni Bianchi ha lasciato una recensione 3 stelle. Considera di rispondere.',
    timestamp: getRelativeTimestamp(120), // 2 ore fa
    read: false,
    href: '/dashboard/reviews/rev-12346',
    metadata: {
      userName: 'Giovanni Bianchi',
      rating: 3,
      entityId: 'rev-12346',
    },
  },
  {
    id: 'notif-3',
    category: 'review',
    title: 'Recensione eccellente ricevuta',
    message: 'Francesca Verdi ha elogiato il tuo team per la professionalità dimostrata',
    timestamp: getRelativeTimestamp(1440), // 1 giorno fa
    read: true,
    href: '/dashboard/reviews/rev-12347',
    metadata: {
      userName: 'Francesca Verdi',
      rating: 5,
      entityId: 'rev-12347',
    },
  },

  // === TICKET URGENTI (TICKETS) ===
  {
    id: 'notif-4',
    category: 'ticket',
    title: 'Ticket urgente aperto',
    message: 'Cliente segnala problema critico con integrazione pagamenti. Richiede assistenza immediata.',
    timestamp: getRelativeTimestamp(15), // 15 minuti fa
    read: false,
    href: '/dashboard/support/ticket-4567',
    metadata: {
      priority: 'urgent',
      userName: 'Luca Ferrari',
      entityId: 'ticket-4567',
    },
  },
  {
    id: 'notif-5',
    category: 'ticket',
    title: 'Nuovo messaggio da cliente',
    message: 'Alessandro Neri ha risposto al ticket #3421 con informazioni aggiuntive',
    timestamp: getRelativeTimestamp(90), // 1.5 ore fa
    read: false,
    href: '/dashboard/support/ticket-3421',
    metadata: {
      priority: 'high',
      userName: 'Alessandro Neri',
      entityId: 'ticket-3421',
    },
  },
  {
    id: 'notif-6',
    category: 'ticket',
    title: 'Richiesta supporto tecnico',
    message: 'Problema segnalato con esportazione dati analytics. Priorità media.',
    timestamp: getRelativeTimestamp(300), // 5 ore fa
    read: true,
    href: '/dashboard/support/ticket-3422',
    metadata: {
      priority: 'medium',
      userName: 'Sara Colombo',
      entityId: 'ticket-3422',
    },
  },

  // === ALERT DI SISTEMA (SYSTEM) ===
  {
    id: 'notif-7',
    category: 'system',
    title: 'Aggiornamento sistema completato',
    message: 'La piattaforma è stata aggiornata alla versione 2.4.1 con nuove funzionalità e fix di sicurezza',
    timestamp: getRelativeTimestamp(60), // 1 ora fa
    read: false,
    href: '/dashboard/settings/updates',
  },
  {
    id: 'notif-8',
    category: 'system',
    title: 'Limite quota in arrivo',
    message: 'Hai utilizzato l\'85% della quota mensile per le email. Considera l\'upgrade del piano.',
    timestamp: getRelativeTimestamp(180), // 3 ore fa
    read: false,
    href: '/dashboard/billing/usage',
    metadata: {
      priority: 'medium',
    },
  },
  {
    id: 'notif-9',
    category: 'system',
    title: 'Backup automatico eseguito',
    message: 'Backup giornaliero dei dati completato con successo. Tutti i dati sono al sicuro.',
    timestamp: getRelativeTimestamp(1440), // 1 giorno fa
    read: true,
    href: '/dashboard/settings/backups',
  },
  {
    id: 'notif-10',
    category: 'system',
    title: 'Nuovo dispositivo connesso',
    message: 'Accesso effettuato da nuovo dispositivo: Chrome su Windows. Se non sei stato tu, cambia password.',
    timestamp: getRelativeTimestamp(2880), // 2 giorni fa
    read: true,
    href: '/dashboard/settings/security',
    metadata: {
      priority: 'high',
    },
  },

  // === REPORT SETTIMANALI (REPORTS) ===
  {
    id: 'notif-11',
    category: 'report',
    title: 'Report settimanale pronto',
    message: 'Il report analytics della settimana 1-7 Novembre è disponibile. Visualizzazioni +12%, conversioni +8%.',
    timestamp: getRelativeTimestamp(45), // 45 minuti fa
    read: false,
    href: '/dashboard/reports/weekly-2024-45',
    metadata: {
      reportType: 'weekly-analytics',
      entityId: 'report-2024-45',
    },
  },
  {
    id: 'notif-12',
    category: 'report',
    title: 'Report mensile disponibile',
    message: 'Report completo di Ottobre 2024 con metriche dettagliate e confronto YoY',
    timestamp: getRelativeTimestamp(720), // 12 ore fa
    read: false,
    href: '/dashboard/reports/monthly-2024-10',
    metadata: {
      reportType: 'monthly-summary',
      entityId: 'report-2024-10',
    },
  },
  {
    id: 'notif-13',
    category: 'report',
    title: 'Report campagna marketing',
    message: 'Campagna "Black Friday" terminata. Report finale con ROI +145% disponibile.',
    timestamp: getRelativeTimestamp(4320), // 3 giorni fa
    read: true,
    href: '/dashboard/campaigns/black-friday-2024',
    metadata: {
      reportType: 'campaign-performance',
      entityId: 'campaign-bf-2024',
    },
  },

  // === MENZIONI/COMMENTI (MENTIONS) ===
  {
    id: 'notif-14',
    category: 'mention',
    title: 'Sei stato menzionato',
    message: 'Marco Esposito ti ha menzionato in un commento sul progetto "Redesign Website"',
    timestamp: getRelativeTimestamp(75), // 1h 15min fa
    read: false,
    href: '/dashboard/projects/redesign-website/comments',
    metadata: {
      userName: 'Marco Esposito',
      entityId: 'comment-789',
    },
  },
  {
    id: 'notif-15',
    category: 'mention',
    title: 'Nuovo commento al tuo post',
    message: 'Laura Ricci ha commentato il tuo post "Strategie Social Media 2024"',
    timestamp: getRelativeTimestamp(200), // 3h 20min fa
    read: false,
    href: '/dashboard/social/post-45678',
    metadata: {
      userName: 'Laura Ricci',
      entityId: 'post-45678',
    },
  },
  {
    id: 'notif-16',
    category: 'mention',
    title: 'Tag in conversazione',
    message: 'Sei stato aggiunto alla conversazione "Piano Q1 2025" da Giulia Martini',
    timestamp: getRelativeTimestamp(360), // 6 ore fa
    read: true,
    href: '/dashboard/conversations/q1-2025',
    metadata: {
      userName: 'Giulia Martini',
      entityId: 'conv-q1-2025',
    },
  },

  // === ALTRE NOTIFICHE MIX ===
  {
    id: 'notif-17',
    category: 'review',
    title: 'Milestone raggiunto',
    message: 'Complimenti! Hai raggiunto 100 recensioni positive questo mese',
    timestamp: getRelativeTimestamp(600), // 10 ore fa
    read: true,
    href: '/dashboard/reviews/stats',
    metadata: {
      rating: 5,
    },
  },
  {
    id: 'notif-18',
    category: 'system',
    title: 'Manutenzione programmata',
    message: 'La piattaforma sarà in manutenzione domenica 10 Nov dalle 02:00 alle 04:00 per miglioramenti',
    timestamp: getRelativeTimestamp(1800), // 30 ore fa (1g 6h)
    read: true,
    href: '/dashboard/announcements/maintenance-nov-10',
  },
  {
    id: 'notif-19',
    category: 'ticket',
    title: 'Ticket risolto automaticamente',
    message: 'Il ticket #3145 è stato chiuso automaticamente dopo 7 giorni di inattività',
    timestamp: getRelativeTimestamp(5040), // 3g 12h fa
    read: true,
    href: '/dashboard/support/ticket-3145',
    metadata: {
      priority: 'low',
      entityId: 'ticket-3145',
    },
  },
  {
    id: 'notif-20',
    category: 'mention',
    title: 'Risposta al tuo commento',
    message: 'Davide Romano ha risposto al tuo commento sulla discussione "Budget Marketing"',
    timestamp: getRelativeTimestamp(7200), // 5 giorni fa
    read: true,
    href: '/dashboard/discussions/budget-marketing',
    metadata: {
      userName: 'Davide Romano',
      entityId: 'disc-budget-mkt',
    },
  },
];

/**
 * Helper per ottenere notifiche filtrate per categoria
 */
export function getNotificationsByCategory(
  category: string,
  notifications: Notification[] = mockNotifications
): Notification[] {
  if (category === 'all') {
    return notifications;
  }
  return notifications.filter((n) => n.category === category);
}

/**
 * Helper per ottenere conteggio notifiche non lette
 */
export function getUnreadCount(notifications: Notification[] = mockNotifications): number {
  return notifications.filter((n) => !n.read).length;
}

/**
 * Helper per ottenere conteggio per categoria
 */
export function getCountByCategory(
  category: string,
  notifications: Notification[] = mockNotifications
): number {
  const filtered = getNotificationsByCategory(category, notifications);
  return filtered.filter((n) => !n.read).length;
}
