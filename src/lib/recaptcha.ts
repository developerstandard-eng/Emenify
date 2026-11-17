/**
 * TODO(prod): Google reCAPTCHA v3
 * --------------------------------
 * 1. Set VITE_RECAPTCHA_SITE_KEY in .env.
 * 2. Load https://www.google.com/recaptcha/api.js?render=<SITE_KEY> once, lazily on the
 *    first form focus to keep it off the critical path.
 * 3. Replace the body below with:
 *      await new Promise<void>((r) => window.grecaptcha.ready(r))
 *      return window.grecaptcha.execute(SITE_KEY, { action })
 * 4. Verify the token server-side (score >= 0.5) before sending the email.
 *
 * Until then this returns null and submitForm sends no token.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  void action
  return null
}
