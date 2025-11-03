"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Ticket,
  Target,
  Star,
  Share2,
  Megaphone,
  Settings,
  Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/useTranslations";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const t = useTranslations("navigation");

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("ticketing"), href: "/dashboard/tickets", icon: Ticket },
    { name: t("goals"), href: "/dashboard/goals", icon: Target },
    { name: t("reviews"), href: "/dashboard/reviews", icon: Star, badge: "Plus" },
    {
      name: t("social"),
      href: "/dashboard/social",
      icon: Share2,
      badge: "Pro",
    },
    { name: t("campaigns"), href: "/dashboard/campaigns", icon: Megaphone },
    { name: t("brand"), href: "/dashboard/brand", icon: Palette },
    { name: t("settings"), href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      className={cn(
        "hidden lg:flex h-full flex-col border-r bg-card transition-all duration-300",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}
      role="complementary"
      aria-label="Navigazione principale"
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            aria-label="Vai alla dashboard - Home Quickfy"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              Q
            </div>
            <span className="text-xl font-bold">Quickfy</span>
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold mx-auto"
            aria-label="Vai alla dashboard - Home Quickfy"
          >
            Q
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 space-y-1 p-2 overflow-y-auto"
        aria-label="Menu di navigazione"
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 min-h-[44px] text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                      aria-label={`Piano ${item.badge}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full"
          aria-label={collapsed ? "Espandi menu laterale" : "Comprimi menu laterale"}
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>{t("collapse")}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
