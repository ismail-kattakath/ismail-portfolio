import React, { useContext, useState } from "react";
import { ResumeContext } from "@/lib/contexts/DocumentContext";
import AIGenerateSummaryModal from "./AIGenerateSummaryModal";
import AITextAreaWithButton from "@/components/document-builder/shared-forms/AITextAreaWithButton";

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, showSummary: e.target.checked });
  };

  const handleGenerate = (generatedSummary: string) => {
    setResumeData({ ...resumeData, summary: generatedSummary });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          <h2 className="text-lg text-white font-semibold">Professional Summary</h2>
        </div>
        <label className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors border border-white/10">
          <input
            type="checkbox"
            id="showSummary"
            checked={resumeData.showSummary}
            onChange={handleToggleSummary}
            className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
          />
          <span className="text-sm text-white/90">Display Section</span>
        </label>
      </div>

      <AITextAreaWithButton
        value={resumeData.summary}
        onChange={handleChange}
        onGenerateClick={() => setIsModalOpen(true)}
        placeholder="Write a compelling professional summary highlighting your key strengths, experience, and career objectives..."
        name="summary"
        rows={8}
        minHeight="160px"
        maxLength={2000}
        showCharacterCount={true}
      />

      <AIGenerateSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
        resumeData={resumeData}
      />
    </div>
  );
};

export default Summary;
