import React, { useContext } from "react";
import { ResumeContext } from "@/app/resume/edit/ResumeContext";

const CoverLetterContent = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleContentChange = (e) => {
    setResumeData({ ...resumeData, content: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base text-white font-semibold">Cover Letter Content</h2>
      <textarea
        placeholder="Enter your cover letter content here..."
        name="content"
        rows={15}
        className="px-3 py-2 bg-white text-gray-950 rounded text-sm resize-y"
        value={resumeData.content || ""}
        onChange={handleContentChange}
      />
      <p className="text-xs text-gray-400">
        Your name will be automatically inserted at the beginning of the letter in the preview.
      </p>
    </div>
  );
};

export default CoverLetterContent;
