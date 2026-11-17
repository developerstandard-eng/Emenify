import { getRecaptchaToken } from './recaptcha'

export type FormType = 'general-enquiry' | 'business-partnership' | 'careers-application' | 'training-enquiry'

export interface SubmitResult {
  ok: boolean
  message?: string
}

const SIMULATED_DELAY_MS = 800

/**
 * Single entry point for every form on the site.
 *
 * - If VITE_FORM_ENDPOINT is set, POSTs multipart/form-data to it (files included).
 * - Otherwise simulates success after 800ms and logs the payload (design review build).
 *
 * In production the endpoint emails every submission to the client's inbox.
 * TODO(client): confirm the destination email address (currently assumed info@emenify.com).
 */
export async function submitForm(type: FormType, payload: Record<string, unknown>): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  const token = await getRecaptchaToken(type)

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS))
    console.info(`[submitForm] ${type}`, payload)
    return { ok: true }
  }

  const body = new FormData()
  body.append('form_type', type)
  if (token) body.append('recaptcha_token', token)
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null || value === '') continue
    if (value instanceof Blob) body.append(key, value)
    else body.append(key, String(value))
  }

  try {
    const res = await fetch(endpoint, { method: 'POST', body })
    if (!res.ok) return { ok: false, message: 'The server could not accept your message. Please try again.' }
    return { ok: true }
  } catch {
    return { ok: false, message: 'We could not reach the server. Check your connection and try again.' }
  }
}
