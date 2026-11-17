import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input, Select, Textarea } from '@/components/ui'
import { enquiryTopics } from '@/lib/enquiryTopics'
import { generalEnquirySchema, type GeneralEnquiryValues } from '@/lib/schemas'
import { FormError, Honeypot, RequiredNote, SuccessPanel } from './FormParts'
import { useFormSubmission } from './useFormSubmission'

export function GeneralEnquiryForm({ defaultTopic = '' }: { defaultTopic?: string }) {
  const { status, error, submit, reset, honeypotRef } = useFormSubmission('general-enquiry')
  const defaults: GeneralEnquiryValues = { name: '', company: '', email: '', phone: '', topic: defaultTopic, message: '', consent: false }
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<GeneralEnquiryValues>({ resolver: zodResolver(generalEnquirySchema), mode: 'onTouched', defaultValues: defaults })

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Thank you, your enquiry is with us"
        message="A member of our team will reply within one business day. For urgent support issues, please call our service desk."
        onReset={() => {
          resetForm(defaults)
          reset()
        }}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative space-y-5" aria-label="General enquiry">
      <Honeypot ref={honeypotRef} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <Input label="Company" autoComplete="organization" error={errors.company?.message} {...register('company')} />
        <Input label="Work email" required type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register('phone')} />
      </div>
      <Select label="What is it about?" required options={enquiryTopics} error={errors.topic?.message} {...register('topic')} />
      <Textarea label="Message" required hint="Tell us about your systems, team size or timeline." error={errors.message?.message} {...register('message')} />
      {/* TODO(client): link to privacy policy once available */}
      <Checkbox label="I agree that Emenify may store these details to reply to my enquiry." error={errors.consent?.message} {...register('consent')} />
      {/* TODO(prod): reCAPTCHA v3 runs invisibly inside submitForm (src/lib/recaptcha.ts) */}
      <FormError message={error} />
      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <RequiredNote />
        <Button type="submit" loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </Button>
      </div>
    </form>
  )
}
