import React from 'react'
import FormButton from '@/components/ui/FormButton'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { FormCard } from '@/components/ui/FormCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { useArrayForm } from '@/hooks/useArrayForm'

/**
 * Work Experience form component - REFACTORED
 * Reduced from 169 lines to ~80 lines using reusable components
 * All CRUD logic delegated to useArrayForm hook
 */
const WorkExperience = () => {
  const { data, handleChange, add, remove } = useArrayForm(
    'workExperience',
    {
      company: '',
      url: '',
      position: '',
      description: '',
      keyAchievements: '',
      startYear: '',
      endYear: '',
    },
    { urlFields: ['url'] }
  )

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Work Experience" variant="teal" />

      <div className="flex flex-col gap-3">
        {data.map((workExperience, index) => (
          <FormCard key={index}>
            <FormInput
              label="Company Name"
              name="company"
              value={workExperience.company}
              onChange={(e) => handleChange(e, index)}
              variant="teal"
            />

            <FormInput
              label="Company Website URL"
              name="url"
              type="url"
              value={workExperience.url}
              onChange={(e) => handleChange(e, index)}
              variant="teal"
            />

            <FormInput
              label="Job Title"
              name="position"
              value={workExperience.position}
              onChange={(e) => handleChange(e, index)}
              variant="teal"
            />

            <FormTextarea
              label="Description"
              name="description"
              placeholder="Brief company/role description..."
              value={workExperience.description}
              onChange={(e) => handleChange(e, index)}
              variant="teal"
              maxLength={250}
              showCounter
              minHeight="100px"
            />

            <FormTextarea
              label="Key Achievements"
              name="keyAchievements"
              placeholder="Key achievements and responsibilities..."
              value={workExperience.keyAchievements}
              onChange={(e) => handleChange(e, index)}
              variant="teal"
              showCounter
              minHeight="120px"
            />

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <FormInput
                label="Start Date"
                name="startYear"
                type="date"
                value={workExperience.startYear}
                onChange={(e) => handleChange(e, index)}
                variant="teal"
                className="flex-1"
              />

              <FormInput
                label="End Date"
                name="endYear"
                type="date"
                value={workExperience.endYear}
                onChange={(e) => handleChange(e, index)}
                variant="teal"
                className="flex-1"
              />

              <DeleteButton
                onClick={() => remove(index)}
                label="Delete this work experience"
              />
            </div>
          </FormCard>
        ))}
      </div>

      <FormButton size={data.length} add={add} label="Work Experience" />
    </div>
  )
}

export default WorkExperience
