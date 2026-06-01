import { describe, it, expect, vi, afterEach } from 'vitest'
import { colorFormatter } from './color-converter'
import type chromaType from 'chroma-js'

// We need to mock chroma to simulate a valid color creation that throws when rgb() is called
vi.mock('chroma-js', async (importOriginal) => {
  const actual = await importOriginal<typeof chromaType>()

  const mockChroma = (color: string) => {
    if (color === 'mock-rgb-throw') {
      return {
        rgb: () => { throw new Error('simulated rgb error') },
        hex: () => '#000000',
        hsl: () => [0, 0, 0],
        oklch: () => [0, 0, 0]
      }
    }
    return actual.default(color)
  }

  // Need to provide the static properties as well
  Object.assign(mockChroma, actual.default)

  return {
    ...actual,
    default: mockChroma
  }
})

describe('colorFormatter error paths', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return the original string when color.rgb() throws an error', () => {
    // This allows us to test the specific try-catch around color.rgb()
    // try { color.rgb() } catch { return colorValue }

    // Using a special string that our mock intercepts
    const colorValue = 'mock-rgb-throw'
    const result = colorFormatter(colorValue, 'hex')

    // It should hit the inner catch and return the original string
    expect(result).toBe(colorValue)
  })

  it('should catch errors from chroma.js parsing and return original string', () => {
    // Suppress console.warn for this test to keep test output clean
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // This string causes chroma() itself to throw an error
    const invalidColor = 'this-is-not-a-valid-color'
    const result = colorFormatter(invalidColor, 'hex')

    // It should hit the outer catch and return the original string
    expect(result).toBe(invalidColor)

    // Verify the warning was logged
    expect(consoleSpy).toHaveBeenCalledWith('Color conversion error:', expect.any(Error))
  })
})
