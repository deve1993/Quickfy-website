// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export type UserRole = 'admin' | 'editor' | 'viewer';
export type PlanType = 'starter' | 'plus' | 'pro';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  workspaces: Workspace[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// ============================================
// WORKSPACE & SUBSCRIPTION TYPES
// ============================================

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  members: WorkspaceMember[];
  createdAt: string;
  settings: WorkspaceSettings;
}

export interface WorkspaceMember {
  id: string;
  user: User;
  role: UserRole;
  invitedAt: string;
  acceptedAt?: string;
}

export interface WorkspaceSettings {
  timezone: string;
  currency: string;
  locale: string;
  analyticsConnected: boolean;
  googleAdsConnected: boolean;
}

// ============================================
// WORKSPACE MANAGEMENT TYPES
// ============================================

export interface CreateWorkspaceData {
  name: string;
  description?: string;
  slug: string;
}

export interface UpdateWorkspaceData {
  name?: string;
  description?: string;
  settings?: Partial<WorkspaceSettings>;
}

export interface InviteMemberData {
  email: string;
  role: UserRole;
}

export interface UpdateMemberRoleData {
  role: UserRole;
}

export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: UserRole;
  invitedBy: User;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
}

export interface BillingInfo {
  companyName: string;
  vatNumber?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Subscription {
  id: string;
  workspaceId: string;
  plan: PlanType;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAt?: string;
  billingInfo: BillingInfo;
  paymentMethod?: PaymentMethod;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

// ============================================
// DASHBOARD & ANALYTICS TYPES
// ============================================

export interface DashboardMetrics {
  sessions: MetricValue;
  users: MetricValue;
  conversions: MetricValue;
  bounceRate: MetricValue;
  avgSessionDuration: MetricValue;
  pageViews: MetricValue;
}

export interface MetricValue {
  current: number;
  previous: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
  bounceRate: number;
  conversions: number;
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
  avgTime: number;
  bounceRate: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'looker' | 'custom';
  url?: string;
  createdAt: string;
  lastUpdated: string;
}

// ============================================
// TICKETING TYPES
// ============================================

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'closed';
export type TicketCategory = 'support' | 'bug' | 'feature' | 'question' | 'other';

export interface Ticket {
  id: string;
  number: number;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assignedTo?: User;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  comments: TicketComment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  author: User;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface CreateTicketData {
  subject: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
}

// ============================================
// GOALS & KPI TYPES
// ============================================

export type GoalPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type GoalStatus = 'on_track' | 'at_risk' | 'behind' | 'achieved';

export interface Goal {
  id: string;
  name: string;
  description: string;
  metric: string;
  targetValue: number;
  currentValue: number;
  period: GoalPeriod;
  startDate: string;
  endDate: string;
  status: GoalStatus;
  progress: number; // percentage
  owner?: User;
  createdAt: string;
}

export interface CreateGoalData {
  name: string;
  description: string;
  metric: string;
  targetValue: number;
  period: GoalPeriod;
  startDate: string;
  endDate: string;
}

// ============================================
// REVIEWS TYPES (Plus/Pro)
// ============================================

export type ReviewSource = 'google' | 'facebook' | 'trustpilot' | 'tripadvisor' | 'other';
export type ReviewRating = 1 | 2 | 3 | 4 | 5;
export type ReviewSentiment = 'positive' | 'neutral' | 'negative';

export interface Review {
  id: string;
  source: ReviewSource;
  rating: ReviewRating;
  author: string;
  authorAvatar?: string;
  content: string;
  sentiment: ReviewSentiment;
  categories: string[]; // AI-generated categories
  hasResponse: boolean;
  response?: ReviewResponse;
  createdAt: string;
  respondedAt?: string;
}

export interface ReviewResponse {
  id: string;
  reviewId: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface ReviewStats {
  total: number;
  avgRating: number;
  distribution: Record<ReviewRating, number>;
  sentimentDistribution: Record<ReviewSentiment, number>;
  responseRate: number;
}

export interface AIReviewSuggestion {
  reviewId: string;
  suggestedResponse: string;
  tone: 'professional' | 'friendly' | 'apologetic';
  confidence: number;
}

// ============================================
// SOCIAL & AI TYPES (Pro only)
// ============================================

export type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'linkedin';
export type ContentType = 'post' | 'story' | 'reel';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  connected: boolean;
  followers: number;
  lastSyncAt?: string;
}

export interface SocialMetrics {
  platform: SocialPlatform;
  followers: number;
  followersChange: number;
  reach: number;
  reachChange: number;
  engagement: number;
  engagementChange: number;
  posts: number;
}

export interface ContentPost {
  id: string;
  platform: SocialPlatform;
  type: ContentType;
  content: string;
  mediaUrls: string[];
  status: PostStatus;
  scheduledFor?: string;
  publishedAt?: string;
  metrics?: PostMetrics;
  createdBy: User;
  createdAt: string;
}

export interface PostMetrics {
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
}

export interface AIContentSuggestion {
  topic: string;
  content: string;
  hashtags: string[];
  platform: SocialPlatform;
  estimatedEngagement: number;
}

export interface ChatbotConfig {
  enabled: boolean;
  platforms: SocialPlatform[];
  autoReply: boolean;
  businessHours: BusinessHours;
  welcomeMessage: string;
  fallbackMessage: string;
}

export interface BusinessHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
}

export interface TimeRange {
  enabled: boolean;
  start: string; // HH:mm
  end: string; // HH:mm
}

export interface ChatbotStats {
  totalConversations: number;
  resolvedWithoutHuman: number;
  avgResponseTime: number; // seconds
  satisfactionRate: number; // percentage
}

// ============================================
// CAMPAIGNS TYPES
// ============================================

export type CampaignStatus = 'active' | 'paused' | 'ended';
export type AdPlatform = 'google_ads' | 'facebook_ads' | 'instagram_ads';

export interface Campaign {
  id: string;
  name: string;
  platform: AdPlatform;
  status: CampaignStatus;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // click-through rate
  cpc: number; // cost per click
  roas: number; // return on ad spend
  startDate: string;
  endDate?: string;
}

export interface CampaignMetrics {
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  avgCTR: number;
  avgCPC: number;
  avgROAS: number;
}

// ============================================
// FEATURE GATE TYPES
// ============================================

export type FeatureFlag =
  | 'reviews'
  | 'social_ai'
  | 'chatbot'
  | 'advanced_analytics'
  | 'white_label'
  | 'api_access';

export type FeatureAccess = Record<FeatureFlag, boolean>;

export const PLAN_FEATURES: Record<PlanType, FeatureFlag[]> = {
  starter: [],
  plus: ['reviews'],
  pro: ['reviews', 'social_ai', 'chatbot', 'advanced_analytics'],
};

// ============================================
// API RESPONSE TYPES
// ============================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: APIMetadata;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface APIMetadata {
  page?: number;
  pageSize?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// ============================================
// ODOO-SPECIFIC TYPES
// ============================================

export type OdooMany2One = [number, string] | false;
export type OdooOne2Many = number[];

export interface OdooRPCRequest {
  jsonrpc: '2.0';
  method: 'call';
  params: {
    service: string;
    method: string;
    args: unknown[];
  };
  id: number;
}

export interface OdooRPCResponse<T> {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data: {
      name: string;
      debug: string;
      message: string;
      arguments: unknown[];
      exception_type: string;
    };
  };
}

export interface OdooSearchDomain {
  field: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'like' | 'ilike' | 'in' | 'not in';
  value: unknown;
}

// ============================================
// ONBOARDING TYPES
// ============================================

export interface OnboardingData {
  plan: PlanType;
  user: SignupData;
  workspace: {
    name: string;
  };
  billing: BillingInfo;
}

export type OnboardingStep =
  | 'welcome'
  | 'selectPlan'
  | 'signup'
  | 'createWorkspace'
  | 'billing'
  | 'complete';

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  duration?: number;
}

// Re-export notification system types
export type {
  Notification,
  NotificationCategory,
  NotificationFilter,
  NotificationMetadata,
  NotificationCategoryConfig,
  NotificationCategoryConfigMap,
} from './notifications';
