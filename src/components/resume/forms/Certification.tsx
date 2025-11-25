import React from 'react'
import FormButton from '@/components/ui/FormButton'
import { FormCard } from '@/components/ui/FormCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { useSimpleArrayForm } from '@/hooks/useSimpleArrayForm'

/**
 * Certification form component - REFACTORED
 * Reduced from 73 lines to ~50 lines
 */
const Certification = () => {
  const { data, handleChange, add, remove } =
    useSimpleArrayForm('certifications')

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Certifications" variant="violet" />

      <div className="flex flex-col gap-2">
        {data.map((certification, index) => (
          <FormCard key={index} className="p-3">
            <div className="flex items-center gap-3">
              <div className="floating-label-group flex-1">
                <input
                  type="text"
                  placeholder="Enter certification name"
                  name="certification"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition-all outline-none placeholder:text-white/40 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  value={certification}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <label className="floating-label">Certification Name</label>
              </div>

              <DeleteButton
                onClick={() => remove(index)}
                label="Delete this certification"
                className="p-2"
              />
            </div>
          </FormCard>
        ))}
      </div>

      <FormButton size={data.length} add={add} label="Certification" />
    </div>
  )
}

export default Certification
