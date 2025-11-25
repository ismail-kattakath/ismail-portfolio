'use client'

import React, { useState, useEffect } from 'react'
import '@/styles/document-builder.css'
import '@/styles/resume-preview.css'

// Import components
import Language from '@/components/resume/forms/Language'
import LoadUnload from '@/components/document-builder/shared-forms/LoadUnload'
import Preview from '@/components/resume/preview/Preview'
import defaultResumeData from '@/lib/resumeAdapter'
import SocialMedia from '@/components/document-builder/shared-forms/SocialMedia'
import WorkExperience from '@/components/resume/forms/WorkExperience'
import Skill from '@/components/resume/forms/Skill'
import PersonalInformation from '@/components/document-builder/shared-forms/PersonalInformation'
import Summary from '@/components/resume/forms/Summary'
import Education from '@/components/resume/forms/Education'
import Certification from '@/components/resume/forms/certification'
import PrintButton from '@/components/document-builder/ui/PrintButton'
import { ResumeContext } from '@/lib/contexts/DocumentContext'
import { Toaster } from 'sonner'
import { useDocumentHandlers } from '@/lib/hooks/useDocumentHandlers'
import PasswordProtection from '@/components/auth/PasswordProtection'

function ResumeEditor() {
  // Resume data
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const { handleProfilePicture, handleChange } = useDocumentHandlers(
    resumeData,
    setResumeData
  )

  // Migrate skills data on mount if needed
  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      const needsMigration = resumeData.skills.some((skillCategory) =>
        skillCategory.skills.some(
          (skill) =>
            typeof skill === 'string' ||
            ('underline' in skill && skill.highlight === undefined)
        )
      )

      if (needsMigration) {
        const migratedData = {
          ...resumeData,
          skills: resumeData.skills.map((skillCategory) => ({
            ...skillCategory,
            skills: skillCategory.skills.map((skill) => {
              if (typeof skill === 'string') {
                return { text: skill, highlight: false }
              }
              // Handle old 'underline' property
              if ('underline' in skill && skill.highlight === undefined) {
                return {
                  text: skill.text,
                  highlight: (skill as { underline: boolean }).underline,
                }
              }
              return skill
            }),
          })),
        }
        setResumeData(migratedData)
      }
    }
  }, [])

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <div className="relative flex flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 md:h-screen md:flex-row">
          {/* Floating Print Button - Hidden on print */}
          <div className="exclude-print fixed right-8 bottom-8 z-50">
            <PrintButton name={resumeData.name} documentType="Resume" />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="exclude-print flex-1 space-y-6 p-4 md:h-screen md:space-y-8 md:overflow-y-auto md:p-6 lg:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-white/5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Resume Editor</h1>
                <p className="text-sm text-white/60">
                  Build your professional resume
                </p>
              </div>
            </div>

            <LoadUnload hidePrintButton />
            <PersonalInformation />
            <SocialMedia />
            <Summary />
            <Education />
            <WorkExperience />
            {resumeData.skills.map((skill, index) => (
              <Skill title={skill.title} key={index} />
            ))}
            <Language />
            <Certification />
          </form>
          <Preview />
        </div>
      </ResumeContext.Provider>
    </>
  )
}

export default function ResumeEditPage() {
  return (
    <PasswordProtection>
      <ResumeEditor />
    </PasswordProtection>
  )
}
