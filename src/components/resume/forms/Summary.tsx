import React, { useContext, useState } from 'react'
import { ResumeContext } from '@/lib/contexts/DocumentContext'
import AIGenerateSummaryModal from '@/components/resume/forms/AIGenerateSummaryModal'
import AITextAreaWithButton from '@/components/document-builder/shared-forms/AITextAreaWithButton'

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleToggleSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, showSummary: e.target.checked })
  }

  const handleGenerate = (generatedSummary: string) => {
    setResumeData({ ...resumeData, summary: generatedSummary })
  }

  return (
    <div className="flex flex-col gap-4">
      <AITextAreaWithButton
        value={resumeData.summary}
        onChange={handleChange}
        onGenerateClick={() => setIsModalOpen(true)}
        placeholder="Write a compelling professional summary highlighting your key strengths, experience, and career objectives..."
        name="summary"
        rows={8}
        minHeight="160px"
        maxLength={1200}
        showCharacterCount={true}
      />

      <AIGenerateSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
        resumeData={resumeData}
      />
    </div>
  )
}

export default Summary
