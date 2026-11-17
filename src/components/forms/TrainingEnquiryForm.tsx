import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input, Select, Textarea } from '@/components/ui'
import { events } from '@/data/events'
import { fmt } from '@/lib/dates'
import { trainingEnquirySchema, type TrainingEnquiryValues } from '@/lib/schemas'
import { FormError, Honeypot, RequiredNote, SuccessPanel } from './FormParts'
import { useFormSubmission } from './useFormSubmission'

const CUSTOM = 'custom-program'

const eventOptions = [
  ...events.map((e) => ({ value: e.id, label: `${e.title} · ${fmt.day(new Date(e.start))} ${fmt.monthShort(new Date(e.start))}` })),
  { value: CUSTOM, label: 'A custom program for my team' },
]

export function TrainingEnquiryForm({ defaultEvent = '' }: { defaultEvent?: string }) {
  const { status, error, submit, reset, honeypotRef } = useFormSubmission('training-enquiry')
  const defaults: TrainingEnquiryValues = { name: '', company: '', email: '', phone: '', event: defaultEvent, attendees: '1', message: '', consent: false }
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<TrainingEnquiryValues>({ resolver: zodResolver(trainingEnquirySchema), mode: 'onTouched', defaultValues: defaults })

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Your registration request is in"
        message="We will confirm your seat, joining details and invoice by email within one business day."
        onReset={() => {
          resetForm(defaults)
          reset()
        }}
        resetLabel="Register someone else"
      />
    )
  }

  const onValid = (v: TrainingEnquiryValues) => {
    const event = events.find((e) => e.id === v.event)
    return submit({ ...v, eventTitle: event?.title ?? 'Custom program', eventStart: event?.start })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className="relative space-y-5" aria-label="Training registration">
      <Honeypot ref={honeypotRef} />
      <Select label="Course" required options={eventOptions} placeholder="Select a course" error={errors.event?.message} {...register('event')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <Input label="Company" autoComplete="organization" error={errors.company?.message} {...register('company')} />
        <Input label="Work email" required type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" required type="tel" autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register('phone')} />
      </div>
      <Input
        label="Number of attendees"
        required
        type="number"
        min={1}
        max={50}
        inputMode="numeric"
        className="sm:max-w-[12rem]"
        error={errors.attendees?.message}
        {...register('attendees')}
      />
      <Textarea label="Anything we should know?" rows={3} error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree that Emenify may store these details to process my registration." error={errors.consent?.message} {...register('consent')} />
      {/* TODO(prod): reCAPTCHA v3 runs invisibly inside submitForm (src/lib/recaptcha.ts) */}
      <FormError message={error} />
      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <RequiredNote />
        <Button type="submit" loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send registration'}
        </Button>
      </div>
    </form>
  )
}
