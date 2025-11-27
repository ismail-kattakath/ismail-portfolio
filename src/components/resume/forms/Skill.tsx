import React, { useState } from 'react'
import { useSkillsForm } from '@/hooks/useSkillsForm'

interface SkillProps {
  title: string
}

/**
 * Skill form component - displays skills as inline tags with inline add input
 */
const Skill = ({ title }: SkillProps) => {
  const { skills, add, remove } = useSkillsForm(title)
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        add(inputValue)
        setInputValue('')
      }
    }
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      add(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={`SKILL-${title}-${index}`}
          className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white"
        >
          {skill.text}
          <button
            type="button"
            onClick={() => remove(index)}
            className="ml-1 cursor-pointer text-white/60 transition-all hover:text-red-400"
            title="Remove skill"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={`Add ${title.toLowerCase()}...`}
        className="rounded-full border border-dashed border-white/30 bg-transparent px-3 py-1 text-sm text-white outline-none placeholder:text-white/40 focus:border-pink-400"
      />
    </div>
  )
}

export default Skill
