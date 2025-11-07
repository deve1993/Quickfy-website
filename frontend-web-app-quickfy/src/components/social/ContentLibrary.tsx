"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { SocialPlatform, PostType, PostStatus, SocialPost } from "@/types/social";
import { PostCard } from "./PostCard";
import { Grid3x3, List, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContentLibraryProps {
  posts: SocialPost[];
  className?: string;
}

type ViewMode = 'grid' | 'list';

export function ContentLibrary({ posts, className }: ContentLibraryProps) {
  const t = useTranslations("social");
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PostType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery === "" ||
      post.content.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
    const matchesType = typeFilter === "all" || post.type === typeFilter;
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesType && matchesStatus;
  });

  const handleEdit = (post: SocialPost) => {
    console.log('Edit post:', post.id);
    toast.info("Edit functionality - Coming soon!");
  };

  const handleDuplicate = (post: SocialPost) => {
    console.log('Duplicate post:', post.id);
    toast.success(t("notifications.postDuplicated"));
  };

  const handleDelete = (post: SocialPost) => {
    console.log('Delete post:', post.id);
    toast.success(t("notifications.postDeleted"));
  };

  const handleSchedule = (post: SocialPost) => {
    console.log('Schedule post:', post.id);
    toast.success(t("notifications.postScheduled"));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("library.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Platform filter */}
        <Select
          value={platformFilter}
          onValueChange={(value) => setPlatformFilter(value as SocialPlatform | "all")}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t("library.filterByPlatform")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("library.filterAll")}</SelectItem>
            <SelectItem value="instagram">{t("platforms.instagram")}</SelectItem>
            <SelectItem value="facebook">{t("platforms.facebook")}</SelectItem>
            <SelectItem value="linkedin">{t("platforms.linkedin")}</SelectItem>
            <SelectItem value="twitter">{t("platforms.twitter")}</SelectItem>
          </SelectContent>
        </Select>

        {/* Type filter */}
        <Select
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value as PostType | "all")}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t("library.filterByType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("library.filterAll")}</SelectItem>
            <SelectItem value="promo">{t("postTypes.promo")}</SelectItem>
            <SelectItem value="educational">{t("postTypes.educational")}</SelectItem>
            <SelectItem value="engagement">{t("postTypes.engagement")}</SelectItem>
            <SelectItem value="storytelling">{t("postTypes.storytelling")}</SelectItem>
            <SelectItem value="product">{t("postTypes.product")}</SelectItem>
            <SelectItem value="event">{t("postTypes.event")}</SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as PostStatus | "all")}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t("library.filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("library.filterAll")}</SelectItem>
            <SelectItem value="draft">{t("postStatus.draft")}</SelectItem>
            <SelectItem value="scheduled">{t("postStatus.scheduled")}</SelectItem>
            <SelectItem value="published">{t("postStatus.published")}</SelectItem>
          </SelectContent>
        </Select>

        {/* View mode toggle */}
        <div className="flex gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredPosts.length === posts.length
          ? `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
          : `${filteredPosts.length} di ${posts.length} posts`}
      </div>

      {/* Posts grid/list */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📭</div>
          <h3 className="text-lg font-semibold mb-2">{t("library.noPosts")}</h3>
          <p className="text-sm text-muted-foreground">{t("library.createFirst")}</p>
        </div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          )}
        >
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onSchedule={handleSchedule}
            />
          ))}
        </div>
      )}
    </div>
  );
}
