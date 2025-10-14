/**
 * AWS Bedrock Agent Runtime types and interfaces
 */

export interface AWSConfig {
    region: string
    agentArn: string
    sessionId: string
}

export interface Message {
    id: string
    content: string
    sender: 'user' | 'agent'
    timestamp: Date
    isStreaming?: boolean
    isComplete?: boolean
}

export interface ChatState {
    messages: Message[]
    isStreaming: boolean
    currentStreamingMessageId: string | null
    error: string | null
    isConnected: boolean
}

export interface StreamingChunk {
    content: string
    isComplete: boolean
}

export interface AWSError {
    code: string
    message: string
    statusCode?: number
}

export type MessageSender = 'user' | 'agent'

export interface BedrockStreamEvent {
    chunk?: {
        bytes?: Uint8Array
    }
    messageStart?: {
        role: string
    }
    messageStop?: {
        stopReason: string
    }
    contentBlockStart?: {
        start: {
            toolUse?: {
                toolUseId: string
                name: string
            }
        }
    }
    contentBlockDelta?: {
        delta: {
            text?: string
            toolUse?: {
                input: string
            }
        }
    }
    contentBlockStop?: {
        contentBlockIndex: number
    }
}

// Streaming state types
export type StreamingState = 'idle' | 'connecting' | 'streaming' | 'complete' | 'error'

export interface StreamingStatus {
    state: StreamingState
    messageId: string | null
    progress: number // 0-100 percentage
    error: AWSError | null
}

// Error handling utility types
export type ErrorType =
    | 'network'
    | 'authentication'
    | 'api'
    | 'streaming'
    | 'validation'
    | 'unknown'

export interface ErrorContext {
    type: ErrorType
    code: string
    message: string
    details?: Record<string, unknown>
    timestamp: Date
    retryable: boolean
}

// Message utility types
export interface MessageMetadata {
    id: string
    timestamp: Date
    sender: MessageSender
    sessionId: string
    retryCount?: number
    streamingDuration?: number
}

export interface UserMessage extends Message {
    sender: 'user'
    isStreaming: false
    isComplete: true
}

export interface AgentMessage extends Message {
    sender: 'agent'
    isStreaming?: boolean
    isComplete?: boolean
    streamingProgress?: number
}

// Chat session types
export interface ChatSession {
    id: string
    startTime: Date
    lastActivity: Date
    messageCount: number
    isActive: boolean
}

// Configuration validation types
export interface ConfigValidation {
    isValid: boolean
    errors: string[]
    warnings: string[]
}

// API response types
export interface SendMessageResponse {
    success: boolean
    messageId: string
    error?: ErrorContext
    response?: string
    sessionId?: string
    duration?: number
    streamingResponse?: any // Will be properly typed in task 4.3
}

export interface StreamResponse {
    messageId: string
    content: string
    isComplete: boolean
    error?: AWSError
}

// Utility type guards
export type MessageType = UserMessage | AgentMessage

// Event types for component communication
export interface ChatEvent {
    type:
        | 'message-sent'
        | 'message-received'
        | 'streaming-started'
        | 'streaming-ended'
        | 'error-occurred'
    payload: unknown
    timestamp: Date
}

// Connection status
export interface ConnectionStatus {
    isConnected: boolean
    lastConnected: Date | null
    connectionAttempts: number
    latency: number | null
}
