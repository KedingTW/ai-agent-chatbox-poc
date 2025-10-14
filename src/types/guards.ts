/**
 * Type guards and validation utilities
 */

import type {
    Message,
    UserMessage,
    AgentMessage,
    AWSError,
    ErrorContext,
    StreamingChunk,
    BedrockStreamEvent,
    ChatSession,
    AWSConfig,
} from './aws'

// Message type guards
export function isUserMessage(message: Message): message is UserMessage {
    return message.sender === 'user'
}

export function isAgentMessage(message: Message): message is AgentMessage {
    return message.sender === 'agent'
}

export function isStreamingMessage(message: Message): boolean {
    return message.isStreaming === true
}

export function isCompleteMessage(message: Message): boolean {
    return message.isComplete === true
}

// Error type guards
export function isAWSError(error: unknown): error is AWSError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error &&
        typeof (error as AWSError).code === 'string' &&
        typeof (error as AWSError).message === 'string'
    )
}

export function isErrorContext(error: unknown): error is ErrorContext {
    return (
        typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        'code' in error &&
        'message' in error &&
        'timestamp' in error &&
        'retryable' in error
    )
}

// Streaming type guards
export function isStreamingChunk(chunk: unknown): chunk is StreamingChunk {
    return (
        typeof chunk === 'object' &&
        chunk !== null &&
        'content' in chunk &&
        'isComplete' in chunk &&
        typeof (chunk as StreamingChunk).content === 'string' &&
        typeof (chunk as StreamingChunk).isComplete === 'boolean'
    )
}

export function isBedrockStreamEvent(event: unknown): event is BedrockStreamEvent {
    return (
        typeof event === 'object' &&
        event !== null &&
        ('chunk' in event ||
            'messageStart' in event ||
            'messageStop' in event ||
            'contentBlockStart' in event ||
            'contentBlockDelta' in event ||
            'contentBlockStop' in event)
    )
}

// Configuration type guards
export function isValidAWSConfig(config: unknown): config is AWSConfig {
    return (
        typeof config === 'object' &&
        config !== null &&
        'region' in config &&
        'agentArn' in config &&
        'sessionId' in config &&
        typeof (config as AWSConfig).region === 'string' &&
        typeof (config as AWSConfig).agentArn === 'string' &&
        typeof (config as AWSConfig).sessionId === 'string' &&
        (config as AWSConfig).region.length > 0 &&
        (config as AWSConfig).agentArn.length > 0 &&
        (config as AWSConfig).sessionId.length > 0
    )
}

// Session type guards
export function isActiveChatSession(session: ChatSession): boolean {
    return session.isActive && session.messageCount > 0
}

// Validation functions
export function validateMessage(message: Partial<Message>): message is Message {
    return !!(
        message.id &&
        message.content !== undefined &&
        message.sender &&
        message.timestamp &&
        typeof message.id === 'string' &&
        typeof message.content === 'string' &&
        (message.sender === 'user' || message.sender === 'agent') &&
        message.timestamp instanceof Date &&
        // Allow empty content for streaming messages
        (message.content.length > 0 || message.isStreaming === true)
    )
}

export function validateMessageContent(content: string): boolean {
    return typeof content === 'string' && content.trim().length > 0 && content.length <= 4000
}

export function validateSessionId(sessionId: string): boolean {
    return typeof sessionId === 'string' && sessionId.length >= 33 && sessionId.length <= 100
}

// Utility validation functions
export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
}

// Error classification
export function classifyError(error: unknown): ErrorContext['type'] {
    if (isAWSError(error)) {
        if (error.code.includes('Auth') || error.code.includes('Credential')) {
            return 'authentication'
        }
        if (error.code.includes('Network') || error.code.includes('Connection')) {
            return 'network'
        }
        if (error.code.includes('Stream')) {
            return 'streaming'
        }
        return 'api'
    }

    if (error instanceof TypeError || error instanceof SyntaxError) {
        return 'validation'
    }

    return 'unknown'
}

// Retry determination
export function isRetryableError(error: ErrorContext): boolean {
    return error.retryable && ['network', 'api', 'streaming'].includes(error.type)
}

// Content validation
export function sanitizeMessageContent(content: string): string {
    return content
        .trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .slice(0, 4000) // Limit length
}

// Type assertion helpers
export function assertIsMessage(value: unknown): asserts value is Message {
    if (!validateMessage(value as Partial<Message>)) {
        throw new Error('Invalid message object')
    }
}

export function assertIsAWSConfig(value: unknown): asserts value is AWSConfig {
    if (!isValidAWSConfig(value)) {
        throw new Error('Invalid AWS configuration')
    }
}
