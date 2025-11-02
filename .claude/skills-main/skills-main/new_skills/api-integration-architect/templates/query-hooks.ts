import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { api, APIError } from './api-client'

// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface QueryKey extends Array<string | number | object> {}

// ============= Query Hooks =============

// Fetch single user
export function useUser(
  userId: string,
  options?: Omit<UseQueryOptions<User, APIError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User, APIError>({
    queryKey: ['user', userId],
    queryFn: () => api.get<User>(`/users/${userId}`),
    enabled: !!userId,
    ...options,
  })
}

// Fetch users list
export function useUsers(
  filters?: { search?: string; role?: string },
  options?: Omit<UseQueryOptions<User[], APIError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User[], APIError>({
    queryKey: ['users', filters],
    queryFn: () => api.get<User[]>('/users', { params: filters }),
    ...options,
  })
}

// Infinite scroll users
export function useInfiniteUsers(
  filters?: { search?: string },
  options?: Omit<
    UseInfiniteQueryOptions<PaginatedResponse<User>, APIError>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  >
) {
  return useInfiniteQuery<PaginatedResponse<User>, APIError>({
    queryKey: ['users', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      api.get<PaginatedResponse<User>>('/users', {
        params: { ...filters, page: pageParam, pageSize: 20 },
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    ...options,
  })
}

// ============= Mutation Hooks =============

// Create user
export function useCreateUser(
  options?: UseMutationOptions<User, APIError, Omit<User, 'id'>>
) {
  const queryClient = useQueryClient()

  return useMutation<User, APIError, Omit<User, 'id'>>({
    mutationFn: (newUser) => api.post<User>('/users', newUser),
    onSuccess: (data) => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
      // Optionally set the new user in cache
      queryClient.setQueryData(['user', data.id], data)
    },
    ...options,
  })
}

// Update user
export function useUpdateUser(
  options?: UseMutationOptions<User, APIError, { id: string; data: Partial<User> }>
) {
  const queryClient = useQueryClient()

  return useMutation<User, APIError, { id: string; data: Partial<User> }>({
    mutationFn: ({ id, data }) => api.put<User>(`/users/${id}`, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['user', id] })

      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(['user', id])

      // Optimistically update
      if (previousUser) {
        queryClient.setQueryData<User>(['user', id], {
          ...previousUser,
          ...data,
        })
      }

      return { previousUser }
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(['user', id], context.previousUser)
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['user', id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    ...options,
  })
}

// Delete user
export function useDeleteUser(
  options?: UseMutationOptions<void, APIError, string>
) {
  const queryClient = useQueryClient()

  return useMutation<void, APIError, string>({
    mutationFn: (userId) => api.delete(`/users/${userId}`),
    onMutate: async (userId) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ['users'] })

      // Remove from cache
      queryClient.removeQueries({ queryKey: ['user', userId] })

      // Snapshot
      const previousUsers = queryClient.getQueryData<User[]>(['users'])

      // Optimistically remove
      if (previousUsers) {
        queryClient.setQueryData<User[]>(
          ['users'],
          previousUsers.filter((user) => user.id !== userId)
        )
      }

      return { previousUsers }
    },
    onError: (err, userId, context) => {
      // Rollback
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    ...options,
  })
}

// ============= Prefetch Utilities =============

export function prefetchUser(queryClient: ReturnType<typeof useQueryClient>, userId: string) {
  return queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get<User>(`/users/${userId}`),
  })
}

export function prefetchUsers(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users'),
  })
}
