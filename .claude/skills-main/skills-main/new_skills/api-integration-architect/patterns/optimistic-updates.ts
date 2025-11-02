import { useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { api, APIError } from '../templates/api-client'

/**
 * PATTERN 1: Optimistic Update with Rollback
 *
 * Use this pattern when you want instant UI feedback but need to rollback on error.
 * Perfect for: Like button, follow/unfollow, simple toggles
 */

interface Todo {
  id: string
  title: string
  completed: boolean
}

export function useToggleTodoOptimistic() {
  const queryClient = useQueryClient()

  return useMutation<Todo, APIError, string>({
    mutationFn: async (todoId) => {
      // Simulate API call
      return api.patch<Todo>(`/todos/${todoId}/toggle`)
    },
    onMutate: async (todoId) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // 2. Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // 3. Optimistically update the cache
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      )

      // 4. Return context with snapshot
      return { previousTodos }
    },
    onError: (err, todoId, context) => {
      // 5. Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      // 6. Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

/**
 * PATTERN 2: Optimistic Add with Temporary ID
 *
 * Add item to list immediately with temp ID, replace with real ID on success.
 * Perfect for: Adding comments, creating posts, chat messages
 */

interface Comment {
  id: string
  postId: string
  text: string
  author: string
  createdAt: string
}

export function useAddCommentOptimistic() {
  const queryClient = useQueryClient()

  return useMutation<Comment, APIError, Omit<Comment, 'id' | 'createdAt'>>({
    mutationFn: async (newComment) => {
      return api.post<Comment>('/comments', newComment)
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', newComment.postId] })

      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        newComment.postId,
      ])

      // Create optimistic comment with temp ID
      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        ...newComment,
        createdAt: new Date().toISOString(),
      }

      // Add to cache
      queryClient.setQueryData<Comment[]>(
        ['comments', newComment.postId],
        (old) => [...(old || []), optimisticComment]
      )

      return { previousComments, optimisticId: optimisticComment.id }
    },
    onSuccess: (newComment, variables, context) => {
      // Replace optimistic comment with real one
      queryClient.setQueryData<Comment[]>(
        ['comments', variables.postId],
        (old) =>
          old?.map((comment) =>
            comment.id === context.optimisticId ? newComment : comment
          )
      )
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', newComment.postId], context.previousComments)
      }
    },
  })
}

/**
 * PATTERN 3: Optimistic Delete with Undo
 *
 * Remove item immediately, show undo toast, rollback if undo clicked.
 * Perfect for: Delete actions, archive, move to trash
 */

export function useDeleteTodoOptimistic(onUndo?: () => void) {
  const queryClient = useQueryClient()

  return useMutation<void, APIError, string>({
    mutationFn: async (todoId) => {
      // Delay actual deletion to allow undo
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          api.delete(`/todos/${todoId}`).then(() => resolve())
        }, 5000) // 5 second undo window

        // Store timeout ID for undo
        ;(window as any).__deleteTimeout = timeoutId
      })
    },
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // Remove from UI immediately
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.filter((todo) => todo.id !== todoId)
      )

      return { previousTodos, todoId }
    },
    onError: (err, todoId, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
  })
}

// Undo function to call from toast
export function undoDelete(queryClient: QueryClient) {
  // Clear the pending delete
  const timeoutId = (window as any).__deleteTimeout
  if (timeoutId) {
    clearTimeout(timeoutId)
    delete (window as any).__deleteTimeout
  }
  // Refetch to restore
  queryClient.invalidateQueries({ queryKey: ['todos'] })
}

/**
 * PATTERN 4: Optimistic Update Multiple Entities
 *
 * Update multiple related queries optimistically.
 * Perfect for: Batch operations, bulk actions
 */

export function useBulkUpdateTodos() {
  const queryClient = useQueryClient()

  return useMutation<Todo[], APIError, { ids: string[]; completed: boolean }>({
    mutationFn: async ({ ids, completed }) => {
      return api.patch<Todo[]>('/todos/bulk', { ids, completed })
    },
    onMutate: async ({ ids, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // Update multiple items
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((todo) => (ids.includes(todo.id) ? { ...todo, completed } : todo))
      )

      return { previousTodos }
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

/**
 * PATTERN 5: Optimistic Reorder
 *
 * Reorder list immediately, sync with backend.
 * Perfect for: Drag and drop, sortable lists
 */

export function useReorderTodos() {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    APIError,
    { sourceIndex: number; destinationIndex: number }
  >({
    mutationFn: async ({ sourceIndex, destinationIndex }) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (!todos) return

      const reordered = Array.from(todos)
      const [removed] = reordered.splice(sourceIndex, 1)
      reordered.splice(destinationIndex, 0, removed)

      // Send new order to backend
      return api.put('/todos/reorder', {
        order: reordered.map((t) => t.id),
      })
    },
    onMutate: async ({ sourceIndex, destinationIndex }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // Optimistically reorder
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return old
        const result = Array.from(old)
        const [removed] = result.splice(sourceIndex, 1)
        result.splice(destinationIndex, 0, removed)
        return result
      })

      return { previousTodos }
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
  })
}
