import { FileText, UploadCloud, X } from 'lucide-react'
import { useId, useRef, useState, type DragEvent } from 'react'
import { cn } from '@/lib/cn'
import { FieldLabel, FieldMessage } from './Field'

interface Props {
  label: string
  value: File | null
  onChange: (file: File | null) => void
  onBlur?: () => void
  accept: string
  hint?: string
  error?: string
  required?: boolean
  name?: string
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUpload({ label, value, onChange, onBlur, accept, hint, error, required, name }: Props) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const pick = (files: FileList | null) => onChange(files?.[0] ?? null)

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    pick(e.dataTransfer.files)
  }

  const remove = () => {
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>

      {value ? (
        <div
          className={cn(
            'flex items-center gap-3 rounded-input border bg-mist px-4 py-3',
            error ? 'border-red-600' : 'border-line',
          )}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-navy shadow-soft">
            <FileText className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.875rem] font-medium text-navy">{value.name}</p>
            <p className="text-meta text-body">{formatSize(value.size)}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-white hover:text-navy"
            aria-label={`Remove ${value.name}`}
          >
            <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'relative flex flex-col items-center justify-center gap-2 rounded-input border border-dashed px-6 py-7 text-center transition-colors',
            'focus-within:border-accent focus-within:shadow-focus',
            dragging ? 'border-cobalt bg-tint' : error ? 'border-red-600 bg-white' : 'border-[#CBD5E1] bg-mist hover:border-cobalt',
          )}
        >
          <UploadCloud className="h-6 w-6 text-cobalt" strokeWidth={1.5} aria-hidden />
          <p className="text-[0.875rem] text-body">
            <span className="font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4">Choose a file</span> or drag
            it here
          </p>
          {/* The input covers the drop zone so the whole area is clickable and keyboard focusable. */}
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="file"
            accept={accept}
            onChange={(e) => pick(e.target.files)}
            onBlur={onBlur}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      )}
      <FieldMessage id={errorId} error={error} hint={hint} hintId={hintId} />
    </div>
  )
}
