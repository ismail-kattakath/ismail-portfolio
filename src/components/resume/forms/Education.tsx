import React, { useContext } from 'react'
import FormButton from '@/components/resume-builder/form/FormButton'
import { FormInput } from '@/components/ui/FormInput'
import { FormCard } from '@/components/ui/FormCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { useArrayForm } from '@/hooks/useArrayForm'
import { ResumeContext } from '@/lib/contexts/DocumentContext'

/**
 * Education form component - REFACTORED
 * Reduced from 146 lines to ~100 lines using reusable components
 */
const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext)
  const { data, handleChange, add, remove } = useArrayForm(
    'education',
    {
      school: '',
      url: '',
      degree: '',
      startYear: '',
      endYear: '',
    },
    { urlFields: ['url'] }
  )

  const handleToggleEducationDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, showEducationDates: e.target.checked })
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Education"
        variant="indigo"
        action={
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10">
            <input
              type="checkbox"
              id="showEducationDates"
              checked={resumeData.showEducationDates}
              onChange={handleToggleEducationDates}
              className="h-4 w-4 cursor-pointer rounded accent-indigo-500"
            />
            <span className="text-sm text-white/90">Show Dates</span>
          </label>
        }
      />

      <div className="flex flex-col gap-3">
        {data.map((education, index) => (
          <FormCard key={index}>
            <FormInput
              label="Institution Name"
              name="school"
              value={education.school}
              onChange={(e) => handleChange(e, index)}
              variant="indigo"
            />

            <FormInput
              label="Website URL"
              name="url"
              type="url"
              placeholder="Website URL (optional)"
              value={education.url}
              onChange={(e) => handleChange(e, index)}
              variant="indigo"
            />

            <FormInput
              label="Degree / Program"
              name="degree"
              value={education.degree}
              onChange={(e) => handleChange(e, index)}
              variant="indigo"
            />

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <FormInput
                label="Start Date"
                name="startYear"
                type="date"
                value={education.startYear}
                onChange={(e) => handleChange(e, index)}
                variant="indigo"
                className="flex-1"
              />

              <FormInput
                label="End Date"
                name="endYear"
                type="date"
                value={education.endYear}
                onChange={(e) => handleChange(e, index)}
                variant="indigo"
                className="flex-1"
              />

              <DeleteButton
                onClick={() => remove(index)}
                label="Delete this education"
              />
            </div>
          </FormCard>
        ))}
      </div>

      <FormButton size={data.length} add={add} label="Education" />
    </div>
  )
}

export default Education
