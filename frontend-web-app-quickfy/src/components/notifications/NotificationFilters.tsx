'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCategoryUnreadCount } from '@/store/useNotificationStore';
import type { NotificationFilter } from '@/types';

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
}

const filterOptions: Array<{ value: NotificationFilter; labelKey: string }> = [
  { value: 'all', labelKey: 'all' },
  { value: 'review', labelKey: 'reviews' },
  { value: 'ticket', labelKey: 'tickets' },
  { value: 'system', labelKey: 'system' },
  { value: 'report', labelKey: 'reports' },
  { value: 'mention', labelKey: 'mentions' },
];

/**
 * Componente per i filtri delle notifiche per categoria
 */
export function NotificationFilters({
  activeFilter,
  onFilterChange,
}: NotificationFiltersProps) {
  const t = useTranslations('notifications');

  // Precomputa tutti i count usando gli hooks (sempre chiamati in ordine)
  const allCount = useCategoryUnreadCount('all');
  const reviewCount = useCategoryUnreadCount('review');
  const ticketCount = useCategoryUnreadCount('ticket');
  const systemCount = useCategoryUnreadCount('system');
  const reportCount = useCategoryUnreadCount('report');
  const mentionCount = useCategoryUnreadCount('mention');

  const countMap: Record<NotificationFilter, number> = {
    all: allCount,
    review: reviewCount,
    ticket: ticketCount,
    system: systemCount,
    report: reportCount,
    mention: mentionCount,
  };

  return (
    <div className="border-b px-4 py-2">
      <div className="flex flex-wrap gap-1">
        {filterOptions.map((option) => {
          const count = countMap[option.value];
          const isActive = activeFilter === option.value;

          return (
            <Button
              key={option.value}
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className="h-7 text-xs"
            >
              {t(`filters.${option.labelKey}`)}
              {count > 0 && option.value !== 'all' && (
                <Badge
                  variant={isActive ? 'secondary' : 'default'}
                  className="ml-1 h-4 min-w-[16px] px-1 text-[10px]"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
