/**
 * Utility types for the chat application
 */

// Generic result type for operations that can fail
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }

// Async result type
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

// Optional with default
export type WithDefault<T, D> = T extends undefined ? D : T

// Deep partial type
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Required fields type
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Omit multiple keys
export type OmitMultiple<T, K extends keyof T> = Omit<T, K>

// Pick multiple keys
export type PickMultiple<T, K extends keyof T> = Pick<T, K>

// Nullable type
export type Nullable<T> = T | null

// Optional nullable type
export type OptionalNullable<T> = T | null | undefined

// Event handler type
export type EventHandler<T = void> = (event: T) => void | Promise<void>

// Async event handler type
export type AsyncEventHandler<T = void> = (event: T) => Promise<void>

// Debounced function type
export type DebouncedFunction<T extends (...args: any[]) => any> = T & {
    cancel: () => void
    flush: () => void
}

// Throttled function type
export type ThrottledFunction<T extends (...args: any[]) => any> = T & {
    cancel: () => void
}

// Validation result type
export interface ValidationResult {
    isValid: boolean
    errors: string[]
    warnings?: string[]
}

// Retry configuration
export interface RetryConfig {
    maxAttempts: number
    baseDelay: number
    maxDelay: number
    backoffMultiplier: number
    retryableErrors: string[]
}

// Timeout configuration
export interface TimeoutConfig {
    connection: number
    request: number
    streaming: number
}

// Performance metrics
export interface PerformanceMetrics {
    startTime: number
    endTime?: number
    duration?: number
    memoryUsage?: number
    networkLatency?: number
}

// Component props base type
export interface BaseComponentProps {
    id?: string
    className?: string
    testId?: string
}

// Loading state type
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Generic state with loading
export interface StateWithLoading<T> {
    data: T | null
    loading: LoadingState
    error: string | null
}

// Pagination type
export interface Pagination {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrevious: boolean
}

// Sort configuration
export interface SortConfig<T> {
    field: keyof T
    direction: 'asc' | 'desc'
}

// Filter configuration
export interface FilterConfig<T> {
    field: keyof T
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan'
    value: unknown
}
