import { useCallback, useState } from 'react'
import { submitForm, type FormType } from '@/lib/forms'
import { useSpamGuard } from '@/lib/spamGuard'

type Status = 'idle' | 'submitting' | 'success'

/**
 * Shared submit flow for every form: spam guard → submitForm → success panel.
 * A filled honeypot shows the success panel but sends nothing, so bots get no signal.
 */
export function useFormSubmission(type: FormType) {
  const { check, reset: resetGuard, honeypotRef } = useSpamGuard()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setError(null)
      const result = check()
      if (result === 'honeypot') {
        setStatus('success')
        return
      }
      if (result === 'too-fast') {
        setError('That was quick. Please check your details and press send again.')
        return
      }
      setStatus('submitting')
      const res = await submitForm(type, payload)
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('idle')
        setError(res.message ?? 'Something went wrong. Please try again.')
      }
    },
    [check, type],
  )

  const reset = useCallback(() => {
    resetGuard()
    setError(null)
    setStatus('idle')
  }, [resetGuard])

  return { status, error, submit, reset, honeypotRef }
}
