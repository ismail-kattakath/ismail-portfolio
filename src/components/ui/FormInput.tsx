import React, { ChangeEvent, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export type FormVariant =
  | 'teal'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'emerald'
  | 'violet'
  | 'blue'

interface FormInputProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'email' | 'url' | 'date' | 'tel' | 'password'
  placeholder?: string
  name: string
  variant?: FormVariant
  maxLength?: number
  showCounter?: boolean
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
 * Reusable form input component with floating label pattern
 * Eliminates 40+ instances of duplicated input styling
 * Supports password type with show/hide toggle
 */
export function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  name,
  variant = 'teal',
  maxLength,
  showCounter = false,
  className = '',
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="floating-label-group">
      <input
        type={inputType}
        placeholder={placeholder || label}
        name={name}
        className={`w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white transition-all outline-none placeholder:text-white/40 focus:ring-2 ${isPassword ? 'pr-12' : ''} ${variantClasses[variant]} ${className}`}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      <label className="floating-label">{label}</label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/60 transition-colors hover:text-white"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      {showCounter && maxLength && (
        <div className="pointer-events-none absolute right-2 bottom-2 rounded bg-white/5 px-2 py-1 text-xs text-white/50">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
