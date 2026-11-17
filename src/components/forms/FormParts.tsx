import { AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react'
import { forwardRef, useEffect, useRef } from 'react'
import { HONEYPOT_NAME } from '@/lib/spamGuard'

/** Hidden from people and assistive tech; bots that fill every field trip it. */
export const Honeypot = forwardRef<HTMLInputElement>(function Honeypot(_, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input ref={ref} type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
})

export function FormError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div role="alert" className="flex items-start gap-3 rounded-input border border-[#FCD9B6] bg-accent-soft px-4 py-3 text-[0.875rem] text-navy">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" strokeWidth={1.75} aria-hidden />
      {message}
    </div>
  )
}

export function SuccessPanel({ title, message, onReset, resetLabel = 'Send another' }: { title: string; message: string; onReset: () => void; resetLabel?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])
  return (
    <div className="flex flex-col items-start gap-5 py-4" role="status">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-tint text-cobalt">
        <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </span>
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="text-[1.375rem] font-bold focus:outline-none">
          {title}
        </h3>
        <p className="mt-2 max-w-prose text-body">{message}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded font-heading text-[0.9375rem] font-semibold text-navy underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-cobalt"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        {resetLabel}
      </button>
    </div>
  )
}

export function RequiredNote() {
  return (
    <p className="text-meta text-body">
      Fields marked <span className="text-[#B45309]">*</span> are required.
    </p>
  )
}
