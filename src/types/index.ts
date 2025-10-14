/**
 * Central export for all type definitions
 */

// AWS and core types
export type {
    AWSConfig,
    Message,
    ChatState,
    StreamingChunk,
    AWSError,
    MessageSender,
    BedrockStreamEvent,
    StreamingState,
    StreamingStatus,
    ErrorType,
    ErrorContext,
    MessageMetadata,
    UserMessage,
    AgentMessage,
    ChatSession,
    ConfigValidation,
    SendMessageResponse,
    StreamResponse,
    MessageType,
    ChatEvent,
    ConnectionStatus,
} from './aws'

// Utility types
export type {
    Result,
    AsyncResult,
    WithDefault,
    DeepPartial,
    RequiredFields,
    OmitMultiple,
    PickMultiple,
    Nullable,
    OptionalNullable,
    EventHandler,
    AsyncEventHandler,
    DebouncedFunction,
    ThrottledFunction,
    ValidationResult,
    RetryConfig,
    TimeoutConfig,
    PerformanceMetrics,
    BaseComponentProps,
    LoadingState,
    StateWithLoading,
    Pagination,
    SortConfig,
    FilterConfig,
} from './utils'

// Component types
export type {
    MessageItemProps,
    MessageListProps,
    MessageInputProps,
    ChatContainerProps,
    StreamingIndicatorProps,
    ErrorDisplayProps,
    ChatHeaderProps,
    MessageBubbleStyle,
    ChatTheme,
    MessageEvent,
    StreamingEvent,
    UIEvent,
    ResponsiveBreakpoints,
    ComponentSize,
    ComponentVariant,
    LayoutConfig,
} from './components'

// Type guards and validation utilities
export {
    isUserMessage,
    isAgentMessage,
    isStreamingMessage,
    isCompleteMessage,
    isAWSError,
    isErrorContext,
    isStreamingChunk,
    isBedrockStreamEvent,
    isValidAWSConfig,
    isActiveChatSession,
    validateMessage,
    validateMessageContent,
    validateSessionId,
    isValidUrl,
    isValidEmail,
    isValidUUID,
    classifyError,
    isRetryableError,
    sanitizeMessageContent,
    assertIsMessage,
    assertIsAWSConfig,
} from './guards'

// Re-export commonly used types with aliases for convenience
export type {
    Message as ChatMessage,
    MessageSender as Sender,
    StreamingState as StreamState,
    ErrorContext as ChatError,
} from './aws'

export type { EventHandler as Handler } from './utils'
