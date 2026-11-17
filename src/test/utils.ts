import { vi } from 'vitest'
import { MIN_SUBMIT_MS } from '@/lib/spamGuard'

/**
 * Controls Date.now so the minimum time-to-submit check can be passed without real waiting.
 * Call `pass()` after filling the form and before submitting.
 */
export function mockClock() {
  let now = 1_700_000_000_000
  const spy = vi.spyOn(Date, 'now').mockImplementation(() => now)
  return {
    pass: () => {
      now += MIN_SUBMIT_MS + 1000
    },
    restore: () => spy.mockRestore(),
  }
}

export function honeypot(container: HTMLElement) {
  const el = container.querySelector<HTMLInputElement>('input[name="website_url"]')
  if (!el) throw new Error('Honeypot input not found')
  return el
}
