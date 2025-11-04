"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { PostType } from "@/types/social";
import { POST_TYPE_ICONS } from "@/types/social";
import { cn } from "@/lib/utils";

interface PostTypeSelectorProps {
  selected?: PostType;
  onSelect: (type: PostType) => void;
  className?: string;
}

const postTypes: PostType[] = ['promo', 'educational', 'engagement', 'storytelling', 'product', 'event'];

export function PostTypeSelector({ selected, onSelect, className }: PostTypeSelectorProps) {
  const t = useTranslations("social");

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-medium">{t("generator.selectType")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {postTypes.map((type) => (
          <Card
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "relative cursor-pointer transition-all hover:scale-102 hover:shadow-md overflow-hidden",
              selected === type && "ring-2 ring-primary shadow-md bg-primary/5"
            )}
          >
            {/* Selected indicator - triangolo angolo alto destra */}
            {selected === type && (
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-t-primary border-l-[32px] border-l-transparent z-10" />
            )}

            <div className="relative p-3 flex items-center gap-3">
              <div className="text-2xl shrink-0">{POST_TYPE_ICONS[type]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {t(`postTypes.${type}`)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
