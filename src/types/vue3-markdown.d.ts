/**
 * Type declarations for vue3-markdown
 */

declare module 'vue3-markdown' {
    import { DefineComponent } from 'vue'

    export interface VMarkdownViewProps {
        content: string
        mode?: 'light' | 'dark'
        class?: string
    }

    export const VMarkdownView: DefineComponent<VMarkdownViewProps>
}
