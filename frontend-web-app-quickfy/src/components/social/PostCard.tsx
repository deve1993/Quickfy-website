"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { SocialPost } from "@/types/social";
import { PLATFORM_COLORS, PLATFORM_ICONS, POST_TYPE_ICONS } from "@/types/social";
import { cn } from "@/lib/utils";
import { MoreVertical, Eye, TrendingUp, Clock, Check, X } from "lucide-react";

interface PostCardProps {
  post: SocialPost;
  onEdit?: (post: SocialPost) => void;
  onDuplicate?: (post: SocialPost) => void;
  onDelete?: (post: SocialPost) => void;
  onSchedule?: (post: SocialPost) => void;
  className?: string;
}

export function PostCard({
  post,
  onEdit,
  onDuplicate,
  onDelete,
  onSchedule,
  className,
}: PostCardProps) {
  const t = useTranslations("social");

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Card className={cn("group hover:shadow-lg transition-all", className)}>
      <CardHeader className="pb-3">
        {/* Platform & Type badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className={cn(
                "bg-gradient-to-r text-white border-0",
                PLATFORM_COLORS[post.platform]
              )}
            >
              <span className="mr-1">{PLATFORM_ICONS[post.platform]}</span>
              {t(`platforms.${post.platform}`)}
            </Badge>

            <Badge variant="outline">
              <span className="mr-1">{POST_TYPE_ICONS[post.type]}</span>
              {t(`postTypes.${post.type}`)}
            </Badge>

            <Badge
              variant={
                post.status === 'published'
                  ? 'default'
                  : post.status === 'scheduled'
                  ? 'secondary'
                  : 'outline'
              }
            >
              {t(`postStatus.${post.status}`)}
            </Badge>
          </div>

          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(post)}>
                  {t("postCard.edit")}
                </DropdownMenuItem>
              )}
              {onDuplicate && (
                <DropdownMenuItem onClick={() => onDuplicate(post)}>
                  {t("postCard.duplicate")}
                </DropdownMenuItem>
              )}
              {onSchedule && post.status === 'draft' && (
                <DropdownMenuItem onClick={() => onSchedule(post)}>
                  {t("postCard.schedule")}
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(post)}
                  className="text-destructive"
                >
                  {t("postCard.delete")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post content preview */}
        <div className="space-y-2">
          <p className="text-sm line-clamp-3">{post.content.text}</p>

          {/* Hashtags */}
          {post.content.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.content.hashtags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-xs text-primary">
                  {tag}
                </span>
              ))}
              {post.content.hashtags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{post.content.hashtags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">
                {t("postCard.estimatedReach")}
              </div>
              <div className="text-sm font-semibold">
                {formatNumber(post.metrics.estimatedReach)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">
                {t("postCard.estimatedEngagement")}
              </div>
              <div className="text-sm font-semibold">
                {post.metrics.estimatedEngagement}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">
                {t("postCard.bestTime")}
              </div>
              <div className="text-sm font-semibold">
                {post.metrics.bestTimeToPost}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {/* Brand alignment indicators */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            {post.brandAlignment.usesToneOfVoice ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-muted-foreground">{t("postCard.toneOfVoice")}</span>
          </div>
          <div className="flex items-center gap-1">
            {post.brandAlignment.reflectsValues ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-muted-foreground">{t("postCard.brandValues")}</span>
          </div>
          <div className="flex items-center gap-1">
            {post.brandAlignment.matchesBrandColors ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-muted-foreground">{t("postCard.brandColors")}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
