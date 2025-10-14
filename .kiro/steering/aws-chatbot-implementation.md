# AWS Chatbot Implementation Guidelines

## Core Implementation Principles

### AWS SDK Integration

- Use AWS SDK v3 (`@aws-sdk/client-bedrock-agent-runtime`) for all Bedrock interactions
- Implement proper credential management through environment variables
- Handle streaming responses using the native event-stream capabilities
- Always include proper error handling for AWS API calls

### Vue 3 Composition API Standards

- Use `<script setup>` syntax for all new components
- Leverage reactive refs and computed properties appropriately
- Implement proper lifecycle management with onMounted/onUnmounted
- Follow Vue 3 best practices for component composition

### State Management with Pinia

- Centralize chat state in a dedicated Pinia store
- Use actions for all state mutations
- Implement proper TypeScript typing for store state
- Handle async operations within store actions

### Streaming Implementation

- Process streaming responses incrementally for real-time updates
- Implement proper stream error handling and recovery
- Use reactive state updates to reflect streaming progress
- Ensure UI remains responsive during streaming operations

## Code Quality Standards

### TypeScript Usage

- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Implement comprehensive type safety for AWS SDK interactions
- Use generic types where appropriate for reusability

### Testing Requirements

- Write unit tests for all components using Vitest
- Mock AWS SDK calls in tests for reliability
- Implement E2E tests for complete user flows using Playwright
- Achieve comprehensive test coverage for critical paths

### Error Handling Patterns

- Implement graceful error handling at all levels
- Provide user-friendly error messages
- Include retry mechanisms for transient failures
- Log errors appropriately without exposing sensitive data

## Component Architecture

### Component Hierarchy

```
ChatContainer (main container)
├── MessageList (scrollable message history)
│   └── MessageItem (individual messages)
└── MessageInput (user input interface)
```

### Component Responsibilities

- **ChatContainer**: Layout management, error boundaries, store integration
- **MessageList**: Message rendering, auto-scroll, virtual scrolling for performance
- **MessageItem**: Message display, streaming animations, user/agent differentiation
- **MessageInput**: Input validation, submission handling, keyboard shortcuts

## AWS Bedrock Integration

### Service Layer Structure

- Create dedicated AWS service class for Bedrock operations
- Implement proper session management for conversations
- Handle streaming response parsing and error scenarios
- Use environment variables for configuration (region, agent IDs)

### Streaming Response Handling

- Detect `text/event-stream` content type
- Process chunks incrementally using UTF-8 decoding
- Update UI state reactively as chunks arrive
- Handle stream completion and error scenarios gracefully

## Performance Considerations

### Optimization Strategies

- Implement virtual scrolling for large message histories
- Use debounced input handling to prevent excessive API calls
- Optimize DOM updates during streaming to prevent flickering
- Implement proper memory management for long conversations

### Responsive Design

- Use CoreUI responsive utilities for layout adaptation
- Implement mobile-first design approach
- Ensure touch-friendly interfaces for mobile devices
- Test across different screen sizes and orientations

## Development Workflow Integration

### Code Quality Checks

- Run `yarn lint` before committing changes
- Use `yarn format` to maintain consistent code style
- Execute `yarn type-check:all` for comprehensive validation
- Ensure all tests pass with `yarn test:unit` and `yarn test:e2e`

### Development Process

- Use `yarn dev` for hot-reload development
- Test production builds with `yarn build` and `yarn preview`
- Follow incremental development approach as outlined in tasks
- Maintain backward compatibility during implementation

## Security Best Practices

### Credential Management

- Store AWS credentials in environment variables only
- Never commit sensitive configuration to version control
- Implement proper session management for user conversations
- Sanitize all user inputs before processing

### Data Handling

- Validate all incoming data from AWS responses
- Sanitize error messages to prevent information leakage
- Implement proper CORS handling if needed
- Use HTTPS for all external communications

## Accessibility Requirements

### ARIA Implementation

- Provide proper ARIA labels for chat messages
- Implement screen reader announcements for new messages
- Ensure keyboard navigation works throughout the interface
- Use semantic HTML elements where appropriate

### User Experience

- Provide clear visual indicators for streaming states
- Implement proper focus management during interactions
- Ensure sufficient color contrast for all text elements
- Support keyboard shortcuts for common actions
