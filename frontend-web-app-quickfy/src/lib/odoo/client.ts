import axios, { AxiosInstance } from 'axios';
import type {
  OdooRPCRequest,
  OdooRPCResponse,
  OdooSearchDomain,
} from '@/types';

export interface OdooConfig {
  url: string;
  db: string;
  username?: string;
  password?: string;
  apiKey?: string;
}

export interface OdooContext {
  lang?: string;
  tz?: string;
  uid?: number;
  allowed_company_ids?: number[];
  [key: string]: unknown;
}

export class OdooClient {
  private config: OdooConfig;
  private client: AxiosInstance;
  private sessionId?: string;
  private uid?: number;
  private context: OdooContext;
  private requestId: number = 0;

  constructor(config: OdooConfig) {
    this.config = config;
    this.context = {
      lang: 'it_IT',
      tz: 'Europe/Rome',
    };

    this.client = axios.create({
      baseURL: config.url,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  /**
   * Authenticate with Odoo using username and password
   */
  async authenticate(username: string, password: string): Promise<void> {
    const response = await this.client.post<
      OdooRPCResponse<{
        uid: number;
        session_id: string;
        user_context: OdooContext;
        company_id: number;
      }>
    >('/web/session/authenticate', {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: this.config.db,
        login: username,
        password,
      },
      id: this.getNextRequestId(),
    });

    if (response.data.error) {
      throw new Error(
        response.data.error.data.message || 'Authentication failed'
      );
    }

    if (!response.data.result) {
      throw new Error('Authentication failed: No result returned');
    }

    this.uid = response.data.result.uid;
    this.sessionId = response.data.result.session_id;
    this.context = {
      ...this.context,
      ...response.data.result.user_context,
      uid: this.uid,
    };

    // Set session cookie for subsequent requests
    if (this.sessionId) {
      this.client.defaults.headers.common['Cookie'] = `session_id=${this.sessionId}`;
    }
  }

  /**
   * Set session ID manually (for server-side use with stored sessions)
   */
  setSession(sessionId: string, uid: number, context?: OdooContext): void {
    this.sessionId = sessionId;
    this.uid = uid;
    this.client.defaults.headers.common['Cookie'] = `session_id=${sessionId}`;
    if (context) {
      this.context = { ...this.context, ...context, uid };
    }
  }

  /**
   * Get current session info
   */
  getSession(): {
    sessionId?: string;
    uid?: number;
    context: OdooContext;
  } {
    return {
      sessionId: this.sessionId,
      uid: this.uid,
      context: this.context,
    };
  }

  /**
   * Update context (e.g., for multi-company)
   */
  updateContext(context: Partial<OdooContext>): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Generic JSON-RPC call to Odoo
   */
  private async jsonRpc<T>(
    endpoint: string,
    params: Record<string, unknown>
  ): Promise<T> {
    const request: OdooRPCRequest = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [],
        ...params,
      },
      id: this.getNextRequestId(),
    };

    const response = await this.client.post<OdooRPCResponse<T>>(
      endpoint,
      request
    );

    if (response.data.error) {
      throw new Error(
        response.data.error.data.message ||
          `Odoo RPC Error: ${response.data.error.message}`
      );
    }

    if (response.data.result === undefined) {
      throw new Error('Odoo RPC Error: No result returned');
    }

    return response.data.result;
  }

  /**
   * Call any Odoo model method
   */
  async call<T>(
    model: string,
    method: string,
    args: unknown[] = [],
    kwargs: Record<string, unknown> = {}
  ): Promise<T> {
    if (!this.uid) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    return this.jsonRpc<T>('/web/dataset/call_kw', {
      model,
      method,
      args,
      kwargs: {
        ...kwargs,
        context: { ...this.context, ...((kwargs.context as OdooContext) || {}) },
      },
    });
  }

  /**
   * Search for records by domain
   */
  async search(
    model: string,
    domain: OdooSearchDomain[] = [],
    options: {
      limit?: number;
      offset?: number;
      order?: string;
    } = {}
  ): Promise<number[]> {
    const domainArray = domain.map((d) => [d.field, d.operator, d.value]);
    return this.call<number[]>(model, 'search', [domainArray], options);
  }

  /**
   * Read specific fields from records
   */
  async read<T extends Record<string, unknown>>(
    model: string,
    ids: number[],
    fields: string[] = []
  ): Promise<T[]> {
    return this.call<T[]>(model, 'read', [ids], { fields });
  }

  /**
   * Search and read in one call (most common operation)
   */
  async searchRead<T extends Record<string, unknown>>(
    model: string,
    domain: OdooSearchDomain[] = [],
    fields: string[] = [],
    options: {
      limit?: number;
      offset?: number;
      order?: string;
    } = {}
  ): Promise<T[]> {
    const domainArray = domain.map((d) => [d.field, d.operator, d.value]);
    return this.call<T[]>(
      model,
      'search_read',
      [],
      {
        domain: domainArray,
        fields,
        ...options,
      }
    );
  }

  /**
   * Create a new record
   */
  async create(model: string, values: Record<string, unknown>): Promise<number> {
    return this.call<number>(model, 'create', [values]);
  }

  /**
   * Update existing records
   */
  async write(
    model: string,
    ids: number[],
    values: Record<string, unknown>
  ): Promise<boolean> {
    return this.call<boolean>(model, 'write', [ids, values]);
  }

  /**
   * Delete records
   */
  async unlink(model: string, ids: number[]): Promise<boolean> {
    return this.call<boolean>(model, 'unlink', [ids]);
  }

  /**
   * Count records matching domain
   */
  async searchCount(
    model: string,
    domain: OdooSearchDomain[] = []
  ): Promise<number> {
    const domainArray = domain.map((d) => [d.field, d.operator, d.value]);
    return this.call<number>(model, 'search_count', [domainArray]);
  }

  /**
   * Get field definitions for a model
   */
  async fieldsGet(model: string, fields: string[] = []): Promise<Record<string, unknown>> {
    return this.call<Record<string, unknown>>(model, 'fields_get', [], {
      attributes: ['string', 'help', 'type', 'required', 'readonly'],
      ...(fields.length > 0 && { allfields: fields }),
    });
  }

  /**
   * Name search (autocomplete)
   */
  async nameSearch(
    model: string,
    name: string,
    domain: OdooSearchDomain[] = [],
    limit: number = 10
  ): Promise<Array<[number, string]>> {
    const domainArray = domain.map((d) => [d.field, d.operator, d.value]);
    return this.call<Array<[number, string]>>(model, 'name_search', [], {
      name,
      args: domainArray,
      limit,
    });
  }

  /**
   * Get name_get for specific IDs
   */
  async nameGet(model: string, ids: number[]): Promise<Array<[number, string]>> {
    return this.call<Array<[number, string]>>(model, 'name_get', [ids]);
  }

  private getNextRequestId(): number {
    return ++this.requestId;
  }

  /**
   * Logout and destroy session
   */
  async logout(): Promise<void> {
    if (this.sessionId) {
      try {
        await this.client.post('/web/session/destroy', {
          jsonrpc: '2.0',
          method: 'call',
          params: {},
          id: this.getNextRequestId(),
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    this.sessionId = undefined;
    this.uid = undefined;
    delete this.client.defaults.headers.common['Cookie'];
  }
}
