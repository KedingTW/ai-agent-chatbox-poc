/**
 * Component-specific types and interfaces
 */

import type { Message, MessageSender, StreamingState, ErrorContext } from './aws'
import type { BaseComponentProps, EventHandler } from './utils'

// Message component props
export interface MessageItemProps extends BaseComponentProps {
    message: Message
    isStreaming?: boolean
    showTimestamp?: boolean
    showAvatar?: boolean
    onRetry?: EventHandler<string>
}

// Message list component props
export interface MessageListProps extends BaseComponentProps {
    messages: Message[]
    isStreaming?: boolean
    autoScroll?: boolean
    maxHeight?: string
}

// Message input component props
export interface MessageInputProps extends BaseComponentProps {
    disabled?: boolean
    placeholder?: string
    maxLength?: number
    multiline?: boolean
}

// Chat container component props
export interface ChatContainerProps extends BaseComponentProps {
    title?: string
    showHeader?: boolean
    height?: string
    width?: string
}

// Streaming indicator props
export interface StreamingIndicatorProps extends BaseComponentProps {
    isVisible: boolean
    message?: string
    progress?: number
}

// Error display props
export interface ErrorDisplayProps extends BaseComponentProps {
    error: ErrorContext | null
    onRetry?: EventHandler<void>
    onDismiss?: EventHandler<void>
    showDetails?: boolean
}

// Chat header props
export interface ChatHeaderProps extends BaseComponentProps {
    title: string
    subtitle?: string
    isConnected: boolean
    onClear?: EventHandler<void>
    onSettings?: EventHandler<void>
}

// Message bubble styling
export interface MessageBubbleStyle {
    backgroundColor: string
    textColor: string
    borderRadius: string
    padding: string
    maxWidth: string
    alignment: 'left' | 'right'
}

// Theme configuration for chat components
export interface ChatTheme {
    userMessage: MessageBubbleStyle
    agentMessage: MessageBubbleStyle
    background: string
    inputBackground: string
    borderColor: string
    textColor: string
    timestampColor: string
    errorColor: string
    successColor: string
    streamingColor: string
}

// Component event types
export interface MessageEvent {
    type: 'send' | 'retry' | 'delete'
    messageId: string
    content?: string
}

export interface StreamingEvent {
    type: 'start' | 'chunk' | 'end' | 'error'
    messageId: string
    content?: string
    progress?: number
    error?: ErrorContext
}

export interface UIEvent {
    type: 'scroll' | 'resize' | 'focus' | 'blur'
    target: string
    data?: unknown
}

// Responsive breakpoints
export interface ResponsiveBreakpoints {
    mobile: number
    tablet: number
    desktop: number
    wide: number
}

// Component size variants
export type ComponentSize = 'small' | 'medium' | 'large'

// Component variants
export type ComponentVariant = 'default' | 'compact' | 'expanded'

// Layout configuration
export interface LayoutConfig {
    headerHeight: string
    footerHeight: string
    sidebarWidth: string
    messageSpacing: string
    containerPadding: string
}
