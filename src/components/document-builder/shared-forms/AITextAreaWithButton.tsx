import React from 'react'
import { Sparkles } from 'lucide-react'

interface AITextAreaWithButtonProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onGenerateClick: () => void
  placeholder: string
  name: string
  rows?: number
  minHeight?: string
  maxLength?: number
  showCharacterCount?: boolean
  className?: string
}

const AITextAreaWithButton: React.FC<AITextAreaWithButtonProps> = ({
  value,
  onChange,
  onGenerateClick,
  placeholder,
  name,
  rows = 18,
  minHeight = '300px',
  maxLength,
  showCharacterCount = true,
  className = '',
}) => {
  const characterCount = value?.length || 0
  const maxLengthDisplay = maxLength ? `/${maxLength}` : ''

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          name={name}
          rows={rows}
          className={`w-full resize-y rounded-t-lg rounded-b-none border border-b-0 border-white/20 bg-white/10 px-4 py-3 text-sm text-white transition-all outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 min-h-[${minHeight}] block leading-relaxed placeholder:text-white/30`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={{ minHeight }}
        />
        {showCharacterCount && (
          <div className="pointer-events-none absolute top-3 right-3 rounded-lg bg-white/5 px-3 py-1 text-xs text-white/50">
            {characterCount}
            {maxLengthDisplay}
          </div>
        )}
      </div>

      {/* Generate with AI Button - Connected to textarea bottom */}
      <button
        type="button"
        onClick={onGenerateClick}
        className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-t-none rounded-b-lg border border-t-0 border-white/20 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl"
      >
        <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
        <span>Generate with AI</span>
      </button>
    </div>
  )
}

export default AITextAreaWithButton
