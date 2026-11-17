import { AlertCircle, ChevronDown } from 'lucide-react'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface FieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

const control =
  'w-full rounded-input border bg-white text-[0.9375rem] text-navy transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:outline-none focus-visible:ring-0 focus:border-accent focus:shadow-focus'

const controlState = (error?: string) => (error ? 'border-red-600' : 'border-line hover:border-[#CBD5E1]')

function useFieldIds(error?: string, hint?: string) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined
  return { id, errorId, hintId, describedBy }
}

export function FieldLabel({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.875rem] font-medium text-navy">
      {children}
      {required ? (
        <span className="ml-0.5 text-[#B45309]" aria-hidden>
          *
        </span>
      ) : (
        <span className="ml-1.5 font-normal text-body">(optional)</span>
      )}
    </label>
  )
}

export function FieldMessage({ id, error, hint, hintId }: { id: string; error?: string; hint?: string; hintId: string }) {
  return (
    <>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-meta text-body">
          {hint}
        </p>
      )}
      {error && (
        <p id={id} className="mt-1.5 flex items-start gap-1.5 text-meta font-medium text-red-700" role="alert">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </>
  )
}

type InputProps = FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, hint, required, className, ...rest }, ref) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint)
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        ref={ref}
        id={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(control, controlState(error), 'h-12 px-4')}
        {...rest}
      />
      <FieldMessage id={errorId} error={error} hint={hint} hintId={hintId} />
    </div>
  )
})

type SelectProps = FieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    options: { value: string; label: string }[]
    placeholder?: string
  }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, required, className, options, placeholder = 'Select an option', ...rest },
  ref,
) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint)
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, controlState(error), 'h-12 appearance-none pl-4 pr-11')}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body" strokeWidth={1.75} aria-hidden />
      </div>
      <FieldMessage id={errorId} error={error} hint={hint} hintId={hintId} />
    </div>
  )
})

type TextareaProps = FieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, required, className, rows = 5, ...rest },
  ref,
) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint)
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(control, controlState(error), 'resize-y px-4 py-3 leading-body')}
        {...rest}
      />
      <FieldMessage id={errorId} error={error} hint={hint} hintId={hintId} />
    </div>
  )
})

type CheckboxProps = { label: ReactNode; error?: string; className?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, error, className, ...rest }, ref) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border accent-navy',
            error ? 'border-red-600' : 'border-line',
          )}
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.875rem] leading-[1.55] text-body">
          {label}
        </label>
      </div>
      <FieldMessage id={errorId} error={error} hintId="" />
    </div>
  )
})
