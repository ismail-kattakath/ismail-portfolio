'use client'

import React from 'react'
import { useAISettings } from '@/lib/contexts/AISettingsContext'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'

const AISettings: React.FC = () => {
  const { settings, updateSettings } = useAISettings()

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-white/60">
        Connect to an OpenAI-compatible API to generate tailored cover letters
        and professional summaries based on the job description.
      </p>

      {/* Provider Examples */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-xs font-medium text-white/80">
          Popular Providers:
        </p>
        <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
          <div>
            <span className="text-white/60">OpenAI:</span>{' '}
            <code className="text-blue-400">api.openai.com/v1</code>
          </div>
          <div>
            <span className="text-white/60">OpenRouter (Gemini/Claude):</span>{' '}
            <code className="text-blue-400">openrouter.ai/api/v1</code>
          </div>
          <div>
            <span className="text-white/60">Groq:</span>{' '}
            <code className="text-blue-400">api.groq.com/openai/v1</code>
          </div>
          <div>
            <span className="text-white/60">Local (LM Studio):</span>{' '}
            <code className="text-blue-400">localhost:1234/v1</code>
          </div>
        </div>
      </div>

      {/* API URL, Key, and Model */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormInput
          label="API URL"
          name="apiUrl"
          value={settings.apiUrl}
          onChange={(e) => updateSettings({ apiUrl: e.target.value })}
          placeholder="https://api.openai.com/v1"
          variant="blue"
          helpText="For Gemini: use https://openrouter.ai/api/v1"
        />
        <FormInput
          label="API Key"
          name="apiKey"
          type="password"
          value={settings.apiKey}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
          placeholder="sk-..."
          variant="blue"
          helpText="Get from your AI provider"
        />
        <FormInput
          label="Model"
          name="model"
          value={settings.model}
          onChange={(e) => updateSettings({ model: e.target.value })}
          placeholder="gpt-4o-mini"
          variant="blue"
          helpText="e.g., google/gemini-2.0-flash-exp"
        />
      </div>

      {/* Model Examples */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-xs font-medium text-white/80">
          Popular Models:
        </p>
        <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-white/60">OpenAI:</span>{' '}
            <code className="text-blue-400">gpt-4o-mini</code>,{' '}
            <code className="text-blue-400">gpt-4o</code>
          </div>
          <div>
            <span className="text-white/60">Gemini (via OpenRouter):</span>{' '}
            <code className="text-blue-400">google/gemini-2.0-flash-exp</code>
          </div>
          <div>
            <span className="text-white/60">Claude (via OpenRouter):</span>{' '}
            <code className="text-blue-400">anthropic/claude-3.5-sonnet</code>
          </div>
          <div>
            <span className="text-white/60">Groq:</span>{' '}
            <code className="text-blue-400">llama-3.3-70b-versatile</code>
          </div>
          <div>
            <span className="text-white/60">DeepSeek (via OpenRouter):</span>{' '}
            <code className="text-blue-400">deepseek/deepseek-r1</code>
          </div>
          <div>
            <span className="text-white/60">Local:</span>{' '}
            <code className="text-blue-400">llama-3.1-8b-instruct</code>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <FormTextarea
        label="Job Description"
        name="jobDescription"
        value={settings.jobDescription}
        onChange={(e) => updateSettings({ jobDescription: e.target.value })}
        placeholder="Paste the job description here to tailor your resume and cover letter..."
        variant="blue"
        minHeight="160px"
      />
    </div>
  )
}

export default AISettings
