import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { QueryClient } from '@tanstack/react-query'

// API Client Configuration
export interface APIClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
}

// Custom Error Class
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Create API Client
export function createAPIClient(config: APIClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    withCredentials: config.withCredentials || false,
  })

  // Request Interceptor - Add auth token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response Interceptor - Handle errors
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // Attempt to refresh token
          const refreshToken = localStorage.getItem('refresh_token')
          if (!refreshToken) throw new Error('No refresh token')

          const { data } = await axios.post(`${config.baseURL}/auth/refresh`, {
            refreshToken,
          })

          localStorage.setItem('auth_token', data.accessToken)

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          }
          return client(originalRequest)
        } catch (refreshError) {
          // Redirect to login
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      // Transform error to APIError
      const apiError = new APIError(
        error.response?.status || 500,
        error.response?.data?.message || error.message,
        error.response?.data?.code,
        error.response?.data
      )

      return Promise.reject(apiError)
    }
  )

  return client
}

// Initialize API Client
export const apiClient = createAPIClient({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  withCredentials: true,
})

// Query Client Configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof APIError && error.status >= 400 && error.status < 500) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error('Mutation error:', error)
      },
    },
  },
})

// Generic API Methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
}

// Export types
export type { AxiosInstance, AxiosRequestConfig, AxiosError }
