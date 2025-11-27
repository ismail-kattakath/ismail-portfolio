import React from 'react'
import FormButton from '@/components/ui/FormButton'
import { useSkillsForm } from '@/hooks/useSkillsForm'

interface SkillProps {
  title: string
}

/**
 * Skill form component - displays skills as inline tags
 */
const Skill = ({ title }: SkillProps) => {
  const { skills, add, remove } = useSkillsForm(title)

  return (
    <div className="flex flex-col gap-4">
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
      </div>

      <FormButton size={skills.length} add={add} label={title} />
    </div>
  )
}

export default Skill
