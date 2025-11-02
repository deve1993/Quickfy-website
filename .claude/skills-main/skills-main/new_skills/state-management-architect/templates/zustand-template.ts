// Zustand store template with TypeScript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// ============================================
// 1. Define Types
// ============================================

interface User {
  id: string
  name: string
  email: string
}

interface Todo {
  id: string
  text: string
  completed: boolean
}

// ============================================
// 2. Define Store Interface
// ============================================

interface Store {
  // State
  user: User | null
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  loading: boolean
  error: string | null

  // Actions
  setUser: (user: User | null) => void
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void

  // Computed/Selectors
  filteredTodos: () => Todo[]
  completedCount: () => number
  activeCount: () => number
}

// ============================================
// 3. Initial State
// ============================================

const initialState = {
  user: null,
  todos: [],
  filter: 'all' as const,
  loading: false,
  error: null,
}

// ============================================
// 4. Create Store
// ============================================

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        ...initialState,

        // Actions
        setUser: (user) =>
          set((state) => {
            state.user = user
          }),

        addTodo: (text) =>
          set((state) => {
            state.todos.push({
              id: Date.now().toString(),
              text,
              completed: false,
            })
          }),

        toggleTodo: (id) =>
          set((state) => {
            const todo = state.todos.find((t) => t.id === id)
            if (todo) {
              todo.completed = !todo.completed
            }
          }),

        removeTodo: (id) =>
          set((state) => {
            state.todos = state.todos.filter((t) => t.id !== id)
          }),

        setFilter: (filter) =>
          set({ filter }),

        setLoading: (loading) =>
          set({ loading }),

        setError: (error) =>
          set({ error }),

        reset: () =>
          set(initialState),

        // Computed/Selectors
        filteredTodos: () => {
          const { todos, filter } = get()
          if (filter === 'all') return todos
          if (filter === 'active') return todos.filter((t) => !t.completed)
          return todos.filter((t) => t.completed)
        },

        completedCount: () => {
          const todos = get().todos
          return todos.filter((t) => t.completed).length
        },

        activeCount: () => {
          const todos = get().todos
          return todos.filter((t) => !t.completed).length
        },
      })),
      {
        name: 'app-storage', // localStorage key
        // Optional: only persist specific fields
        partialize: (state) => ({
          user: state.user,
          todos: state.todos,
        }),
      }
    ),
    {
      name: 'AppStore', // DevTools name
    }
  )
)

// ============================================
// 5. Selectors (for optimized subscriptions)
// ============================================

export const selectors = {
  user: (state: Store) => state.user,
  todos: (state: Store) => state.todos,
  filter: (state: Store) => state.filter,
  loading: (state: Store) => state.loading,
  error: (state: Store) => state.error,
  filteredTodos: (state: Store) => state.filteredTodos(),
  completedCount: (state: Store) => state.completedCount(),
  activeCount: (state: Store) => state.activeCount(),
}

// ============================================
// Usage Examples
// ============================================

/*
// 1. Using the whole store (re-renders on any change)
function Component() {
  const store = useStore()

  return <div>{store.todos.length} todos</div>
}

// 2. Using a selector (re-renders only when that slice changes)
function Component() {
  const todos = useStore((state) => state.todos)
  const addTodo = useStore((state) => state.addTodo)

  return (
    <div>
      {todos.length} todos
      <button onClick={() => addTodo('New todo')}>Add</button>
    </div>
  )
}

// 3. Using multiple selectors
function Component() {
  const todos = useStore(selectors.todos)
  const filter = useStore(selectors.filter)
  const { addTodo, setFilter } = useStore()

  return (
    <div>
      {todos.length} todos (filter: {filter})
    </div>
  )
}

// 4. Using computed values
function Component() {
  const filteredTodos = useStore(selectors.filteredTodos)
  const completedCount = useStore(selectors.completedCount)

  return (
    <div>
      {filteredTodos.length} todos ({completedCount} completed)
    </div>
  )
}

// 5. Using store outside React
function someFunction() {
  const { addTodo, todos } = useStore.getState()

  addTodo('New todo')
  console.log(todos)
}

// 6. Subscribing to changes
const unsubscribe = useStore.subscribe(
  (state) => console.log('Todos changed:', state.todos)
)

// Later: unsubscribe()
*/
