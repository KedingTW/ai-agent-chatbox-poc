# Project Structure

## Root Directory Organization

```
ai-agent-chatbox-poc/
├── .kiro/                  # Kiro AI assistant configuration
├── amplify/               # AWS Amplify backend configuration
├── docs/                  # Project documentation and requirements
├── e2e/                   # End-to-end tests (Playwright)
├── public/                # Static assets served directly
├── src/                   # Main application source code
└── logs/                  # Application and MCP logs
```

## Source Code Structure (`src/`)

```
src/
├── assets/                # Static resources (CSS, images, fonts)
├── components/            # Reusable Vue components
│   ├── __tests__/         # Component unit tests
│   └── icons/             # Icon components
├── config/                # Configuration files (AWS, app settings)
├── layouts/               # Page layout components
├── router/                # Vue Router configuration
├── services/              # External service integrations (AWS, APIs)
├── stores/                # Pinia state management stores
├── types/                 # TypeScript type definitions
├── views/                 # Page-level Vue components
├── App.vue               # Root Vue component
└── main.ts               # Application entry point
```

## Key Architectural Patterns

### Component Organization

- **Components**: Small, reusable UI elements in `src/components/`
- **Views**: Page-level components in `src/views/`
- **Layouts**: Wrapper components for common page structures in `src/layouts/`

### Service Layer

- **AWS Services**: Located in `src/services/` (e.g., `aws-bedrock.ts`)
- **Configuration**: Centralized in `src/config/` for environment and AWS settings
- **Types**: Shared TypeScript interfaces and types in `src/types/`

### State Management

- **Pinia Stores**: Located in `src/stores/` for application state
- **Reactive Data**: Use Vue 3 Composition API patterns

### File Naming Conventions

- **Vue Components**: PascalCase (e.g., `HelloWorld.vue`, `UserProfile.vue`)
- **TypeScript Files**: kebab-case (e.g., `aws-bedrock.ts`, `user-service.ts`)
- **Directories**: kebab-case (e.g., `components/`, `user-profile/`)
- **Test Files**: Match source file with `.test.ts` or `.spec.ts` suffix

### Import Aliases

- Use `@/` alias for `src/` directory imports
- Example: `import { AWSBedrockService } from '@/services/aws-bedrock'`

### Configuration Files

- **Environment**: `.env` for local development variables
- **TypeScript**: Multiple `tsconfig.*.json` files for different contexts
- **Build**: `vite.config.ts` for Vite configuration
- **Testing**: `vitest.config.ts` and `playwright.config.ts`
