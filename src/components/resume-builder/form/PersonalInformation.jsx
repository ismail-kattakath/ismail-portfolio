import React, { useContext } from "react";
import { ResumeContext } from "@/app/resume/edit/ResumeContext";
const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base text-white font-semibold">Personal Information</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm"
          value={resumeData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information (e.g., +1 (647) 225-2878)"
          name="contactInformation"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm"
          value={resumeData.contactInformation}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm"
          value={resumeData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm"
          value={resumeData.address}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="px-2 py-1 bg-white text-gray-950 rounded text-sm file:border-0 file:bg-fuchsia-600 file:text-white file:rounded-sm file:px-2 file:py-1 file:mr-2"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
