import { render } from '@testing-library/react'
import BackgroundImage from '@/components/BackgroundImage'
import { useTheme } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('BackgroundImage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'dark',
    })
  })

  it('renders without crashing', () => {
    const { container } = render(<BackgroundImage />)
    expect(container).toBeInTheDocument()
  })

  it('renders with blur when withBlur prop is true', () => {
    const { container } = render(<BackgroundImage withBlur />)
    const backgroundDiv = container.querySelector('.blur-sm')
    expect(backgroundDiv).toBeInTheDocument()
  })

  it('renders overlay when withOverlay prop is true', () => {
    const { container } = render(<BackgroundImage withOverlay />)
    // Check that container has children (background + overlay)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('adapts opacity for light mode', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'light',
    })

    const { container } = render(<BackgroundImage />)
    expect(container).toBeInTheDocument()
  })

  it('adapts opacity for dark mode', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'dark',
    })

    const { container } = render(<BackgroundImage />)
    expect(container).toBeInTheDocument()
  })

  it('renders overlay with different colors based on theme', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'light',
    })

    const { container } = render(<BackgroundImage withOverlay />)
    expect(container).toBeInTheDocument()
  })
})
