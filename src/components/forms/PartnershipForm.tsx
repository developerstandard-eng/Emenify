import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input, Select, Textarea } from '@/components/ui'
import { partnership } from '@/data/site'
import { partnershipSchema, type PartnershipValues } from '@/lib/schemas'
import { FormError, Honeypot, RequiredNote, SuccessPanel } from './FormParts'
import { useFormSubmission } from './useFormSubmission'

const typeOptions = [...partnership.models.map((m) => ({ value: m.name, label: `${m.name} partner` })), { value: 'Not sure yet', label: 'Not sure yet' }]

export function PartnershipForm() {
  const { status, error, submit, reset, honeypotRef } = useFormSubmission('business-partnership')
  const defaults: PartnershipValues = { name: '', company: '', email: '', phone: '', partnershipType: '', message: '', consent: false }
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<PartnershipValues>({ resolver: zodResolver(partnershipSchema), mode: 'onTouched', defaultValues: defaults })

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Thank you for your interest"
        message="Our partnerships team will review your details and contact you within two business days."
        onReset={() => {
          resetForm(defaults)
          reset()
        }}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative space-y-5" aria-label="Partnership application">
      <Honeypot ref={honeypotRef} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <Input label="Company" required autoComplete="organization" error={errors.company?.message} {...register('company')} />
        <Input label="Work email" required type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" required type="tel" autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register('phone')} />
      </div>
      <Select label="Partnership type" required options={typeOptions} error={errors.partnershipType?.message} {...register('partnershipType')} />
      <Textarea
        label="About your business"
        required
        hint="Your market, typical clients and what you would like to offer with us."
        error={errors.message?.message}
        {...register('message')}
      />
      <Checkbox label="I agree that Emenify may store these details to respond to my application." error={errors.consent?.message} {...register('consent')} />
      {/* TODO(prod): reCAPTCHA v3 runs invisibly inside submitForm (src/lib/recaptcha.ts) */}
      <FormError message={error} />
      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <RequiredNote />
        <Button type="submit" loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Apply to partner'}
        </Button>
      </div>
    </form>
  )
}
