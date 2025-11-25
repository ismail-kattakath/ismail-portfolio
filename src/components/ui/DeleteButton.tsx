import React from 'react'
import { MdDelete } from 'react-icons/md'

interface DeleteButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

/**
 * Reusable delete button with consistent styling
 * Eliminates 15+ instances of delete button duplication
 */
export function DeleteButton({
  onClick,
  label = 'Delete',
  className = '',
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 cursor-pointer rounded-lg px-3 py-2 text-red-400 transition-all hover:bg-red-400/10 hover:text-red-300 ${className}`}
      title={label}
    >
      <MdDelete className="text-xl" />
    </button>
  )
}
