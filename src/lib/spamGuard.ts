import { useCallback, useRef } from 'react'

/** Bots usually submit faster than a person can read the form. */
export const MIN_SUBMIT_MS = 3000
export const HONEYPOT_NAME = 'website_url'

export type GuardResult = 'ok' | 'honeypot' | 'too-fast'

/**
 * Honeypot + minimum time-to-submit check.
 * Attach `honeypotRef` to a hidden input; call `check()` before submitting.
 */
export function useSpamGuard() {
  const startedAt = useRef(Date.now())
  const honeypotRef = useRef<HTMLInputElement>(null)

  const check = useCallback((): GuardResult => {
    if (honeypotRef.current?.value) return 'honeypot'
    if (Date.now() - startedAt.current < MIN_SUBMIT_MS) return 'too-fast'
    return 'ok'
  }, [])

  const reset = useCallback(() => {
    startedAt.current = Date.now()
    if (honeypotRef.current) honeypotRef.current.value = ''
  }, [])

  return { check, reset, honeypotRef }
}
