/**
 * AI Provider presets for easy configuration
 */

export interface ProviderPreset {
  name: string
  baseURL: string
  description: string
  supportsModels: boolean // Whether it supports /v1/models endpoint
  requiresAuth: boolean // Whether it requires API key to list models
  commonModels?: string[] // Common models for this provider (fallback)
}

export const PROVIDER_PRESETS: ProviderPreset[] = [
  {
    name: 'OpenAI',
    baseURL: 'https://api.openai.com/v1',
    description: 'Official OpenAI API (GPT-4, GPT-4o, GPT-4o-mini)',
    supportsModels: true,
    requiresAuth: true,
    commonModels: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-4',
      'gpt-3.5-turbo',
    ],
  },
  {
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    description: 'Access 100+ models (Gemini, Claude, GPT, Llama, etc.)',
    supportsModels: true,
    requiresAuth: true,
    commonModels: [
      'google/gemini-2.0-flash-exp',
      'google/gemini-2.0-flash-thinking-exp:free',
      'anthropic/claude-3.5-sonnet',
      'openai/gpt-4o-mini',
      'deepseek/deepseek-r1',
    ],
  },
  {
    name: 'Groq',
    baseURL: 'https://api.groq.com/openai/v1',
    description: 'Ultra-fast inference (Llama, Mixtral, Gemma)',
    supportsModels: true,
    requiresAuth: true,
    commonModels: [
      'llama-3.3-70b-versatile',
      'llama-3.1-70b-versatile',
      'mixtral-8x7b-32768',
      'gemma2-9b-it',
    ],
  },
  {
    name: 'xAI (Grok)',
    baseURL: 'https://api.x.ai/v1',
    description: 'xAI Grok models',
    supportsModels: true,
    requiresAuth: true,
    commonModels: ['grok-beta', 'grok-vision-beta'],
  },
  {
    name: 'Together AI',
    baseURL: 'https://api.together.xyz/v1',
    description: 'Open source models',
    supportsModels: true,
    requiresAuth: true,
    commonModels: [
      'meta-llama/Llama-3.3-70B-Instruct-Turbo',
      'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      'mistralai/Mixtral-8x7B-Instruct-v0.1',
      'Qwen/Qwen2.5-72B-Instruct-Turbo',
    ],
  },
  {
    name: 'Local (LM Studio)',
    baseURL: 'http://localhost:1234/v1',
    description: 'Local AI server (LM Studio, Ollama, etc.)',
    supportsModels: true,
    requiresAuth: false,
    commonModels: [
      'llama-3.1-8b-instruct',
      'llama-3.3-70b-instruct',
      'qwen2.5-7b-instruct',
    ],
  },
]

export const CUSTOM_PROVIDER: ProviderPreset = {
  name: 'Custom',
  baseURL: '',
  description: 'Enter your own API URL',
  supportsModels: false,
}

/**
 * Get provider preset by base URL
 */
export function getProviderByURL(baseURL: string): ProviderPreset | null {
  return (
    PROVIDER_PRESETS.find(
      (p) => p.baseURL.toLowerCase() === baseURL.toLowerCase()
    ) || null
  )
}

/**
 * Check if a base URL matches a known provider
 */
export function isKnownProvider(baseURL: string): boolean {
  return getProviderByURL(baseURL) !== null
}
