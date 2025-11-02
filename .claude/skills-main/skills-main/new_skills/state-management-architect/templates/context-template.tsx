// Context pattern template with TypeScript
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'

// ============================================
// 1. Define State Type
// ============================================

interface State {
  // Add your state properties here
  count: number
  user: { id: string; name: string } | null
  loading: boolean
  error: string | null
}

// ============================================
// 2. Define Actions
// ============================================

type Action =
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: { id: string; name: string } | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

// ============================================
// 3. Create Reducer
// ============================================

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return { ...state, count: action.payload }

    case 'INCREMENT':
      return { ...state, count: state.count + 1 }

    case 'DECREMENT':
      return { ...state, count: state.count - 1 }

    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

// ============================================
// 4. Initial State
// ============================================

const initialState: State = {
  count: 0,
  user: null,
  loading: false,
  error: null,
}

// ============================================
// 5. Create Context
// ============================================

interface ContextType {
  state: State
  dispatch: Dispatch<Action>
}

const Context = createContext<ContextType | undefined>(undefined)

// ============================================
// 6. Create Provider
// ============================================

interface ProviderProps {
  children: ReactNode
  initialState?: Partial<State>
}

export function Provider({ children, initialState: customInitialState }: ProviderProps) {
  const [state, dispatch] = useReducer(
    reducer,
    customInitialState ? { ...initialState, ...customInitialState } : initialState
  )

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

// ============================================
// 7. Create Hook
// ============================================

export function useAppContext() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useAppContext must be used within a Provider')
  }

  return context
}

// ============================================
// 8. Action Creators (Optional but Recommended)
// ============================================

export const actions = {
  setCount: (count: number): Action => ({
    type: 'SET_COUNT',
    payload: count,
  }),

  increment: (): Action => ({
    type: 'INCREMENT',
  }),

  decrement: (): Action => ({
    type: 'DECREMENT',
  }),

  setUser: (user: { id: string; name: string } | null): Action => ({
    type: 'SET_USER',
    payload: user,
  }),

  setLoading: (loading: boolean): Action => ({
    type: 'SET_LOADING',
    payload: loading,
  }),

  setError: (error: string | null): Action => ({
    type: 'SET_ERROR',
    payload: error,
  }),

  reset: (): Action => ({
    type: 'RESET',
  }),
}

// ============================================
// 9. Selectors (Optional)
// ============================================

export const selectors = {
  getCount: (state: State) => state.count,
  getUser: (state: State) => state.user,
  isLoading: (state: State) => state.loading,
  getError: (state: State) => state.error,
  isAuthenticated: (state: State) => state.user !== null,
}

// ============================================
// Usage Example
// ============================================

/*
// App.tsx
import { Provider } from './context'

function App() {
  return (
    <Provider>
      <YourComponents />
    </Provider>
  )
}

// Component.tsx
import { useAppContext, actions, selectors } from './context'

function Component() {
  const { state, dispatch } = useAppContext()

  // Using selectors
  const count = selectors.getCount(state)
  const isAuthenticated = selectors.isAuthenticated(state)

  // Using action creators
  const handleIncrement = () => {
    dispatch(actions.increment())
  }

  const handleLogin = () => {
    dispatch(actions.setUser({ id: '1', name: 'John' }))
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
      {isAuthenticated && <p>Welcome, {state.user?.name}</p>}
    </div>
  )
}
*/
