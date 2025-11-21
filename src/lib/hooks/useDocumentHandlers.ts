import { Dispatch, SetStateAction } from "react";

export const useDocumentHandlers = (
  resumeData: any,
  setResumeData: Dispatch<SetStateAction<any>>
) => {
  const handleProfilePicture = (e: any) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({
          ...resumeData,
          profilePicture: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setResumeData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  return {
    handleProfilePicture,
    handleChange,
  };
};
