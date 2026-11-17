import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Checkbox, FileUpload, Input, Select, Textarea } from '@/components/ui'
import { jobs, OPEN_APPLICATION } from '@/data/jobs'
import { careersSchema, CV_ACCEPT, type CareersValues } from '@/lib/schemas'
import { FormError, Honeypot, RequiredNote, SuccessPanel } from './FormParts'
import { useFormSubmission } from './useFormSubmission'

const positionOptions = [...jobs.map((j) => ({ value: j.title, label: `${j.title} · ${j.location}` })), { value: OPEN_APPLICATION, label: OPEN_APPLICATION }]

/** `position` is controlled by the page so "Apply" buttons can prefill it. */
export function CareersForm({ position = '' }: { position?: string }) {
  const { status, error, submit, reset, honeypotRef } = useFormSubmission('careers-application')
  const defaults: CareersValues = { name: '', email: '', phone: '', position, linkedin: '', cv: null, message: '', consent: false }
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<CareersValues>({ resolver: zodResolver(careersSchema), mode: 'onTouched', reValidateMode: 'onChange', defaultValues: defaults })

  useEffect(() => {
    if (position) setValue('position', position, { shouldValidate: true })
  }, [position, setValue])

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Application received"
        message="Thank you for applying. Our recruitment team reviews every CV and will contact shortlisted candidates within ten business days."
        onReset={() => {
          resetForm({ ...defaults, position: '' })
          reset()
        }}
        resetLabel="Submit another application"
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative space-y-5" aria-label="Job application">
      <Honeypot ref={honeypotRef} />
      <Select label="Position" required options={positionOptions} placeholder="Select a position" error={errors.position?.message} {...register('position')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" required type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" required type="tel" autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register('phone')} />
        <Input
          label="LinkedIn profile"
          type="url"
          autoComplete="url"
          inputMode="url"
          placeholder="https://linkedin.com/in/…"
          error={errors.linkedin?.message}
          {...register('linkedin')}
        />
      </div>
      <Controller
        control={control}
        name="cv"
        render={({ field }) => (
          <FileUpload
            label="CV"
            required
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            accept={CV_ACCEPT}
            hint="PDF, DOC or DOCX, up to 5 MB."
            error={errors.cv?.message}
          />
        )}
      />
      <Textarea label="Cover note" rows={4} error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree that Emenify may keep my CV for up to 12 months for this and similar roles." error={errors.consent?.message} {...register('consent')} />
      {/* TODO(prod): reCAPTCHA v3 runs invisibly inside submitForm (src/lib/recaptcha.ts) */}
      <FormError message={error} />
      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <RequiredNote />
        <Button type="submit" loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Submit application'}
        </Button>
      </div>
    </form>
  )
}
