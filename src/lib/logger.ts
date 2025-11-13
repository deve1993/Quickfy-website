/**
 * Logger utility for controlled logging in different environments
 * - In development: all logs are displayed
 * - In production: only errors are displayed (warn/info are suppressed)
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

type LogLevel = 'log' | 'warn' | 'info' | 'error' | 'debug';

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

class Logger {
  private prefix: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix || '';
    this.timestamp = options.timestamp ?? isDevelopment;
  }

  private formatMessage(level: LogLevel, ...args: unknown[]): unknown[] {
    const parts: unknown[] = [];

    if (this.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }

    parts.push(`[${level.toUpperCase()}]`);
    parts.push(...args);

    return parts;
  }

  /**
   * Log general messages (only in development)
   */
  log(...args: unknown[]): void {
    if (isDevelopment) {
      console.log(...this.formatMessage('log', ...args));
    }
  }

  /**
   * Log warnings (only in development)
   */
  warn(...args: unknown[]): void {
    if (isDevelopment) {
      console.warn(...this.formatMessage('warn', ...args));
    }
  }

  /**
   * Log informational messages (only in development)
   */
  info(...args: unknown[]): void {
    if (isDevelopment) {
      console.info(...this.formatMessage('info', ...args));
    }
  }

  /**
   * Log errors (always displayed, even in production)
   */
  error(...args: unknown[]): void {
    console.error(...this.formatMessage('error', ...args));
  }

  /**
   * Log debug messages (only in development)
   */
  debug(...args: unknown[]): void {
    if (isDevelopment) {
      console.debug(...this.formatMessage('debug', ...args));
    }
  }

  /**
   * Create a child logger with an additional prefix
   */
  child(childPrefix: string): Logger {
    return new Logger({
      prefix: this.prefix ? `${this.prefix}:${childPrefix}` : childPrefix,
      timestamp: this.timestamp
    });
  }
}

// Default logger instance
export const logger = new Logger();

// Named loggers for specific modules
export const createLogger = (name: string, options?: LoggerOptions): Logger => {
  return new Logger({
    ...options,
    prefix: name
  });
};

// Utility to suppress console in production
export const suppressConsoleInProduction = (): void => {
  if (isProduction) {
    const noop = () => undefined;
    console.log = noop;
    console.warn = noop;
    console.info = noop;
    console.debug = noop;
    // Keep console.error for critical issues
  }
};

// Export for convenience
export default logger;
