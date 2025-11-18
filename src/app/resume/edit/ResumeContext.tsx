'use client';

import { createContext } from "react";
import DefaultResumeData from "@/components/resume-builder/utility/DefaultResumeData";

type ResumeContextType = {
  resumeData: typeof DefaultResumeData;
  setResumeData: (data: typeof DefaultResumeData) => void;
  handleProfilePicture: (e: any) => void;
  handleChange: (e: any) => void;
};

export const ResumeContext = createContext<ResumeContextType>({
  resumeData: DefaultResumeData,
  setResumeData: () => {},
  handleProfilePicture: () => {},
  handleChange: () => {},
});
