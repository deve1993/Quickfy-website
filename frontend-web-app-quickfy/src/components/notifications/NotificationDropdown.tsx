'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useNotificationStore } from '@/store/useNotificationStore';
import { NotificationItem } from './NotificationItem';
import { NotificationFilters } from './NotificationFilters';
import { useTranslations } from '@/lib/i18n/useTranslations';

/**
 * Componente dropdown per le notifiche
 * Include badge contatore, filtri, lista scrollabile e azioni
 */
export function NotificationDropdown() {
  const t = useTranslations('notifications');
  const [open, setOpen] = useState(false);

  const {
    unreadCount,
    activeFilter,
    setFilter,
    markAllAsRead,
    getFilteredNotifications,
  } = useNotificationStore();

  const filteredNotifications = getFilteredNotifications();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          title={t('title')}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full px-1 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0"
        sideOffset={8}
      >
        {/* Header con titolo e azioni */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <DropdownMenuLabel className="p-0 text-base font-semibold">
            {t('title')}
          </DropdownMenuLabel>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="mr-1 h-3 w-3" />
              {t('markAllRead')}
            </Button>
          )}
        </div>

        {/* Filtri per categoria */}
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setFilter}
        />

        {/* Lista notifiche scrollabile */}
        <ScrollArea className="max-h-[400px]">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-0.5 p-2">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClose={handleClose}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="mb-2 h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">
                {t('empty')}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('emptyDescription')}
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer con link "Vedi tutte" */}
        {filteredNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Link href="/dashboard/notifications" onClick={handleClose}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm font-medium"
                >
                  {t('viewAll')}
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
