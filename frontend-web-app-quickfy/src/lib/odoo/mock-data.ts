import type {
  User,
  Workspace,
  DashboardMetrics,
  Ticket,
  Goal,
  Review,
  Campaign,
  SocialMetrics,
  TrafficSource,
  TopPage,
  Report,
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@quickfy.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'editor@quickfy.com',
    name: 'Editor User',
    role: 'editor',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

// Mock Workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'My Company',
    slug: 'my-company',
    plan: 'pro',
    subscriptionStatus: 'active',
    members: [
      {
        id: '1',
        user: mockUsers[0],
        role: 'admin',
        invitedAt: '2024-01-01T00:00:00Z',
        acceptedAt: '2024-01-01T00:00:00Z',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    settings: {
      timezone: 'Europe/Rome',
      currency: 'EUR',
      locale: 'it_IT',
      analytics: {
        connected: true,
        trackingId: 'G-ABCD123456',
        propertyId: '123456789',
      },
      googleAds: {
        connected: true,
        customerId: '123-456-7890',
        conversionId: 'AW-987654321',
        conversionLabel: 'abcDEF123ghiJKL',
      },
    },
  },
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  sessions: {
    current: 12543,
    previous: 10234,
    change: 22.6,
    trend: 'up',
  },
  users: {
    current: 8932,
    previous: 7456,
    change: 19.8,
    trend: 'up',
  },
  conversions: {
    current: 456,
    previous: 412,
    change: 10.7,
    trend: 'up',
  },
  bounceRate: {
    current: 42.3,
    previous: 45.8,
    change: -7.6,
    trend: 'down',
  },
  avgSessionDuration: {
    current: 185, // seconds
    previous: 172,
    change: 7.6,
    trend: 'up',
  },
  pageViews: {
    current: 45678,
    previous: 39123,
    change: 16.8,
    trend: 'up',
  },
};

// Mock Traffic Sources
export const mockTrafficSources: TrafficSource[] = [
  {
    source: 'Organic Search',
    sessions: 5432,
    users: 4123,
    bounceRate: 38.5,
    conversions: 234,
  },
  {
    source: 'Direct',
    sessions: 3210,
    users: 2876,
    bounceRate: 41.2,
    conversions: 123,
  },
  {
    source: 'Social Media',
    sessions: 2345,
    users: 1987,
    bounceRate: 52.3,
    conversions: 67,
  },
  {
    source: 'Referral',
    sessions: 1556,
    users: 1234,
    bounceRate: 35.7,
    conversions: 32,
  },
];

// Mock Top Pages
export const mockTopPages: TopPage[] = [
  {
    path: '/products',
    title: 'Our Products',
    views: 8765,
    avgTime: 245,
    bounceRate: 35.2,
  },
  {
    path: '/services',
    title: 'Services',
    views: 6543,
    avgTime: 198,
    bounceRate: 42.1,
  },
  {
    path: '/about',
    title: 'About Us',
    views: 4321,
    avgTime: 167,
    bounceRate: 48.5,
  },
  {
    path: '/contact',
    title: 'Contact',
    views: 3210,
    avgTime: 123,
    bounceRate: 28.9,
  },
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Traffic Report',
    type: 'looker',
    url: 'https://lookerstudio.google.com/reporting/123',
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Conversion Funnel',
    type: 'looker',
    url: 'https://lookerstudio.google.com/reporting/456',
    createdAt: '2024-01-15T00:00:00Z',
    lastUpdated: new Date().toISOString(),
  },
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    number: 1001,
    subject: 'Website performance issue',
    description: 'The homepage is loading very slowly',
    status: 'open',
    priority: 'high',
    category: 'bug',
    createdBy: mockUsers[0],
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    comments: [],
  },
  {
    id: '2',
    number: 1002,
    subject: 'Need help with analytics setup',
    description: 'How do I connect Google Analytics?',
    status: 'in_progress',
    priority: 'medium',
    category: 'support',
    createdBy: mockUsers[0],
    createdAt: '2024-10-30T14:30:00Z',
    updatedAt: '2024-11-01T09:00:00Z',
    comments: [],
  },
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Increase website traffic',
    description: 'Get 50,000 monthly visitors',
    metric: 'sessions',
    targetValue: 50000,
    currentValue: 42543,
    period: 'monthly',
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    status: 'on_track',
    progress: 85.1,
    owner: mockUsers[0],
    createdAt: '2024-11-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Conversion rate goal',
    description: 'Achieve 5% conversion rate',
    metric: 'conversion_rate',
    targetValue: 5.0,
    currentValue: 3.6,
    period: 'monthly',
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    status: 'at_risk',
    progress: 72.0,
    createdAt: '2024-11-01T00:00:00Z',
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    source: 'google',
    rating: 5,
    author: 'Mario Rossi',
    content: 'Ottimo servizio, molto professionale e veloce!',
    sentiment: 'positive',
    categories: ['servizio clienti', 'professionalità'],
    hasResponse: false,
    createdAt: '2024-10-28T15:30:00Z',
  },
  {
    id: '2',
    source: 'google',
    rating: 4,
    author: 'Laura Bianchi',
    content: 'Buona esperienza, ma i tempi di consegna potrebbero essere migliori',
    sentiment: 'neutral',
    categories: ['consegna', 'esperienza'],
    hasResponse: true,
    response: {
      id: 'r1',
      reviewId: '2',
      content:
        'Grazie per il feedback! Stiamo lavorando per migliorare i nostri tempi di consegna.',
      author: mockUsers[0],
      createdAt: '2024-10-29T09:00:00Z',
    },
    createdAt: '2024-10-27T11:20:00Z',
    respondedAt: '2024-10-29T09:00:00Z',
  },
  {
    id: '3',
    source: 'facebook',
    rating: 2,
    author: 'Giuseppe Verdi',
    content: 'Servizio deludente, ho dovuto aspettare troppo',
    sentiment: 'negative',
    categories: ['attesa', 'servizio'],
    hasResponse: false,
    createdAt: '2024-10-25T16:45:00Z',
  },
];

// Mock Social Metrics
export const mockSocialMetrics: SocialMetrics[] = [
  {
    platform: 'facebook',
    followers: 12543,
    followersChange: 234,
    reach: 45678,
    reachChange: 1234,
    engagement: 3.5,
    engagementChange: 0.3,
    posts: 15,
  },
  {
    platform: 'instagram',
    followers: 8932,
    followersChange: 456,
    reach: 32145,
    reachChange: 2345,
    engagement: 4.2,
    engagementChange: 0.5,
    posts: 23,
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Fall Sale 2024',
    platform: 'google_ads',
    status: 'active',
    budget: 5000,
    spent: 3245.67,
    impressions: 125643,
    clicks: 3456,
    conversions: 234,
    ctr: 2.75,
    cpc: 0.94,
    roas: 4.2,
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
  },
  {
    id: '2',
    name: 'Black Friday Campaign',
    platform: 'facebook_ads',
    status: 'active',
    budget: 3000,
    spent: 1456.32,
    impressions: 89432,
    clicks: 2134,
    conversions: 156,
    ctr: 2.39,
    cpc: 0.68,
    roas: 3.8,
    startDate: '2024-11-15T00:00:00Z',
    endDate: '2024-11-29T23:59:59Z',
  },
];

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (email === 'admin@quickfy.com' && password === 'password') {
      return {
        user: mockUsers[0],
        token: 'mock-jwt-token',
        workspaces: mockWorkspaces,
      };
    }
    throw new Error('Invalid credentials');
  },

  // Dashboard
  getDashboardMetrics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockDashboardMetrics;
  },

  getTrafficSources: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTrafficSources;
  },

  getTopPages: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTopPages;
  },

  getReports: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReports;
  },

  // Tickets
  getTickets: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTickets;
  },

  createTicket: async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: '3', number: 1003, ...(data as object) };
  },

  // Goals
  getGoals: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockGoals;
  },

  createGoal: async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: '3', ...(data as object) };
  },

  // Reviews
  getReviews: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReviews;
  },

  // Social
  getSocialMetrics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSocialMetrics;
  },

  // Campaigns
  getCampaigns: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCampaigns;
  },

  // ============================================
  // WORKSPACE MANAGEMENT
  // ============================================

  getWorkspaces: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWorkspaces;
  },

  getWorkspace: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const workspace = mockWorkspaces.find((w) => w.id === id);
    if (!workspace) throw new Error('Workspace not found');
    return workspace;
  },

  createWorkspace: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: data.name,
      slug: data.slug,
      plan: 'starter',
      subscriptionStatus: 'trialing',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      members: [
        {
          id: '1',
          user: mockUsers[0],
          role: 'admin',
          invitedAt: new Date().toISOString(),
          acceptedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      settings: {
        timezone: 'Europe/Rome',
        currency: 'EUR',
        locale: 'it_IT',
        analytics: {
          connected: false,
        },
        googleAds: {
          connected: false,
        },
      },
    };
    mockWorkspaces.push(newWorkspace);
    return newWorkspace;
  },

  updateWorkspace: async (id: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockWorkspaces.findIndex((w) => w.id === id);
    if (index === -1) throw new Error('Workspace not found');

    mockWorkspaces[index] = {
      ...mockWorkspaces[index],
      ...data,
      settings: data.settings
        ? { ...mockWorkspaces[index].settings, ...data.settings }
        : mockWorkspaces[index].settings,
    };
    return mockWorkspaces[index];
  },

  deleteWorkspace: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = mockWorkspaces.findIndex((w) => w.id === id);
    if (index === -1) throw new Error('Workspace not found');
    mockWorkspaces.splice(index, 1);
  },

  // ============================================
  // WORKSPACE MEMBERS
  // ============================================

  inviteMember: async (workspaceId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const newMember: any = {
      id: Date.now().toString(),
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.email.split('@')[0],
        role: data.role,
        createdAt: new Date().toISOString(),
      },
      role: data.role,
      invitedAt: new Date().toISOString(),
      // acceptedAt undefined = pending
    };

    workspace.members.push(newMember);
    return newMember;
  },

  updateMemberRole: async (workspaceId: string, memberId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const member = workspace.members.find((m) => m.id === memberId);
    if (!member) throw new Error('Member not found');

    member.role = data.role;
    member.user.role = data.role;
  },

  removeMember: async (workspaceId: string, memberId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const index = workspace.members.findIndex((m) => m.id === memberId);
    if (index === -1) throw new Error('Member not found');

    workspace.members.splice(index, 1);
  },

  resendInvite: async (_workspaceId: string, _memberId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulate API call
  },
};
