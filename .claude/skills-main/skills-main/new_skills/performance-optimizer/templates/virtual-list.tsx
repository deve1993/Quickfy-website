import { FixedSizeList, VariableSizeList, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { memo, CSSProperties } from 'react'

// Item types
interface ListItem {
  id: string
  title: string
  description?: string
}

// ============= PATTERN 1: Fixed Size Virtual List =============
// Use when all items have the same height

interface FixedVirtualListProps {
  items: ListItem[]
  itemHeight: number
  onItemClick?: (item: ListItem) => void
}

// Memoized row component for performance
const FixedRow = memo(
  ({
    index,
    style,
    data,
  }: ListChildComponentProps<{
    items: ListItem[]
    onItemClick?: (item: ListItem) => void
  }>) => {
    const item = data.items[index]

    return (
      <div
        style={style}
        className="virtual-list-item"
        onClick={() => data.onItemClick?.(item)}
      >
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
    )
  }
)

FixedRow.displayName = 'FixedRow'

export function FixedVirtualList({
  items,
  itemHeight,
  onItemClick,
}: FixedVirtualListProps) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={itemHeight}
          itemData={{ items, onItemClick }}
          overscanCount={5} // Render 5 extra items for smooth scrolling
        >
          {FixedRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

// ============= PATTERN 2: Variable Size Virtual List =============
// Use when items have different heights

interface VariableVirtualListProps {
  items: ListItem[]
  getItemHeight: (index: number) => number
  onItemClick?: (item: ListItem) => void
}

const VariableRow = memo(
  ({
    index,
    style,
    data,
  }: ListChildComponentProps<{
    items: ListItem[]
    onItemClick?: (item: ListItem) => void
  }>) => {
    const item = data.items[index]

    return (
      <div
        style={style}
        className="virtual-list-item variable"
        onClick={() => data.onItemClick?.(item)}
      >
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
    )
  }
)

VariableRow.displayName = 'VariableRow'

export function VariableVirtualList({
  items,
  getItemHeight,
  onItemClick,
}: VariableVirtualListProps) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={getItemHeight}
          itemData={{ items, onItemClick }}
          overscanCount={5}
          estimatedItemSize={100} // Helps with scroll position calculations
        >
          {VariableRow}
        </VariableSizeList>
      )}
    </AutoSizer>
  )
}

// ============= PATTERN 3: Infinite Scroll Virtual List =============
// Combine with React Query for infinite loading

interface InfiniteVirtualListProps {
  items: ListItem[]
  itemHeight: number
  hasMore: boolean
  isLoading: boolean
  onLoadMore: () => void
  onItemClick?: (item: ListItem) => void
}

const InfiniteRow = memo(
  ({
    index,
    style,
    data,
  }: ListChildComponentProps<{
    items: ListItem[]
    hasMore: boolean
    isLoading: boolean
    onLoadMore: () => void
    onItemClick?: (item: ListItem) => void
  }>) => {
    const item = data.items[index]

    // Trigger load more when reaching near the end
    if (index === data.items.length - 10 && data.hasMore && !data.isLoading) {
      data.onLoadMore()
    }

    // Show loading indicator at the end
    if (index === data.items.length && data.isLoading) {
      return (
        <div style={style} className="virtual-list-loading">
          Loading more...
        </div>
      )
    }

    if (!item) return null

    return (
      <div
        style={style}
        className="virtual-list-item"
        onClick={() => data.onItemClick?.(item)}
      >
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
    )
  }
)

InfiniteRow.displayName = 'InfiniteRow'

export function InfiniteVirtualList({
  items,
  itemHeight,
  hasMore,
  isLoading,
  onLoadMore,
  onItemClick,
}: InfiniteVirtualListProps) {
  // Add loading row to item count
  const itemCount = hasMore ? items.length + 1 : items.length

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={itemCount}
          itemSize={itemHeight}
          itemData={{ items, hasMore, isLoading, onLoadMore, onItemClick }}
          overscanCount={10}
        >
          {InfiniteRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

// ============= PATTERN 4: Grid Virtual List =============
// Use for grid layouts (like photo galleries)

interface GridItem {
  id: string
  imageUrl: string
  title: string
}

interface VirtualGridProps {
  items: GridItem[]
  columnCount: number
  rowHeight: number
  onItemClick?: (item: GridItem) => void
}

const GridRow = memo(
  ({
    index,
    style,
    data,
  }: ListChildComponentProps<{
    items: GridItem[]
    columnCount: number
    onItemClick?: (item: GridItem) => void
  }>) => {
    const { items, columnCount, onItemClick } = data
    const startIndex = index * columnCount
    const rowItems = items.slice(startIndex, startIndex + columnCount)

    return (
      <div style={style} className="virtual-grid-row">
        {rowItems.map((item) => (
          <div
            key={item.id}
            className="virtual-grid-item"
            onClick={() => onItemClick?.(item)}
          >
            <img src={item.imageUrl} alt={item.title} loading="lazy" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    )
  }
)

GridRow.displayName = 'GridRow'

export function VirtualGrid({
  items,
  columnCount,
  rowHeight,
  onItemClick,
}: VirtualGridProps) {
  const rowCount = Math.ceil(items.length / columnCount)

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={rowCount}
          itemSize={rowHeight}
          itemData={{ items, columnCount, onItemClick }}
          overscanCount={3}
        >
          {GridRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

// Styles
export const virtualListStyles = `
.virtual-list-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.virtual-list-item:hover {
  background-color: #f5f5f5;
}

.virtual-list-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.virtual-list-item p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

.virtual-list-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #666;
}

.virtual-grid-row {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.virtual-grid-item {
  flex: 1;
  cursor: pointer;
  transition: transform 0.2s;
}

.virtual-grid-item:hover {
  transform: scale(1.05);
}

.virtual-grid-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.virtual-grid-item p {
  margin: 0.5rem 0 0 0;
  text-align: center;
  font-size: 0.875rem;
}
`
