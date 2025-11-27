import React from 'react'
import Skill from '@/components/resume/forms/Skill'
import {
  renderWithContext,
  createMockResumeData,
  screen,
  fireEvent,
} from '@/lib/__tests__/test-utils'

// Store the onDragEnd callback for testing
let capturedOnDragEnd: ((result: unknown) => void) | null = null

// Mock drag-and-drop components
jest.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children, onDragEnd }: any) => {
    capturedOnDragEnd = onDragEnd
    return (
      <div data-testid="drag-drop-context" onDragEnd={onDragEnd}>
        {children}
      </div>
    )
  },
  Droppable: ({ children, droppableId }: any) => {
    const provided = {
      droppableProps: {
        'data-droppable-id': droppableId,
      },
      innerRef: jest.fn(),
      placeholder: null,
    }
    const snapshot = {
      isDraggingOver: false,
    }
    return (
      <div data-testid="droppable" {...provided.droppableProps}>
        {children(provided, snapshot)}
      </div>
    )
  },
  Draggable: ({ children, draggableId, index }: any) => {
    const provided = {
      draggableProps: {
        'data-draggable-id': draggableId,
        'data-index': index,
      },
      dragHandleProps: {},
      innerRef: jest.fn(),
    }
    const snapshot = {
      isDragging: false,
    }
    return (
      <div data-testid="draggable" {...provided.draggableProps}>
        {children(provided, snapshot)}
      </div>
    )
  },
}))

describe('Skill Component', () => {
  describe('Rendering', () => {
    it('should render skills as text labels', async () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Technical Skills',
            skills: [{ text: 'JavaScript' }, { text: 'TypeScript' }],
          },
        ],
      })

      renderWithContext(<Skill title="Technical Skills" />, {
        contextValue: { resumeData: mockData },
      })

      // Wait a tick for dynamic imports to resolve
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('should display skill text as non-editable labels', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Languages',
            skills: [{ text: 'Python' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Languages" />, {
        contextValue: { resumeData: mockData },
      })

      // Should not have any input elements
      const inputs = container.querySelectorAll('input')
      expect(inputs.length).toBe(0)

      // Should display text as label
      expect(screen.getByText('Python')).toBeInTheDocument()
    })

    it('should render add button with FormButton', () => {
      const mockData = createMockResumeData({
        skills: [{ title: 'Frameworks', skills: [] }],
      })

      renderWithContext(<Skill title="Frameworks" />, {
        contextValue: { resumeData: mockData },
      })

      const addButton = screen.getByText(/Add Frameworks/i)
      expect(addButton).toBeInTheDocument()
    })
  })

  describe('Add Functionality', () => {
    it('should add new skill when add button is clicked', () => {
      const mockSetResumeData = jest.fn()
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Existing Skill' }],
          },
        ],
      })

      renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      const addButton = screen.getByText(/Add Skills/i).closest('button')

      if (addButton) {
        fireEvent.click(addButton)

        expect(mockSetResumeData).toHaveBeenCalled()
        const callback = mockSetResumeData.mock.calls[0][0]
        const newState = callback(mockData)

        expect(newState.skills[0].skills.length).toBe(2)
        expect(newState.skills[0].skills[1]).toEqual({
          text: '',
        })
      }
    })
  })

  describe('Delete Functionality', () => {
    it('should render remove button with X icon for each skill', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Test Skill' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      const removeButton = container.querySelector(
        'button[title="Remove skill"]'
      )

      expect(removeButton).toBeInTheDocument()
      expect(removeButton?.textContent).toBe('✕')
    })

    it('should delete skill when remove button is clicked', () => {
      const mockSetResumeData = jest.fn()
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Skill 1' }, { text: 'Skill 2' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      const removeButtons = container.querySelectorAll(
        'button[title="Remove skill"]'
      )

      if (removeButtons[0]) {
        fireEvent.click(removeButtons[0])

        expect(mockSetResumeData).toHaveBeenCalled()
        const callback = mockSetResumeData.mock.calls[0][0]
        const newState = callback(mockData)

        expect(newState.skills[0].skills.length).toBe(1)
        expect(newState.skills[0].skills[0].text).toBe('Skill 2')
      }
    })
  })

  describe('Text Display', () => {
    it('should display skill text correctly', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Skill 1' }, { text: 'Skill 2' }],
          },
        ],
      })

      renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      expect(screen.getByText('Skill 1')).toBeInTheDocument()
      expect(screen.getByText('Skill 2')).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('should apply hover effects to skill containers', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Test' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      const skillContainer = container.querySelector('.group')

      expect(skillContainer).toHaveClass(
        'hover:border-white/20',
        'hover:bg-white/10'
      )
    })

    it('should layout text label and remove button in row', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Test' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      const skillContainer = container.querySelector('.group')

      // Structure uses flex items-center inside the card
      const innerContainer = skillContainer?.querySelector('.flex.items-center')
      expect(innerContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Technical Skills',
            skills: [{ text: 'JavaScript' }, { text: 'Python' }],
          },
        ],
      })

      renderWithContext(<Skill title="Technical Skills" />, {
        contextValue: { resumeData: mockData },
      })

      // Check for skills displayed as text
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getByText('Python')).toBeInTheDocument()
    })

    it('should have title attribute on remove button', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'Test' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      const removeButton = container.querySelector(
        'button[title="Remove skill"]'
      )

      expect(removeButton).toHaveAttribute('title', 'Remove skill')
    })
  })

  describe('Multiple Skill Categories', () => {
    it('should only display skills for matching title', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Languages',
            skills: [{ text: 'JavaScript' }],
          },
          {
            title: 'Frameworks',
            skills: [{ text: 'React' }],
          },
        ],
      })

      renderWithContext(<Skill title="Languages" />, {
        contextValue: { resumeData: mockData },
      })

      // Should display JavaScript but not React
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.queryByText('React')).not.toBeInTheDocument()
    })

    it('should delete only skills for matching title', () => {
      const mockSetResumeData = jest.fn()
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Languages',
            skills: [{ text: 'JavaScript' }, { text: 'TypeScript' }],
          },
          {
            title: 'Frameworks',
            skills: [{ text: 'React' }],
          },
        ],
      })

      const { container } = renderWithContext(<Skill title="Languages" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      const removeButtons = container.querySelectorAll(
        'button[title="Remove skill"]'
      )

      if (removeButtons[0]) {
        fireEvent.click(removeButtons[0])

        const callback = mockSetResumeData.mock.calls[0][0]
        const newState = callback(mockData)

        // Languages category should have one less skill
        expect(newState.skills[0].skills.length).toBe(1)
        expect(newState.skills[0].skills[0].text).toBe('TypeScript')
        // Frameworks category should be unchanged
        expect(newState.skills[1].skills[0].text).toBe('React')
      }
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty skills array', () => {
      const mockData = createMockResumeData({
        skills: [{ title: 'Skills', skills: [] }],
      })

      renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      // Should still render the add button
      expect(screen.getByText(/Add Skills/i)).toBeInTheDocument()
    })

    it('should handle special characters in skill text', () => {
      const specialData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'C++/C#' }],
          },
        ],
      })

      renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: specialData },
      })

      expect(screen.getByText('C++/C#')).toBeInTheDocument()
    })

    it('should handle long skill text', () => {
      const longSkillText =
        'Very Long Skill Name That Might Overflow Or Cause Layout Issues'
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: longSkillText }],
          },
        ],
      })

      renderWithContext(<Skill title="Skills" />, {
        contextValue: { resumeData: mockData },
      })

      expect(screen.getByText(longSkillText)).toBeInTheDocument()
    })
  })

  describe('Drag and Drop Functionality', () => {
    it('should reorder skills from first to last position', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [
              { text: 'JavaScript' },
              { text: 'Python' },
              { text: 'Java' },
            ],
          },
        ],
      })
      const mockSetResumeData = jest.fn()

      renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      capturedOnDragEnd!({
        source: { droppableId: 'skills-Skills', index: 0 },
        destination: { droppableId: 'skills-Skills', index: 2 },
      })

      expect(mockSetResumeData).toHaveBeenCalled()
      const updater = mockSetResumeData.mock.calls[0][0]
      const result = updater(mockData)

      expect(result).toEqual({
        ...mockData,
        skills: [
          {
            title: 'Skills',
            skills: [
              { text: 'Python' },
              { text: 'Java' },
              { text: 'JavaScript' },
            ],
          },
        ],
      })
    })

    it('should reorder skills from last to first position', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [
              { text: 'JavaScript' },
              { text: 'Python' },
              { text: 'Java' },
            ],
          },
        ],
      })
      const mockSetResumeData = jest.fn()

      renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      capturedOnDragEnd!({
        source: { droppableId: 'skills-Skills', index: 2 },
        destination: { droppableId: 'skills-Skills', index: 0 },
      })

      expect(mockSetResumeData).toHaveBeenCalled()
      const updater = mockSetResumeData.mock.calls[0][0]
      const result = updater(mockData)

      expect(result).toEqual({
        ...mockData,
        skills: [
          {
            title: 'Skills',
            skills: [
              { text: 'Java' },
              { text: 'JavaScript' },
              { text: 'Python' },
            ],
          },
        ],
      })
    })

    it('should not reorder when dropped in same position', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'JavaScript' }, { text: 'Python' }],
          },
        ],
      })
      const mockSetResumeData = jest.fn()

      renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      capturedOnDragEnd!({
        source: { droppableId: 'skills-Skills', index: 0 },
        destination: { droppableId: 'skills-Skills', index: 0 },
      })

      expect(mockSetResumeData).not.toHaveBeenCalled()
    })

    it('should not reorder when dropped outside droppable area', () => {
      const mockData = createMockResumeData({
        skills: [
          {
            title: 'Skills',
            skills: [{ text: 'JavaScript' }, { text: 'Python' }],
          },
        ],
      })
      const mockSetResumeData = jest.fn()

      renderWithContext(<Skill title="Skills" />, {
        contextValue: {
          resumeData: mockData,
          setResumeData: mockSetResumeData,
        },
      })

      capturedOnDragEnd!({
        source: { droppableId: 'skills-Skills', index: 0 },
        destination: null,
      })

      expect(mockSetResumeData).not.toHaveBeenCalled()
    })
  })
})
