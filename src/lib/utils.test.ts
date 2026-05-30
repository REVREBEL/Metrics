import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sleep } from './utils'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('resolves after the specified amount of time', async () => {
    const sleepPromise = sleep(1000)

    let isResolved = false
    sleepPromise.then(() => {
      isResolved = true
    })

    // Fast-forward time by 500ms
    vi.advanceTimersByTime(500)

    // Flush microtasks to allow any pending promise callbacks to run
    await Promise.resolve()
    expect(isResolved).toBe(false)

    // Fast-forward the rest of the time
    vi.advanceTimersByTime(500)

    // Flush microtasks again
    await Promise.resolve()
    expect(isResolved).toBe(true)
  })

  it('works with 0 ms', async () => {
    const sleepPromise = sleep(0)

    let isResolved = false
    sleepPromise.then(() => {
      isResolved = true
    })

    vi.advanceTimersByTime(0)

    // Flush microtasks
    await Promise.resolve()
    expect(isResolved).toBe(true)
  })
})
