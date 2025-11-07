"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { SocialPost } from "@/types/social";
import { PLATFORM_COLORS, PLATFORM_ICONS } from "@/types/social";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

interface PostPreviewProps {
  post: SocialPost | null;
  className?: string;
}

export function PostPreview({ post, className }: PostPreviewProps) {
  const t = useTranslations("social");

  if (!post) {
    return (
      <Card className={cn("h-full", className)}>
        <CardContent className="flex items-center justify-center h-[500px] text-center text-muted-foreground">
          <div>
            <div className="text-4xl mb-3">✨</div>
            <p>{t("generator.noPreview")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render different preview based on platform
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{t("generator.preview")}</span>
          <Badge
            variant="secondary"
            className={cn(
              "bg-gradient-to-r text-white border-0",
              PLATFORM_COLORS[post.platform]
            )}
          >
            {PLATFORM_ICONS[post.platform]} {t(`platforms.${post.platform}`)}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Platform-specific preview mock */}
        {post.platform === 'instagram' && <InstagramPreview post={post} />}
        {post.platform === 'facebook' && <FacebookPreview post={post} />}
        {post.platform === 'linkedin' && <LinkedInPreview post={post} />}
        {post.platform === 'twitter' && <TwitterPreview post={post} />}
      </CardContent>
    </Card>
  );
}

// Instagram-style preview
function InstagramPreview({ post }: { post: SocialPost }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500" />
        <div className="flex-1">
          <div className="font-semibold text-sm">quickfy_official</div>
          <div className="text-xs text-muted-foreground">Marketing Platform</div>
        </div>
      </div>

      {/* Media (Image or Video) */}
      {post.media && (
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {post.media.url ? (
            post.media.type === 'video' ? (
              <video src={post.media.url} className="w-full h-full object-cover" controls />
            ) : (
              <img src={post.media.url} alt={post.media.alt || 'Post media'} className="w-full h-full object-cover" />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl opacity-30">📸</div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 p-3">
        <Heart className="h-6 w-6" />
        <MessageCircle className="h-6 w-6" />
        <Share2 className="h-6 w-6" />
        <Bookmark className="h-6 w-6 ml-auto" />
      </div>

      {/* Content */}
      <div className="px-3 pb-3 space-y-2">
        <div className="text-sm font-semibold">{post.metrics.estimatedReach.toLocaleString()} likes</div>
        <div className="text-sm">
          <span className="font-semibold mr-2">quickfy_official</span>
          {post.content.text.split('\n')[0]}
        </div>
        {post.content.hashtags.length > 0 && (
          <div className="text-sm text-primary">
            {post.content.hashtags.join(' ')}
          </div>
        )}
      </div>
    </div>
  );
}

// Facebook-style preview
function FacebookPreview({ post }: { post: SocialPost }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
          Q
        </div>
        <div className="flex-1">
          <div className="font-semibold">Quickfy</div>
          <div className="text-xs text-muted-foreground">2h • 🌍</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm whitespace-pre-line">{post.content.text}</p>
        {post.content.hashtags.length > 0 && (
          <div className="text-sm text-primary mt-2">
            {post.content.hashtags.join(' ')}
          </div>
        )}
      </div>

      {/* Media (Image or Video) */}
      {post.media && (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {post.media.url ? (
            post.media.type === 'video' ? (
              <video src={post.media.url} className="w-full h-full object-cover" controls />
            ) : (
              <img src={post.media.url} alt={post.media.alt || 'Post media'} className="w-full h-full object-cover" />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-5xl opacity-30">🖼️</div>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 border-t flex items-center justify-between text-sm text-muted-foreground">
        <span>👍 ❤️ {post.metrics.estimatedReach}</span>
        <span>42 comments • 15 shares</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t grid grid-cols-3 gap-2">
        <button className="flex items-center justify-center gap-2 py-1 hover:bg-accent rounded">
          <Heart className="h-4 w-4" /> Like
        </button>
        <button className="flex items-center justify-center gap-2 py-1 hover:bg-accent rounded">
          <MessageCircle className="h-4 w-4" /> Comment
        </button>
        <button className="flex items-center justify-center gap-2 py-1 hover:bg-accent rounded">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </div>
  );
}

// LinkedIn-style preview
function LinkedInPreview({ post }: { post: SocialPost }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="h-12 w-12 rounded bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center text-white font-bold text-lg">
          Q
        </div>
        <div className="flex-1">
          <div className="font-semibold">Quickfy</div>
          <div className="text-xs text-muted-foreground">Marketing Automation Platform</div>
          <div className="text-xs text-muted-foreground">2h • Edited • 🌍</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm whitespace-pre-line leading-relaxed">{post.content.text}</p>
        {post.content.hashtags.length > 0 && (
          <div className="text-sm text-primary mt-2">
            {post.content.hashtags.join(' ')}
          </div>
        )}
      </div>

      {/* Media (Image or Video) */}
      {post.media && (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {post.media.url ? (
            post.media.type === 'video' ? (
              <video src={post.media.url} className="w-full h-full object-cover" controls />
            ) : (
              <img src={post.media.url} alt={post.media.alt || 'Post media'} className="w-full h-full object-cover" />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-5xl opacity-30">💼</div>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-3 border-t">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[8px]">
              👍
            </div>
            {post.metrics.estimatedReach}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {Math.floor(post.metrics.estimatedReach * 0.1)} comments • {Math.floor(post.metrics.estimatedReach * 0.05)} reposts
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t grid grid-cols-4 gap-2">
        <button className="flex flex-col items-center justify-center gap-1 py-2 hover:bg-accent rounded text-xs">
          <Heart className="h-4 w-4" /> Like
        </button>
        <button className="flex flex-col items-center justify-center gap-1 py-2 hover:bg-accent rounded text-xs">
          <MessageCircle className="h-4 w-4" /> Comment
        </button>
        <button className="flex flex-col items-center justify-center gap-1 py-2 hover:bg-accent rounded text-xs">
          <Share2 className="h-4 w-4" /> Repost
        </button>
        <button className="flex flex-col items-center justify-center gap-1 py-2 hover:bg-accent rounded text-xs">
          <Share2 className="h-4 w-4" /> Send
        </button>
      </div>
    </div>
  );
}

// Twitter/X-style preview
function TwitterPreview({ post }: { post: SocialPost }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background p-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold shrink-0">
          Q
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">Quickfy</span>
            <span className="text-muted-foreground">@quickfy</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">2h</span>
          </div>

          {/* Content */}
          <div className="mt-2 text-sm whitespace-pre-line">
            {post.content.text}
          </div>

          {post.content.hashtags.length > 0 && (
            <div className="text-sm text-primary mt-2">
              {post.content.hashtags.join(' ')}
            </div>
          )}

          {/* Media (Image or Video) */}
          {post.media && (
            <div className="mt-3 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
              {post.media.url ? (
                post.media.type === 'video' ? (
                  <video src={post.media.url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={post.media.url} alt={post.media.alt || 'Post media'} className="w-full h-full object-cover" />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-5xl opacity-30">🐦</div>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mt-3 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> {Math.floor(post.metrics.estimatedReach * 0.08)}
            </span>
            <span className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> {Math.floor(post.metrics.estimatedReach * 0.12)}
            </span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> {post.metrics.estimatedReach}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> {post.metrics.estimatedReach * 10}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
