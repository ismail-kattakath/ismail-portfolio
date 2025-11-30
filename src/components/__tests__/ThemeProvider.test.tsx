import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useTheme } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  useTheme: jest.fn(),
}))

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-component">Test Child</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child-component')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('wraps children with NextThemesProvider', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-component">Test Child</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
  })

  it('renders multiple children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
