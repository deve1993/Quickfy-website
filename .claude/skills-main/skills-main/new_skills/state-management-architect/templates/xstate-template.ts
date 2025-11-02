// XState state machine template with TypeScript
import { createMachine, assign, actions } from 'xstate'
import { useMachine } from '@xstate/react'

const { raise, sendParent, send } = actions

// ============================================
// 1. Define Context (State Data)
// ============================================

interface Context {
  user: { id: string; name: string; email: string } | null
  error: string | null
  retryCount: number
}

// ============================================
// 2. Define Events
// ============================================

type Event =
  | { type: 'LOGIN'; credentials: { email: string; password: string } }
  | { type: 'LOGOUT' }
  | { type: 'RETRY' }
  | { type: 'CANCEL' }

// ============================================
// 3. Define Services (Async Operations)
// ============================================

async function loginService(
  context: Context,
  event: Extract<Event, { type: 'LOGIN' }>
): Promise<{ id: string; name: string; email: string }> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event.credentials),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

// ============================================
// 4. Create State Machine
// ============================================

export const authMachine = createMachine<Context, Event>(
  {
    id: 'auth',
    initial: 'idle',
    context: {
      user: null,
      error: null,
      retryCount: 0,
    },
    states: {
      // Initial state
      idle: {
        on: {
          LOGIN: {
            target: 'authenticating',
          },
        },
      },

      // Authenticating (async)
      authenticating: {
        invoke: {
          id: 'loginService',
          src: loginService,
          onDone: {
            target: 'authenticated',
            actions: assign({
              user: (_, event) => event.data,
              error: null,
              retryCount: 0,
            }),
          },
          onError: [
            {
              // Guard: retry if count < 3
              cond: 'canRetry',
              target: 'retrying',
              actions: assign({
                error: (_, event) => event.data.message,
                retryCount: (ctx) => ctx.retryCount + 1,
              }),
            },
            {
              // Otherwise go to error
              target: 'error',
              actions: assign({
                error: (_, event) => event.data.message,
              }),
            },
          ],
        },
      },

      // Retry state (shows retry UI)
      retrying: {
        on: {
          RETRY: 'authenticating',
          CANCEL: 'idle',
        },
        after: {
          // Auto-retry after 2 seconds
          2000: 'authenticating',
        },
      },

      // Authenticated state
      authenticated: {
        entry: 'notifySuccess',
        on: {
          LOGOUT: {
            target: 'idle',
            actions: assign({
              user: null,
              error: null,
              retryCount: 0,
            }),
          },
        },
      },

      // Error state
      error: {
        entry: 'notifyError',
        on: {
          LOGIN: 'authenticating',
          CANCEL: {
            target: 'idle',
            actions: assign({
              error: null,
              retryCount: 0,
            }),
          },
        },
      },
    },
  },
  {
    // Guards (conditional logic)
    guards: {
      canRetry: (context) => context.retryCount < 3,
    },

    // Actions (side effects)
    actions: {
      notifySuccess: (context) => {
        console.log('Login successful:', context.user)
        // You could show a toast notification here
      },
      notifyError: (context) => {
        console.error('Login failed:', context.error)
        // You could show an error notification here
      },
    },
  }
)

// ============================================
// 5. React Hook Usage
// ============================================

export function useAuth() {
  const [state, send] = useMachine(authMachine)

  return {
    // Current state
    isIdle: state.matches('idle'),
    isAuthenticating: state.matches('authenticating'),
    isAuthenticated: state.matches('authenticated'),
    isRetrying: state.matches('retrying'),
    isError: state.matches('error'),

    // Context
    user: state.context.user,
    error: state.context.error,
    retryCount: state.context.retryCount,

    // Actions
    login: (credentials: { email: string; password: string }) =>
      send({ type: 'LOGIN', credentials }),
    logout: () => send({ type: 'LOGOUT' }),
    retry: () => send({ type: 'RETRY' }),
    cancel: () => send({ type: 'CANCEL' }),
  }
}

// ============================================
// Usage Example
// ============================================

/*
function LoginForm() {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    auth.login({ email, password })
  }

  if (auth.isAuthenticated) {
    return <div>Welcome, {auth.user?.name}!</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={auth.isAuthenticating}>
        {auth.isAuthenticating ? 'Logging in...' : 'Login'}
      </button>

      {auth.isRetrying && (
        <div>
          <p>Retry {auth.retryCount}/3...</p>
          <button onClick={auth.cancel}>Cancel</button>
        </div>
      )}

      {auth.isError && (
        <div>
          <p>Error: {auth.error}</p>
          <button onClick={() => auth.login({ email, password })}>
            Try Again
          </button>
        </div>
      )}
    </form>
  )
}
*/

// ============================================
// Visualize State Machine
// ============================================

/*
To visualize the state machine:
1. Go to https://stately.ai/viz
2. Paste the machine definition
3. See an interactive diagram

Or use the @xstate/inspect package:
import { inspect } from '@xstate/inspect'

inspect({
  iframe: false
})

const [state, send] = useMachine(authMachine, {
  devTools: true
})
*/
