<template>
    <div id="app">
        <div class="app-container">
            <div class="chat-wrapper">
                <ChatContainer title="CRM AI代理" :show-header="true" height="100dvh" width="100dvw" />
            </div>
        </div>

        <div v-if="globalError" class="global-error-overlay" role="alert" aria-live="assertive">
            <div class="global-error-content">
                <div class="global-error-icon">⚠️</div>
                <h2 class="global-error-title">Application Error</h2>
                <p class="global-error-message">{{ globalError.message }}</p>
                <div class="global-error-actions">
                    <button class="btn btn-primary" @click="handleReload" type="button">
                        Reload Application
                    </button>
                    <button class="btn btn-outline-secondary ms-2" @click="handleDismissGlobalError" type="button">
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onErrorCaptured } from 'vue'
import ChatContainer from '@/components/ChatContainer.vue'
import type { ErrorContext } from '@/types'

// Global error state
const globalError = ref<ErrorContext | null>(null)

// Error handling
const handleGlobalError = (error: Error, info?: string) => {
    console.error('Global application error:', error, info)

    globalError.value = {
        type: 'unknown',
        code: 'GLOBAL_ERROR',
        message: error.message || 'An unexpected error occurred',
        details: { info },
        timestamp: new Date(),
        retryable: true,
    }
}

const handleDismissGlobalError = () => {
    globalError.value = null
}

const handleReload = () => {
    window.location.reload()
}

// Vue error boundary
onErrorCaptured((error: Error, _instance, info: string) => {
    handleGlobalError(error, info)
    return false // Prevent error from propagating
})

// Global error handlers
onMounted(() => {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
        handleGlobalError(event.error || new Error(event.message))
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        handleGlobalError(new Error(event.reason))
        event.preventDefault()
    })
})
</script>
<style>
#app {
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    width: 100vw !important;
    background-color: var(--cui-gray-50);
    max-width: none !important;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    width: 100vw !important;
    display: block !important;
    place-items: unset !important;
}

.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}

.chat-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Global error overlay */
.global-error-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
}

.global-error-content {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.global-error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.global-error-title {
    color: var(--cui-danger);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.global-error-message {
    color: var(--cui-gray-700);
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.global-error-actions {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

/* Responsive design */
@media (max-width: 768px) {
    .chat-wrapper {
        padding: 0 0.5rem;
    }

    .global-error-content {
        padding: 1.5rem;
        margin: 1rem;
    }

    .global-error-actions {
        flex-direction: column;
    }

    .global-error-actions .btn {
        width: 100%;
        margin: 0 !important;
        margin-bottom: 0.5rem !important;
    }

    .global-error-actions .btn:last-child {
        margin-bottom: 0 !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .global-error-content {
        border: 2px solid var(--cui-gray-800);
    }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .global-error-overlay {
        backdrop-filter: none;
    }
}

/* Print styles */
@media print {
    .global-error-overlay {
        display: none;
    }
}
</style>
