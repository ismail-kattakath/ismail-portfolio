'use client';

import { createContext } from "react";
import resumeData from "@/lib/resumeAdapter";

type DocumentContextType = {
  resumeData: typeof resumeData;
  setResumeData: (data: typeof resumeData) => void;
  handleProfilePicture: (e: any) => void;
  handleChange: (e: any) => void;
};

export const DocumentContext = createContext<DocumentContextType>({
  resumeData: resumeData,
  setResumeData: () => {},
  handleProfilePicture: () => {},
  handleChange: () => {},
});

// Export alias for backward compatibility during migration
export const ResumeContext = DocumentContext;
