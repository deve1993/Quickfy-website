"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { SocialPlatform } from "@/types/social";
import { PLATFORM_COLORS } from "@/types/social";
import { cn } from "@/lib/utils";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

interface PlatformSelectorProps {
  selected?: SocialPlatform;
  onSelect: (platform: SocialPlatform) => void;
  className?: string;
}

const platforms: SocialPlatform[] = ['instagram', 'facebook', 'linkedin', 'twitter'];

const PLATFORM_ICON_COMPONENTS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function PlatformSelector({ selected, onSelect, className }: PlatformSelectorProps) {
  const t = useTranslations("social");

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-medium">{t("generator.selectPlatform")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((platform) => (
          <Card
            key={platform}
            onClick={() => onSelect(platform)}
            className={cn(
              "relative cursor-pointer transition-all hover:scale-105 hover:shadow-lg overflow-hidden",
              selected === platform && "ring-2 ring-primary shadow-lg scale-105"
            )}
          >
            {/* Gradient background */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-10",
              PLATFORM_COLORS[platform]
            )} />

            {/* Selected indicator - triangolo angolo alto destra */}
            {selected === platform && (
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary border-l-[40px] border-l-transparent" />
            )}

            <div className="relative p-4 flex flex-col items-center justify-center gap-2">
              {(() => {
                const IconComponent = PLATFORM_ICON_COMPONENTS[platform];
                return <IconComponent className="h-10 w-10" />;
              })()}
              <div className="text-sm font-medium text-center">
                {t(`platforms.${platform}`)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
