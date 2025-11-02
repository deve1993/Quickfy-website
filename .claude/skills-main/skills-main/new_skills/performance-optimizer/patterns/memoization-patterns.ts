import { memo, useMemo, useCallback, useRef, useEffect } from 'react'

/**
 * PATTERN 1: React.memo with Custom Comparison
 *
 * Use when props are objects/arrays that need deep comparison
 */

interface UserCardProps {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  onEdit: (id: string) => void
}

// Shallow comparison (default)
export const UserCardShallow = memo(({ user, onEdit }: UserCardProps) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
})

// Deep comparison for specific props
export const UserCardDeep = memo(
  ({ user, onEdit }: UserCardProps) => {
    return (
      <div className="user-card">
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Only re-render if user ID or name changes
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    )
  }
)

/**
 * PATTERN 2: useMemo for Expensive Calculations
 *
 * Cache expensive computations that depend on specific values
 */

interface DataTableProps {
  data: Array<{ id: string; name: string; value: number; category: string }>
  searchQuery: string
  sortBy: 'name' | 'value'
  filterCategory?: string
}

export function DataTable({
  data,
  searchQuery,
  sortBy,
  filterCategory,
}: DataTableProps) {
  // Memoize filtered and sorted data
  const processedData = useMemo(() => {
    console.log('Processing data...')

    // Filter by search query
    let result = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Filter by category
    if (filterCategory) {
      result = result.filter((item) => item.category === filterCategory)
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return a.value - b.value
    })

    return result
  }, [data, searchQuery, sortBy, filterCategory])

  // Memoize statistics
  const statistics = useMemo(() => {
    console.log('Calculating statistics...')
    return {
      total: processedData.length,
      sum: processedData.reduce((acc, item) => acc + item.value, 0),
      average:
        processedData.reduce((acc, item) => acc + item.value, 0) /
        processedData.length,
    }
  }, [processedData])

  return (
    <div>
      <div className="stats">
        <p>Total: {statistics.total}</p>
        <p>Sum: {statistics.sum}</p>
        <p>Average: {statistics.average.toFixed(2)}</p>
      </div>
      <table>
        {processedData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

/**
 * PATTERN 3: useCallback for Stable Function References
 *
 * Prevent child re-renders by memoizing callback functions
 */

interface TodoListProps {
  todos: Array<{ id: string; title: string; completed: boolean }>
}

export function TodoList({ todos }: TodoListProps) {
  // ❌ BAD - Creates new function on every render
  const handleToggleBad = (id: string) => {
    console.log('Toggle', id)
    // API call
  }

  // ✅ GOOD - Stable function reference
  const handleToggle = useCallback((id: string) => {
    console.log('Toggle', id)
    // API call
  }, []) // Empty deps = function never changes

  const handleDelete = useCallback(
    (id: string) => {
      console.log('Delete', id)
      // API call that might depend on todos
    },
    [todos] // Re-create if todos change
  )

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

// Memoized child component
const TodoItem = memo(
  ({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: { id: string; title: string; completed: boolean }
    onToggle: (id: string) => void
    onDelete: (id: string) => void
  }) => {
    console.log('Rendering TodoItem', todo.id)
    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.title}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    )
  }
)

/**
 * PATTERN 4: Memoization with Complex Dependencies
 *
 * Handle objects/arrays as dependencies correctly
 */

interface ChartProps {
  data: number[]
  config: {
    color: string
    showGrid: boolean
    animate: boolean
  }
}

export function Chart({ data, config }: ChartProps) {
  // ❌ BAD - config object reference changes every render
  const chartData = useMemo(() => {
    return processChartData(data, config)
  }, [data, config]) // config is a new object each time

  // ✅ GOOD - Destructure config properties
  const { color, showGrid, animate } = config
  const chartDataGood = useMemo(() => {
    return processChartData(data, { color, showGrid, animate })
  }, [data, color, showGrid, animate])

  // ✅ BETTER - Use JSON.stringify for deep comparison (use sparingly)
  const configString = JSON.stringify(config)
  const chartDataBetter = useMemo(() => {
    return processChartData(data, config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, configString])

  return <div>{/* Render chart */}</div>
}

function processChartData(data: number[], config: any) {
  // Expensive processing
  return data
}

/**
 * PATTERN 5: Custom useMemoCompare Hook
 *
 * Deep comparison for objects/arrays
 */

function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useMemoCompare<T>(
  next: T,
  compare: (prev: T | undefined, next: T) => boolean
): T {
  const previousRef = useRef<T>()
  const previous = previousRef.current

  const isEqual = compare(previous, next)

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next
    }
  })

  return isEqual && previous !== undefined ? previous : next
}

// Usage
export function UserProfile({ user }: { user: any }) {
  const userMemo = useMemoCompare(user, (prev, next) => {
    return prev?.id === next.id && prev?.name === next.name
  })

  const profile = useMemo(() => {
    return generateProfile(userMemo)
  }, [userMemo])

  return <div>{/* Render profile */}</div>
}

function generateProfile(user: any) {
  return user
}

/**
 * PATTERN 6: Memoize Expensive Component Trees
 *
 * Use memo for entire component subtrees that rarely change
 */

interface SidebarProps {
  items: Array<{ id: string; label: string; icon: string }>
  activeId: string
  onItemClick: (id: string) => void
}

export const Sidebar = memo(
  ({ items, activeId, onItemClick }: SidebarProps) => {
    return (
      <nav>
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onClick={onItemClick}
          />
        ))}
      </nav>
    )
  },
  (prev, next) => {
    // Only re-render if activeId changes or items length changes
    return (
      prev.activeId === next.activeId && prev.items.length === next.items.length
    )
  }
)

const SidebarItem = memo(
  ({
    item,
    isActive,
    onClick,
  }: {
    item: { id: string; label: string; icon: string }
    isActive: boolean
    onClick: (id: string) => void
  }) => {
    return (
      <button
        className={isActive ? 'active' : ''}
        onClick={() => onClick(item.id)}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </button>
    )
  }
)

/**
 * PATTERN 7: Avoid Premature Memoization
 *
 * Only memoize when necessary - profile first!
 */

// ❌ Over-optimization - simple component doesn't need memo
export const SimpleButton = memo(({ label }: { label: string }) => {
  return <button>{label}</button>
})

// ✅ Good - expensive component benefits from memo
export const ExpensiveChart = memo(({ data }: { data: number[] }) => {
  // Expensive rendering logic
  const processedData = data.map((n) => n * 2) // Just an example
  return <div>{/* Complex chart rendering */}</div>
})
