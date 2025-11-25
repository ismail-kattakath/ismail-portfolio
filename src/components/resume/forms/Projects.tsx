import React from 'react'
import FormButton from '@/components/resume-builder/form/FormButton'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { FormCard } from '@/components/ui/FormCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { useArrayForm } from '@/hooks/useArrayForm'

/**
 * Projects form component - REFACTORED
 * Reduced from 125 lines to ~90 lines using reusable components
 * Note: Old implementation had inconsistent styling - now fixed
 */
const Projects = () => {
  const { data, handleChange, add, remove } = useArrayForm('projects', {
    name: '',
    link: '',
    description: '',
    keyAchievements: '',
    startYear: '',
    endYear: '',
  })

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Projects" variant="purple" />

      <div className="flex flex-col gap-3">
        {data.map((project, index) => (
          <FormCard key={index}>
            <FormInput
              label="Project Name"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(e, index)}
              variant="purple"
            />

            <FormInput
              label="Link"
              name="link"
              type="url"
              value={project.link}
              onChange={(e) => handleChange(e, index)}
              variant="purple"
            />

            <FormTextarea
              label="Description"
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e, index)}
              variant="purple"
              maxLength={250}
              showCounter
              minHeight="120px"
            />

            <FormTextarea
              label="Key Achievements"
              name="keyAchievements"
              value={project.keyAchievements}
              onChange={(e) => handleChange(e, index)}
              variant="purple"
              showCounter
              minHeight="150px"
            />

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <FormInput
                label="Start Year"
                name="startYear"
                type="date"
                value={project.startYear}
                onChange={(e) => handleChange(e, index)}
                variant="purple"
                className="flex-1"
              />

              <FormInput
                label="End Year"
                name="endYear"
                type="date"
                value={project.endYear}
                onChange={(e) => handleChange(e, index)}
                variant="purple"
                className="flex-1"
              />

              <DeleteButton
                onClick={() => remove(index)}
                label="Delete this project"
              />
            </div>
          </FormCard>
        ))}
      </div>

      <FormButton size={data.length} add={add} label="Project" />
    </div>
  )
}

export default Projects
