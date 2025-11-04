'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  Star,
  AlertCircle,
  Bell,
  FileText,
  AtSign,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNotificationStore } from '@/store/useNotificationStore';
import type { Notification, NotificationCategory } from '@/types';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

/**
 * Configurazione icone e colori per ogni categoria
 */
const categoryConfig: Record<
  NotificationCategory,
  {
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    iconColor: string;
  }
> = {
  review: {
    icon: Star,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  ticket: {
    icon: AlertCircle,
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  system: {
    icon: Bell,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  report: {
    icon: FileText,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  mention: {
    icon: AtSign,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
};

/**
 * Componente per visualizzare una singola notifica
 */
export function NotificationItem({
  notification,
  onClose,
}: NotificationItemProps) {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const config = categoryConfig[notification.category];
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onClose?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(notification.id);
  };

  // Formatta timestamp relativo in italiano
  const relativeTime = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
    locale: it,
  });

  const content = (
    <div
      className={cn(
        'group relative flex gap-3 rounded-lg p-3 transition-colors',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
      )}
    >
      {/* Icona categoria */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          config.bgColor
        )}
      >
        <Icon className={cn('h-5 w-5', config.iconColor)} />
      </div>

      {/* Contenuto notifica */}
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'text-sm font-medium leading-tight',
              !notification.read && 'font-semibold'
            )}
          >
            {notification.title}
          </p>

          {/* Badge non letto */}
          {!notification.read && (
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>

        <p className="text-xs text-muted-foreground">{relativeTime}</p>
      </div>

      {/* Pulsante elimina */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className={cn(
          'absolute right-2 top-2 h-6 w-6 p-0 opacity-0 transition-opacity',
          'group-hover:opacity-100 hover:bg-red-100 hover:text-red-600',
          'dark:hover:bg-red-900/30 dark:hover:text-red-400'
        )}
        title="Elimina notifica"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  // Se ha href, wrappa in Link, altrimenti solo div
  if (notification.href) {
    return (
      <Link href={notification.href} onClick={handleClick} className="block">
        {content}
      </Link>
    );
  }

  return <div onClick={handleClick}>{content}</div>;
}
