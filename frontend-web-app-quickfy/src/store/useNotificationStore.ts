import { create } from 'zustand';
import type { Notification, NotificationFilter } from '@/types';
import { mockNotifications } from '@/lib/mock/notifications';

interface NotificationState {
  /** Array di tutte le notifiche */
  notifications: Notification[];

  /** Filtro attivo per categoria */
  activeFilter: NotificationFilter;

  /** Conteggio notifiche non lette (computed) */
  unreadCount: number;

  // Actions
  /** Segna una notifica come letta */
  markAsRead: (id: string) => void;

  /** Segna tutte le notifiche come lette */
  markAllAsRead: () => void;

  /** Elimina una notifica */
  deleteNotification: (id: string) => void;

  /** Aggiungi una nuova notifica */
  addNotification: (notification: Notification) => void;

  /** Imposta il filtro attivo */
  setFilter: (filter: NotificationFilter) => void;

  /** Ottieni notifiche filtrate */
  getFilteredNotifications: () => Notification[];
}

/**
 * Store Zustand per la gestione delle notifiche
 * Include mock data iniziali e tutte le azioni necessarie
 */
export const useNotificationStore = create<NotificationState>((set, get) => ({
  // Initial state
  notifications: mockNotifications,
  activeFilter: 'all',
  unreadCount: mockNotifications.filter((n) => !n.read).length,

  // Actions
  markAsRead: (id: string) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      };
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({
        ...notif,
        read: true,
      })),
      unreadCount: 0,
    }));
  },

  deleteNotification: (id: string) => {
    set((state) => {
      const updatedNotifications = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      };
    });
  },

  addNotification: (notification: Notification) => {
    set((state) => {
      const updatedNotifications = [notification, ...state.notifications];
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      };
    });
  },

  setFilter: (filter: NotificationFilter) => {
    set({ activeFilter: filter });
  },

  getFilteredNotifications: () => {
    const { notifications, activeFilter } = get();
    if (activeFilter === 'all') {
      return notifications;
    }
    return notifications.filter((n) => n.category === activeFilter);
  },
}));

/**
 * Hook helper per ottenere solo le notifiche filtrate
 */
export const useFilteredNotifications = () => {
  const getFilteredNotifications = useNotificationStore(
    (state) => state.getFilteredNotifications
  );
  return getFilteredNotifications();
};

/**
 * Hook helper per ottenere il conteggio non lette per categoria
 */
export const useCategoryUnreadCount = (category: NotificationFilter) => {
  const notifications = useNotificationStore((state) => state.notifications);

  if (category === 'all') {
    return notifications.filter((n) => !n.read).length;
  }

  return notifications.filter((n) => n.category === category && !n.read).length;
};
