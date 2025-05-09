// This lets you use `meta.filterVariant` inside your column definitions
import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    filterVariant?: 'text' | 'select' | 'range'
    options?: string[] // for select filter only
  }
}
