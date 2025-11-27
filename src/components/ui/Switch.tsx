'use client'

import React from 'react'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  'aria-label'?: string
  className?: string
  disabled?: boolean
}

/**
 * Switch component for toggle controls
 * Provides accessible on/off state indication
 */
const Switch = ({
  checked,
  onCheckedChange,
  'aria-label': ariaLabel,
  className = '',
  disabled = false,
}: SwitchProps) => {
  const handleClick = () => {
    if (!disabled) {
      onCheckedChange(!checked)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-blue-500' : 'bg-white/20'
      } ${className}`}
      data-state={checked ? 'checked' : 'unchecked'}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default Switch
