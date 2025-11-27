'use client'

import React from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useAISettings } from '@/lib/contexts/AISettingsContext'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'

const AISettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    isConfigured,
    connectionStatus,
    jobDescriptionStatus,
  } = useAISettings()

  const getStatusDisplay = () => {
    // Testing connection
    if (connectionStatus === 'testing') {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-400" />,
        text: 'Testing API connection...',
        className: 'border-blue-500/20 bg-blue-500/10',
        textClassName: 'text-blue-300',
      }
    }

    // Invalid connection
    if (connectionStatus === 'invalid') {
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-400" />,
        text: 'Invalid API credentials. Please check URL and key.',
        className: 'border-red-500/20 bg-red-500/10',
        textClassName: 'text-red-300',
      }
    }

    // Connection valid, testing JD
    if (connectionStatus === 'valid' && jobDescriptionStatus === 'testing') {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-400" />,
        text: 'Validating job description...',
        className: 'border-blue-500/20 bg-blue-500/10',
        textClassName: 'text-blue-300',
      }
    }

    // Connection valid, JD invalid
    if (connectionStatus === 'valid' && jobDescriptionStatus === 'invalid') {
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-400" />,
        text: 'Invalid job description. Please paste a real job posting.',
        className: 'border-red-500/20 bg-red-500/10',
        textClassName: 'text-red-300',
      }
    }

    // All valid
    if (isConfigured) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        text: 'Ready to generate AI content',
        className: 'border-green-500/20 bg-green-500/10',
        textClassName: 'text-green-300',
      }
    }

    // Connection valid, waiting for JD validation
    if (connectionStatus === 'valid') {
      return {
        icon: <AlertCircle className="h-4 w-4 text-amber-400" />,
        text: 'API connected. Add a valid job description to continue.',
        className: 'border-amber-500/20 bg-amber-500/10',
        textClassName: 'text-amber-300',
      }
    }

    // Default idle state
    return {
      icon: <AlertCircle className="h-4 w-4 text-amber-400" />,
      text: 'Configure settings below to enable AI generation',
      className: 'border-amber-500/20 bg-amber-500/10',
      textClassName: 'text-amber-300',
    }
  }

  const status = getStatusDisplay()

  return (
    <div className="flex flex-col gap-4">
      {/* Status indicator */}
      <div
        className={`flex items-center gap-2 rounded-lg border p-3 ${status.className}`}
      >
        {status.icon}
        <span className={`text-sm ${status.textClassName}`}>{status.text}</span>
      </div>

      {/* API URL and Key - Same line */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          label="API URL"
          name="apiUrl"
          value={settings.apiUrl}
          onChange={(e) => updateSettings({ apiUrl: e.target.value })}
          placeholder="https://api.openai.com"
          variant="blue"
        />
        <FormInput
          label="API Key"
          name="apiKey"
          type="password"
          value={settings.apiKey}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
          placeholder="sk-proj-..."
          variant="blue"
        />
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
