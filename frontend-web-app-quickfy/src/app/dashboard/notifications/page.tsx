'use client';

import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotificationStore } from '@/store/useNotificationStore';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';
import { useTranslations } from 'next-intl';

/**
 * Pagina completa per visualizzare e gestire tutte le notifiche
 */
export default function NotificationsPage() {
  const t = useTranslations('notifications');

  const {
    unreadCount,
    activeFilter,
    setFilter,
    markAllAsRead,
    getFilteredNotifications,
  } = useNotificationStore();

  const filteredNotifications = getFilteredNotifications();
  const unreadNotifications = filteredNotifications.filter((n) => !n.read);
  const readNotifications = filteredNotifications.filter((n) => n.read);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">{t('pageDescription')}</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? t('unreadCount', { count: unreadCount })
              : t('allRead')}
          </span>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            {t('markAllRead')}
          </Button>
        )}
      </div>

      {/* Filtri */}
      <Card className="mb-6 p-4">
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setFilter}
        />
      </Card>

      {/* Lista Notifiche */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-8">
          {/* Notifiche Non Lette */}
          {unreadNotifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                {t('unread')}
                <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {unreadNotifications.length}
                </span>
              </h2>
              <Card className="p-2">
                <div className="space-y-1">
                  {unreadNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Notifiche Lette */}
          {readNotifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-muted-foreground">
                {t('read')}
              </h2>
              <Card className="p-2">
                <div className="space-y-1">
                  {readNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Trash2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('empty')}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t('emptyDescription')}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
