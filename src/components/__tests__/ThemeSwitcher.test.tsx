import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useTheme } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('ThemeSwitcher', () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state before mounted', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    const { container } = render(<ThemeSwitcher />)
    // Initially should show the placeholder state (no icon visible yet)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('renders sun icon in dark mode after mounting', async () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    render(<ThemeSwitcher />)

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  it('renders moon icon in light mode after mounting', async () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    })

    render(<ThemeSwitcher />)

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  it('toggles theme from dark to light when clicked', async () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    render(<ThemeSwitcher />)

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      })
      fireEvent.click(button)
      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })
  })

  it('toggles theme from light to dark when clicked', async () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    })

    render(<ThemeSwitcher />)

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      })
      fireEvent.click(button)
      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })
  })

  it('has proper accessibility attributes', async () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    render(<ThemeSwitcher />)

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      })
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
      expect(button).toHaveAttribute('title', 'Switch to light mode')
    })
  })
})
