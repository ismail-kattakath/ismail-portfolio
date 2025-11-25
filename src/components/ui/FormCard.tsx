import React from 'react'

interface FormCardProps {
  children: React.ReactNode
  className?: string
}

/**
 * Reusable card container for form items in arrays
 * Provides consistent hover states and spacing
 * Eliminates 15+ instances of card container duplication
 */
export function FormCard({ children, className = '' }: FormCardProps) {
  return (
    <div
      className={`group flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  )
}
