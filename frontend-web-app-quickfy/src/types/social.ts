/**
 * Social Media Types
 * Types and interfaces for the Social & AI content management system
 */

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'twitter';

export type PostType =
  | 'promo'          // Promotional content
  | 'educational'    // Educational/informative
  | 'engagement'     // Community engagement
  | 'storytelling'   // Brand storytelling
  | 'product'        // Product showcase
  | 'event';         // Event announcement

export type PostStatus = 'draft' | 'scheduled' | 'published';

export type AITone = 'professional' | 'friendly' | 'playful' | 'formal';
export type AILength = 'short' | 'medium' | 'long';
export type AIImageStyle = 'realistic' | 'artistic' | 'cartoon' | 'minimalist' | '3d';
export type AIImageDimensions = '1:1' | '16:9' | '9:16' | '4:5';
export type AIImageQuality = 'standard' | 'hd' | 'ultra';

export interface AITextOptions {
  tone: AITone;
  length: AILength;
  includeEmojis: boolean;
}

export interface AIImageOptions {
  prompt: string;
  style: AIImageStyle;
  dimensions: AIImageDimensions;
  quality: AIImageQuality;
}

export interface UploadedMedia {
  file: File;
  preview: string;
  type: 'image' | 'video';
  size: number;
}

export interface PostMetrics {
  estimatedReach: number;
  estimatedEngagement: number; // percentage
  bestTimeToPost: string;
  targetAudience: string[];
}

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  type: PostType;
  status: PostStatus;
  content: {
    text: string;
    hashtags: string[];
    callToAction?: string;
    emojis: string[];
  };
  media?: {
    type: 'image' | 'video' | 'carousel';
    url?: string;
    alt?: string;
    placeholder?: string;
  };
  metrics: PostMetrics;
  scheduling?: {
    scheduledFor?: Date;
    timezone?: string;
  };
  brandAlignment: {
    usesToneOfVoice: boolean;
    reflectsValues: boolean;
    matchesBrandColors: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentGeneratorFormData {
  platform: SocialPlatform;
  type: PostType;
  topic?: string;
  keywords?: string[];
  targetAudience?: string;
  includeBrandValues?: boolean;
}

export const PLATFORM_COLORS: Record<SocialPlatform, string> = {
  instagram: 'from-pink-500 via-purple-500 to-indigo-500',
  facebook: 'from-blue-600 to-blue-700',
  linkedin: 'from-blue-700 to-blue-800',
  twitter: 'from-sky-400 to-sky-500',
};

export const PLATFORM_ICONS: Record<SocialPlatform, string> = {
  instagram: '📸',
  facebook: '👥',
  linkedin: '💼',
  twitter: '🐦',
};

export const POST_TYPE_ICONS: Record<PostType, string> = {
  promo: '🎯',
  educational: '📚',
  engagement: '💬',
  storytelling: '📖',
  product: '🛍️',
  event: '🎉',
};
