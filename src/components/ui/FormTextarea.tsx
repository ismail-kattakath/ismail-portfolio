import React, { ChangeEvent } from 'react'
import { FormVariant } from './FormInput'

interface FormTextareaProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  name: string
  variant?: FormVariant
  maxLength?: number
  showCounter?: boolean
  minHeight?: string
  className?: string
}

const variantClasses: Record<FormVariant, string> = {
  teal: 'focus:border-teal-400 focus:ring-teal-400/20',
  indigo: 'focus:border-indigo-400 focus:ring-indigo-400/20',
  pink: 'focus:border-pink-400 focus:ring-pink-400/20',
  purple: 'focus:border-purple-400 focus:ring-purple-400/20',
  emerald: 'focus:border-emerald-400 focus:ring-emerald-400/20',
  violet: 'focus:border-violet-400 focus:ring-violet-400/20',
  blue: 'focus:border-blue-400 focus:ring-blue-400/20',
}

/**
 * Reusable form textarea component with floating label pattern
 * Supports character counter and configurable min height
 */
export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  name,
  variant = 'teal',
  maxLength,
  showCounter = true,
  minHeight = '100px',
  className = '',
}: FormTextareaProps) {
  return (
    <div className="floating-label-group">
      <textarea
        placeholder={placeholder || label}
        name={name}
        className={`w-full resize-y rounded-lg border border-white/20 bg-white/10 px-3 py-2 pb-8 text-sm leading-relaxed text-white transition-all outline-none placeholder:text-white/30 ${variantClasses[variant]} ${className}`}
        style={{ minHeight }}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      <label className="floating-label">{label}</label>
      {showCounter && (
        <div className="pointer-events-none absolute right-2 bottom-2 rounded bg-white/5 px-2 py-1 text-xs text-white/50">
          {maxLength ? `${value.length}/${maxLength}` : `${value.length} chars`}
        </div>
      )}
    </div>
  )
}
