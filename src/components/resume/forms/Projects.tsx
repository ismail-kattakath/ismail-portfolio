import FormButton from '@/components/resume-builder/form/FormButton'
import React, { useContext } from 'react'
import { ResumeContext } from '@/lib/contexts/DocumentContext'

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext)

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects]
    newProjects[index][e.target.name] = e.target.value
    setResumeData({ ...resumeData, projects: newProjects })
  }

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: '',
          link: '',
          description: '',
          keyAchievements: '',
          startYear: '',
          endYear: '',
        },
      ],
    })
  }

  const removeProjects = (index) => {
    const newProjects = [...resumeData.projects]
    newProjects[index] = newProjects[newProjects.length - 1]
    newProjects.pop()
    setResumeData({ ...resumeData, projects: newProjects })
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-semibold text-white">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="flex flex-col">
          <div className="floating-label-group mb-2">
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full rounded bg-white px-2 py-1 text-gray-950"
              value={project.name}
              onChange={(e) => handleProjects(e, index)}
            />
            <label className="floating-label">Project Name</label>
          </div>
          <div className="floating-label-group mb-2">
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full rounded bg-white px-2 py-1 text-gray-950"
              value={project.link}
              onChange={(e) => handleProjects(e, index)}
            />
            <label className="floating-label">Link</label>
          </div>
          <div className="floating-label-group mb-2">
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="h-32 w-full rounded bg-white px-2 py-1 text-gray-950"
              value={project.description}
              maxLength="250"
              onChange={(e) => handleProjects(e, index)}
            />
            <label className="floating-label">Description</label>
          </div>
          <div className="floating-label-group mb-2">
            <textarea
              type="text"
              placeholder="Key Achievements"
              name="keyAchievements"
              className="h-40 w-full rounded bg-white px-2 py-1 text-gray-950"
              value={project.keyAchievements}
              onChange={(e) => handleProjects(e, index)}
            />
            <label className="floating-label">Key Achievements</label>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="floating-label-group">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="rounded bg-white px-2 py-1 text-gray-950"
                value={project.startYear}
                onChange={(e) => handleProjects(e, index)}
              />
              <label className="floating-label">Start Year</label>
            </div>
            <div className="floating-label-group">
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="rounded bg-white px-2 py-1 text-gray-950"
                value={project.endYear}
                onChange={(e) => handleProjects(e, index)}
              />
              <label className="floating-label">End Year</label>
            </div>
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.projects.length}
        add={addProjects}
        remove={removeProjects}
        label="Project"
      />
    </div>
  )
}

export default Projects
