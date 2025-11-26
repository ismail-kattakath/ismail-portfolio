import { render, screen } from '@testing-library/react'
import BookPage from '@/app/book/page'

// Mock resumeAdapter
jest.mock('@/lib/resumeAdapter', () => ({
  __esModule: true,
  default: {
    name: 'Test User',
    position: 'Developer',
    email: 'test@example.com',
    phone: '+1234567890',
    location: 'Test City',
    summary: 'Test summary',
    website: 'test.com',
    showSummary: true,
    workExperience: [],
    education: [],
    skillGroups: [],
    projects: [],
    certifications: [],
    languages: [],
    socialMedia: {},
    calendarLink: 'https://calendar.google.com/test',
  },
}))

describe('BookPage', () => {
  it('should render loading state', () => {
    render(<BookPage />)

    expect(
      screen.getByText('Redirecting to booking page...')
    ).toBeInTheDocument()
    expect(screen.getByText(/If you're not redirected/)).toBeInTheDocument()
  })

  it('should show spinner animation', () => {
    const { container } = render(<BookPage />)
    const spinner = container.querySelector('.animate-spin')

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('rounded-full', 'border-b-2')
  })

  it('should display calendar link', () => {
    render(<BookPage />)

    const link = screen.getByRole('link', { name: 'click here' })
    expect(link).toHaveAttribute('href', 'https://calendar.google.com/test')
  })

  it('should render redirect message with conditional link', () => {
    const { container } = render(<BookPage />)

    expect(container.textContent).toContain('Redirecting to booking page...')
    expect(container.textContent).toContain("If you're not redirected")
  })
})
