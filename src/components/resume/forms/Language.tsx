import React, { useContext } from 'react'
import FormButton from '@/components/resume-builder/form/FormButton'
import { FormCard } from '@/components/ui/FormCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { useSimpleArrayForm } from '@/hooks/useSimpleArrayForm'
import { ResumeContext } from '@/lib/contexts/DocumentContext'

/**
 * Language form component - REFACTORED
 * Reduced from 90 lines to ~60 lines
 */
const Language = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext)
  const { data, handleChange, add, remove } = useSimpleArrayForm('languages')

  const handleToggleLanguages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, showLanguages: e.target.checked })
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Languages"
        variant="emerald"
        action={
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10">
            <input
              type="checkbox"
              id="showLanguages"
              checked={resumeData.showLanguages}
              onChange={handleToggleLanguages}
              className="h-4 w-4 cursor-pointer rounded accent-emerald-500"
            />
            <span className="text-sm text-white/90">Display Section</span>
          </label>
        }
      />

      <div className="flex flex-col gap-2">
        {data.map((language, index) => (
          <FormCard key={index} className="p-3">
            <div className="flex items-center gap-3">
              <div className="floating-label-group flex-1">
                <input
                  type="text"
                  placeholder="Language"
                  name="language"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition-all outline-none placeholder:text-white/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  value={language}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <label className="floating-label">Language</label>
              </div>

              <DeleteButton
                onClick={() => remove(index)}
                label="Delete this language"
                className="p-2"
              />
            </div>
          </FormCard>
        ))}
      </div>

      <FormButton size={data.length} add={add} label="Language" />
    </div>
  )
}

export default Language
