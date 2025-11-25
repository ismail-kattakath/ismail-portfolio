'use client'

import React, { useState, useEffect } from 'react'
import '@/styles/document-builder.css'

// Import ORIGINAL resume components
import LoadUnload from '@/components/document-builder/shared-forms/LoadUnload'
import CoverLetterPreview from '@/components/cover-letter/preview/CoverLetterPreview'
import defaultResumeData from '@/lib/resumeAdapter'
import SocialMedia from '@/components/document-builder/shared-forms/SocialMedia'
import PersonalInformation from '@/components/document-builder/shared-forms/PersonalInformation'
import CoverLetterContent from '@/components/cover-letter/forms/CoverLetterContent'
import PrintButton from '@/components/document-builder/ui/PrintButton'
import { ResumeContext } from '@/lib/contexts/DocumentContext'
import { Toaster } from 'sonner'
import { useDocumentHandlers } from '@/lib/hooks/useDocumentHandlers'
import type { CoverLetterData } from '@/types'
import PasswordProtection from '@/components/auth/PasswordProtection'

// Default cover letter content
const DEFAULT_COVER_LETTER_CONTENT =
  "I'm a Toronto-based Principal Software Engineer with 7+ years delivering production-ready full-stack applications using React, React Native, Node.js, and MongoDB—the exact stack you're seeking. At Homewood Health, I transformed an abandoned MEAN application into a nationally-deployed platform serving 100,000+ users with 99.5% uptime, implemented enterprise OAuth/SAML authentication, and led the AngularJS-to-Next.js migration while reducing deployment time by 92%. My experience architecting REST APIs with Express.js, integrating external SDKs, implementing security protocols, and managing agile sprints directly aligns with your requirements. Having built FDA-compliant healthcare systems and worked with cross-functional teams across multiple countries, I understand the rigorous standards and fast-paced environment of innovative startups like Speer. I'm excited to leverage my proven track record in building scalable, testable code to help deliver your groundbreaking technologies—let's discuss how I can contribute to your mission this week."

function CoverLetterEditor() {
  // Use resume data as base, just add content and hide unwanted sections for DISPLAY
  // But keep the original data for AI generation
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    ...defaultResumeData,
    content: DEFAULT_COVER_LETTER_CONTENT,
    // Hide sections not needed for cover letter DISPLAY
    // But we keep the data in the background for AI generation
    showSummary: false,
    showLanguages: false,
  })
  const { handleProfilePicture, handleChange } = useDocumentHandlers(
    coverLetterData as ResumeData,
    setCoverLetterData as React.Dispatch<React.SetStateAction<ResumeData>>
  )

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('coverLetterData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setCoverLetterData(parsedData)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      {/* Use ResumeContext so original components work unchanged */}
      <ResumeContext.Provider
        value={{
          resumeData: coverLetterData as ResumeData,
          setResumeData: setCoverLetterData as React.Dispatch<
            React.SetStateAction<ResumeData>
          >,
          handleProfilePicture,
          handleChange,
        }}
      >
        <div className="relative flex flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 md:h-screen md:flex-row">
          {/* Floating Print Button - Hidden on print */}
          <div className="exclude-print fixed right-8 bottom-8 z-50">
            <PrintButton
              name={coverLetterData.name}
              documentType="CoverLetter"
            />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="exclude-print flex-1 space-y-6 p-4 md:h-screen md:space-y-8 md:overflow-y-auto md:p-6 lg:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-white/5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Cover Letter Editor
                </h1>
                <p className="text-sm text-white/60">
                  Create your perfect cover letter
                </p>
              </div>
            </div>

            <LoadUnload
              hideExportButton={true}
              preserveContent={true}
              hidePrintButton={true}
            />
            <PersonalInformation />
            <SocialMedia />
            <CoverLetterContent />
          </form>
          <CoverLetterPreview />
        </div>
      </ResumeContext.Provider>
    </>
  )
}

export default function CoverLetterEditPage() {
  return (
    <PasswordProtection>
      <CoverLetterEditor />
    </PasswordProtection>
  )
}
