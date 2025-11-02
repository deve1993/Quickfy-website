// Custom hook patterns for state management
import { useState, useEffect, useCallback, useRef, useReducer } from 'react'

// ============================================
// useLocalStorage - Persist state in localStorage
// ============================================

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

// ============================================
// useAsync - Handle async operations
// ============================================

interface UseAsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  dependencies: any[] = []
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(() => {
    setState({ data: null, loading: true, error: null })

    return asyncFunction()
      .then((data) => {
        setState({ data, loading: false, error: null })
        return data
      })
      .catch((error) => {
        setState({ data: null, loading: false, error })
        throw error
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate, ...dependencies])

  return { ...state, execute }
}

// ============================================
// useDebounce - Debounce value changes
// ============================================

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ============================================
// useThrottle - Throttle value changes
// ============================================

export function useThrottle<T>(value: T, limit: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = Date.now()
        }
      },
      limit - (Date.now() - lastRan.current)
    )

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// ============================================
// usePrevious - Get previous value
// ============================================

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// ============================================
// useToggle - Toggle boolean state
// ============================================

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((v) => !v)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, { toggle, setTrue, setFalse, setValue }] as const
}

// ============================================
// useCounter - Counter with increment/decrement
// ============================================

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const set = useCallback((value: number) => setCount(value), [])

  return [count, { increment, decrement, reset, set }] as const
}

// ============================================
// useArray - Array state helpers
// ============================================

export function useArray<T>(initialValue: T[] = []) {
  const [array, setArray] = useState(initialValue)

  const push = useCallback((element: T) => {
    setArray((a) => [...a, element])
  }, [])

  const remove = useCallback((index: number) => {
    setArray((a) => a.filter((_, i) => i !== index))
  }, [])

  const update = useCallback((index: number, newElement: T) => {
    setArray((a) => a.map((el, i) => (i === index ? newElement : el)))
  }, [])

  const clear = useCallback(() => {
    setArray([])
  }, [])

  const filter = useCallback((callback: (value: T) => boolean) => {
    setArray((a) => a.filter(callback))
  }, [])

  return [array, { push, remove, update, clear, filter, set: setArray }] as const
}

// ============================================
// useUndo - Undo/redo functionality
// ============================================

export function useUndo<T>(initialValue: T) {
  const [state, setState] = useReducer(
    (
      state: {
        past: T[]
        present: T
        future: T[]
      },
      action: { type: 'UNDO' | 'REDO' | 'SET'; value?: T }
    ) => {
      switch (action.type) {
        case 'UNDO': {
          if (state.past.length === 0) return state

          const previous = state.past[state.past.length - 1]
          const newPast = state.past.slice(0, state.past.length - 1)

          return {
            past: newPast,
            present: previous,
            future: [state.present, ...state.future],
          }
        }

        case 'REDO': {
          if (state.future.length === 0) return state

          const next = state.future[0]
          const newFuture = state.future.slice(1)

          return {
            past: [...state.past, state.present],
            present: next,
            future: newFuture,
          }
        }

        case 'SET': {
          if (action.value === state.present) return state

          return {
            past: [...state.past, state.present],
            present: action.value!,
            future: [],
          }
        }

        default:
          return state
      }
    },
    {
      past: [],
      present: initialValue,
      future: [],
    }
  )

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  const undo = useCallback(() => {
    setState({ type: 'UNDO' })
  }, [])

  const redo = useCallback(() => {
    setState({ type: 'REDO' })
  }, [])

  const set = useCallback((value: T) => {
    setState({ type: 'SET', value })
  }, [])

  const reset = useCallback(() => {
    set(initialValue)
  }, [initialValue, set])

  return [state.present, { undo, redo, set, reset, canUndo, canRedo }] as const
}

// ============================================
// useMediaQuery - Match media queries
// ============================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// ============================================
// useWindowSize - Track window dimensions
// ============================================

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// ============================================
// useOnClickOutside - Detect clicks outside element
// ============================================

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return ref
}

// ============================================
// useInterval - setInterval with hooks
// ============================================

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// ============================================
// Usage Examples
// ============================================

/*
// useLocalStorage
const [name, setName] = useLocalStorage('name', 'John')

// useAsync
const { data, loading, error, execute } = useAsync(() =>
  fetch('/api/user').then(res => res.json())
)

// useDebounce
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearchTerm = useDebounce(searchTerm, 500)

// useToggle
const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false)

// useCounter
const [count, { increment, decrement, reset }] = useCounter(0)

// useArray
const [items, { push, remove, clear }] = useArray([1, 2, 3])

// useUndo
const [value, { undo, redo, set, canUndo, canRedo }] = useUndo('initial')

// useMediaQuery
const isMobile = useMediaQuery('(max-width: 768px)')

// useWindowSize
const { width, height } = useWindowSize()

// useOnClickOutside
const ref = useOnClickOutside<HTMLDivElement>(() => {
  console.log('Clicked outside')
})

// useInterval
useInterval(() => {
  console.log('Every second')
}, 1000)
*/
