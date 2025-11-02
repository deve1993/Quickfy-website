// State testing patterns and utilities
import { renderHook, act, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

// ============================================
// Testing Context
// ============================================

/*
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Provider, useAppContext, actions } from './context'

// Wrapper for tests
function wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}

// Test component
function TestComponent() {
  const { state, dispatch } = useAppContext()

  return (
    <div>
      <span data-testid="count">{state.count}</span>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
    </div>
  )
}

describe('Context', () => {
  it('increments count', async () => {
    const user = userEvent.setup()
    render(<TestComponent />, { wrapper })

    expect(screen.getByTestId('count')).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: '+' }))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('provides initial state', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    expect(result.current.state.count).toBe(0)
  })

  it('dispatches actions', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    act(() => {
      result.current.dispatch(actions.increment())
    })

    expect(result.current.state.count).toBe(1)
  })
})
*/

// ============================================
// Testing XState
// ============================================

/*
import { interpret, Interpreter } from 'xstate'
import { authMachine } from './authMachine'

describe('authMachine', () => {
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(authMachine).start()
  })

  afterEach(() => {
    service.stop()
  })

  it('starts in idle state', () => {
    expect(service.state.value).toBe('idle')
  })

  it('transitions to authenticating on LOGIN', () => {
    service.send('LOGIN', { credentials: { email: 'test@example.com', password: 'password' } })

    expect(service.state.value).toBe('authenticating')
  })

  it('transitions to authenticated on successful login', async () => {
    service.send('LOGIN', { credentials: { email: 'test@example.com', password: 'password' } })

    // Wait for transition
    await waitFor(() => {
      expect(service.state.value).toBe('authenticated')
    })

    expect(service.state.context.user).toBeTruthy()
    expect(service.state.context.error).toBeNull()
  })

  it('transitions to error on failed login', async () => {
    service.send('LOGIN', { credentials: { email: 'invalid', password: 'invalid' } })

    await waitFor(() => {
      expect(service.state.value).toBe('error')
    })

    expect(service.state.context.error).toBeTruthy()
  })

  it('transitions to idle on LOGOUT', async () => {
    service.send('LOGIN', { credentials: { email: 'test@example.com', password: 'password' } })

    await waitFor(() => {
      expect(service.state.value).toBe('authenticated')
    })

    service.send('LOGOUT')

    expect(service.state.value).toBe('idle')
    expect(service.state.context.user).toBeNull()
  })
})
*/

// ============================================
// Testing Zustand
// ============================================

/*
import { renderHook, act } from '@testing-library/react'
import { useStore } from './store'

describe('useStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({
      todos: [],
      filter: 'all',
      loading: false,
      error: null,
    })
  })

  it('has initial state', () => {
    const { result } = renderHook(() => useStore())

    expect(result.current.todos).toEqual([])
    expect(result.current.filter).toBe('all')
  })

  it('adds a todo', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Test todo')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Test todo')
  })

  it('toggles a todo', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Test todo')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(true)
  })

  it('removes a todo', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.removeTodo(todoId)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Todo 2')
  })

  it('filters todos', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
      result.current.toggleTodo(result.current.todos[0].id)
    })

    act(() => {
      result.current.setFilter('active')
    })

    expect(result.current.filteredTodos()).toHaveLength(1)
    expect(result.current.filteredTodos()[0].text).toBe('Todo 2')

    act(() => {
      result.current.setFilter('completed')
    })

    expect(result.current.filteredTodos()).toHaveLength(1)
    expect(result.current.filteredTodos()[0].text).toBe('Todo 1')
  })

  it('computes active and completed counts', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
      result.current.addTodo('Todo 3')
      result.current.toggleTodo(result.current.todos[0].id)
      result.current.toggleTodo(result.current.todos[1].id)
    })

    expect(result.current.activeCount()).toBe(1)
    expect(result.current.completedCount()).toBe(2)
  })

  it('resets state', () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.addTodo('Test todo')
      result.current.setFilter('active')
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.todos).toEqual([])
    expect(result.current.filter).toBe('all')
  })
})
*/

// ============================================
// Testing Jotai
// ============================================

/*
import { renderHook, act } from '@testing-library/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { countAtom, doubleCountAtom, incrementAtom } from './atoms'
import { ReactNode } from 'react'

// Provider wrapper
import { Provider } from 'jotai'

function wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}

describe('Jotai atoms', () => {
  it('reads and writes primitive atom', () => {
    const { result } = renderHook(() => useAtom(countAtom), { wrapper })

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](5)
    })

    expect(result.current[0]).toBe(5)
  })

  it('reads derived atom', () => {
    const { result: countResult } = renderHook(() => useAtom(countAtom), { wrapper })
    const { result: doubleResult } = renderHook(() => useAtomValue(doubleCountAtom), { wrapper })

    expect(doubleResult.current).toBe(0)

    act(() => {
      countResult.current[1](5)
    })

    expect(doubleResult.current).toBe(10)
  })

  it('writes to write-only atom', () => {
    const { result: countResult } = renderHook(() => useAtomValue(countAtom), { wrapper })
    const { result: incrementResult } = renderHook(() => useSetAtom(incrementAtom), { wrapper })

    expect(countResult.current).toBe(0)

    act(() => {
      incrementResult.current()
    })

    expect(countResult.current).toBe(1)
  })

  it('handles async atoms', async () => {
    const { result } = renderHook(() => useAtomValue(userAtom), { wrapper })

    // Initially will be a promise
    expect(result.current).toBeInstanceOf(Promise)

    // Wait for resolution
    await waitFor(() => {
      expect(result.current).toHaveProperty('id')
    })
  })
})
*/

// ============================================
// Testing Custom Hooks
// ============================================

/*
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage, useCounter, useToggle } from './hooks'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  it('updates value and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'))
  })

  it('loads from localStorage', () => {
    localStorage.setItem('key', JSON.stringify('stored'))

    const { result } = renderHook(() => useLocalStorage('key', 'initial'))

    expect(result.current[0]).toBe('stored')
  })
})

describe('useCounter', () => {
  it('has initial value', () => {
    const { result } = renderHook(() => useCounter(5))

    expect(result.current[0]).toBe(5)
  })

  it('increments', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current[1].increment()
    })

    expect(result.current[0]).toBe(1)
  })

  it('decrements', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current[1].decrement()
    })

    expect(result.current[0]).toBe(4)
  })

  it('resets', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current[1].increment()
      result.current[1].reset()
    })

    expect(result.current[0]).toBe(5)
  })
})

describe('useToggle', () => {
  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false))

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(true)
  })

  it('sets true', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current[1].setTrue()
    })

    expect(result.current[0]).toBe(true)
  })

  it('sets false', () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current[1].setFalse()
    })

    expect(result.current[0]).toBe(false)
  })
})
*/

// Export commented examples as documentation
export const stateTestingExamples = {
  context: '/* See context testing examples above */',
  xstate: '/* See XState testing examples above */',
  zustand: '/* See Zustand testing examples above */',
  jotai: '/* See Jotai testing examples above */',
  customHooks: '/* See custom hooks testing examples above */',
}
