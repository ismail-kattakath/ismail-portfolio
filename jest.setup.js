import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// Suppress React act() warnings in tests
// These warnings appear when async state updates happen outside act()
// but are expected in our test scenarios
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    // Suppress React act() warnings
    if (
      typeof args[0] === 'string' &&
      args[0].includes('not wrapped in act')
    ) {
      return
    }
    // Suppress intentional "Authentication error" test console.error
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Authentication error:')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
