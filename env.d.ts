/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AWS_REGION: string
    readonly VITE_AWS_BEDROCK_AGENT_ARN: string
    readonly VITE_AWS_BEDROCK_SESSION_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
