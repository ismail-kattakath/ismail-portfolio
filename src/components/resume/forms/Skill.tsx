import React from 'react'
import FormButton from '@/components/ui/FormButton'
import {
  DnDContext,
  DnDDroppable,
  DraggableCard,
} from '@/components/ui/DragAndDrop'
import { useSkillsForm } from '@/hooks/useSkillsForm'
import type { DropResult } from '@hello-pangea/dnd'

interface SkillProps {
  title: string
}

/**
 * Skill form component - REFACTORED with DRY principles
 * Uses reusable drag-and-drop components
 */
const Skill = ({ title }: SkillProps) => {
  const { skills, add, remove, reorder } = useSkillsForm(title)

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    reorder(source.index, destination.index)
  }

  return (
    <div className="flex flex-col gap-4">
      <DnDContext onDragEnd={onDragEnd}>
        <DnDDroppable droppableId={`skills-${title}`}>
          {(provided) => (
            <div
              className="flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {skills.map((skill, index) => (
                <DraggableCard
                  key={`SKILL-${title}-${index}`}
                  draggableId={`SKILL-${title}-${index}`}
                  index={index}
                  outlineColor="pink"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1 px-3 py-2 text-sm text-white">
                      {skill.text}
                    </span>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex-shrink-0 cursor-pointer rounded px-2 py-1 text-white/60 transition-all hover:bg-red-400/10 hover:text-red-400"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </div>
                </DraggableCard>
              ))}
              {provided.placeholder}
            </div>
          )}
        </DnDDroppable>
      </DnDContext>

      <FormButton size={skills.length} add={add} label={title} />
    </div>
  )
}

export default Skill
