import { OdooClient } from '@/lib/odoo/client';
import { mockApi } from '@/lib/odoo/mock-data';
import type {
  LoginCredentials,
  AuthResponse,
  DashboardMetrics,
  TrafficSource,
  TopPage,
  Report,
  Ticket,
  CreateTicketData,
  Goal,
  CreateGoalData,
  Review,
  SocialMetrics,
  Campaign,
} from '@/types';

const USE_MOCK = process.env.USE_MOCK_API === 'true';

class ApiClient {
  private odoo?: OdooClient;

  constructor() {
    if (!USE_MOCK) {
      const odooUrl = process.env.ODOO_URL;
      const odooDb = process.env.ODOO_DB;

      if (!odooUrl || !odooDb) {
        throw new Error(
          'ODOO_URL and ODOO_DB must be set when USE_MOCK_API is false'
        );
      }

      this.odoo = new OdooClient({
        url: odooUrl,
        db: odooDb,
      });
    }
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK) {
      return mockApi.login(credentials.email, credentials.password);
    }

    // Real Odoo implementation
    if (!this.odoo) throw new Error('Odoo client not initialized');

    await this.odoo.authenticate(credentials.email, credentials.password);
    const session = this.odoo.getSession();

    // Fetch user data from res.users
    const users = await this.odoo.searchRead<{
      id: number;
      name: string;
      email: string;
      image_1920?: string;
    }>('res.users', [{ field: 'id', operator: '=', value: session.uid }], [
      'name',
      'email',
      'image_1920',
    ]);

    const odooUser = users[0];

    // Fetch companies (workspaces) the user has access to
    const companies = await this.odoo.searchRead<{
      id: number;
      name: string;
    }>('res.company', [], ['name']);

    return {
      user: {
        id: odooUser.id.toString(),
        email: odooUser.email,
        name: odooUser.name,
        role: 'admin', // Determine from groups
        createdAt: new Date().toISOString(),
      },
      token: session.sessionId || '',
      workspaces: companies.map((c) => ({
        id: c.id.toString(),
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, '-'),
        plan: 'pro',
        subscriptionStatus: 'active',
        members: [],
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
      })),
    };
  }

  // ============================================
  // DASHBOARD
  // ============================================

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    if (USE_MOCK) {
      return mockApi.getDashboardMetrics();
    }

    // Real Odoo implementation
    // This would integrate with custom Odoo modules or external analytics API
    throw new Error('Real dashboard metrics not implemented yet');
  }

  async getTrafficSources(): Promise<TrafficSource[]> {
    if (USE_MOCK) {
      return mockApi.getTrafficSources();
    }

    throw new Error('Real traffic sources not implemented yet');
  }

  async getTopPages(): Promise<TopPage[]> {
    if (USE_MOCK) {
      return mockApi.getTopPages();
    }

    throw new Error('Real top pages not implemented yet');
  }

  async getReports(): Promise<Report[]> {
    if (USE_MOCK) {
      return mockApi.getReports();
    }

    throw new Error('Real reports not implemented yet');
  }

  // ============================================
  // TICKETING
  // ============================================

  async getTickets(): Promise<Ticket[]> {
    if (USE_MOCK) {
      return mockApi.getTickets();
    }

    if (!this.odoo) throw new Error('Odoo client not initialized');

    // Real Odoo implementation using helpdesk.ticket model
    const tickets = await this.odoo.searchRead<{
      id: number;
      name: string;
      description: string;
      stage_id: [number, string];
      priority: string;
      ticket_type_id: [number, string] | false;
      user_id: [number, string] | false;
      create_uid: [number, string];
      create_date: string;
      write_date: string;
      close_date: string | false;
    }>(
      'helpdesk.ticket',
      [],
      [
        'name',
        'description',
        'stage_id',
        'priority',
        'ticket_type_id',
        'user_id',
        'create_uid',
        'create_date',
        'write_date',
        'close_date',
      ]
    );

    return tickets.map((t) => ({
      id: t.id.toString(),
      number: t.id,
      subject: t.name,
      description: t.description || '',
      status: this.mapOdooStageToStatus(t.stage_id[1]),
      priority: this.mapOdooPriority(t.priority),
      category: 'support',
      createdBy: {
        id: t.create_uid[0].toString(),
        name: t.create_uid[1],
        email: '',
        role: 'admin',
        createdAt: '',
      },
      createdAt: t.create_date,
      updatedAt: t.write_date,
      closedAt: t.close_date || undefined,
      comments: [],
    }));
  }

  async createTicket(data: CreateTicketData): Promise<Ticket> {
    if (USE_MOCK) {
      return mockApi.createTicket(data) as Promise<Ticket>;
    }

    if (!this.odoo) throw new Error('Odoo client not initialized');

    const ticketId = await this.odoo.create('helpdesk.ticket', {
      name: data.subject,
      description: data.description,
      priority: data.priority,
    });

    const tickets = await this.odoo.read<{
      id: number;
      name: string;
      description: string;
      create_date: string;
    }>('helpdesk.ticket', [ticketId], ['name', 'description', 'create_date']);

    const ticket = tickets[0];

    return {
      id: ticket.id.toString(),
      number: ticket.id,
      subject: ticket.name,
      description: ticket.description,
      status: 'open',
      priority: data.priority,
      category: data.category,
      createdBy: {
        id: '1',
        name: 'Current User',
        email: '',
        role: 'admin',
        createdAt: '',
      },
      createdAt: ticket.create_date,
      updatedAt: ticket.create_date,
      comments: [],
    };
  }

  // ============================================
  // GOALS
  // ============================================

  async getGoals(): Promise<Goal[]> {
    if (USE_MOCK) {
      return mockApi.getGoals();
    }

    throw new Error('Real goals not implemented yet');
  }

  async createGoal(data: CreateGoalData): Promise<Goal> {
    if (USE_MOCK) {
      return mockApi.createGoal(data) as Promise<Goal>;
    }

    throw new Error('Real create goal not implemented yet');
  }

  // ============================================
  // REVIEWS
  // ============================================

  async getReviews(): Promise<Review[]> {
    if (USE_MOCK) {
      return mockApi.getReviews();
    }

    throw new Error('Real reviews not implemented yet');
  }

  // ============================================
  // SOCIAL
  // ============================================

  async getSocialMetrics(): Promise<SocialMetrics[]> {
    if (USE_MOCK) {
      return mockApi.getSocialMetrics();
    }

    throw new Error('Real social metrics not implemented yet');
  }

  // ============================================
  // CAMPAIGNS
  // ============================================

  async getCampaigns(): Promise<Campaign[]> {
    if (USE_MOCK) {
      return mockApi.getCampaigns();
    }

    throw new Error('Real campaigns not implemented yet');
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  private mapOdooStageToStatus(
    stage: string
  ): 'open' | 'in_progress' | 'waiting' | 'closed' {
    const stageLower = stage.toLowerCase();
    if (stageLower.includes('new') || stageLower.includes('open')) return 'open';
    if (stageLower.includes('progress')) return 'in_progress';
    if (stageLower.includes('wait')) return 'waiting';
    if (stageLower.includes('done') || stageLower.includes('closed'))
      return 'closed';
    return 'open';
  }

  private mapOdooPriority(
    priority: string
  ): 'low' | 'medium' | 'high' | 'urgent' {
    const priorityMap: Record<string, 'low' | 'medium' | 'high' | 'urgent'> = {
      '0': 'low',
      '1': 'medium',
      '2': 'high',
      '3': 'urgent',
    };
    return priorityMap[priority] || 'medium';
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
