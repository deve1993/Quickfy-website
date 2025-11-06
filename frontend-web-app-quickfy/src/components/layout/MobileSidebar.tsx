"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLinkClick = (href: string) => {
    router.push(href);
    onOpenChange(false); // Close drawer after navigation
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[280px] sm:w-[320px] p-0"
        aria-label="Menu di navigazione mobile"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="flex items-center gap-2 text-left">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold"
                aria-hidden="true"
              >
                Q
              </div>
              <span className="text-xl font-bold">Quickfy</span>
            </SheetTitle>
          </SheetHeader>

          {/* Navigation */}
          <nav
            className="flex-1 space-y-1 p-4 overflow-y-auto"
            aria-label="Menu di navigazione principale"
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 min-h-[44px] text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-label={`Vai a ${item.name}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                      aria-label={`Piano ${item.badge}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
