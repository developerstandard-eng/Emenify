import { z } from 'zod'

const PHONE = /^\+?[0-9 ()-]{7,20}$/

const name = z.string().trim().min(2, 'Enter your full name').max(80, 'Name is too long')
const email = z.string().trim().min(1, 'Enter your email address').email('Enter a valid email address, like name@company.com')
const phone = z.string().trim().min(1, 'Enter your phone number').regex(PHONE, 'Enter a valid phone number, including country code')
const optionalPhone = z
  .string()
  .trim()
  .refine((v) => v === '' || PHONE.test(v), 'Enter a valid phone number, including country code')
const optionalText = z.string().trim().max(2000, 'Please keep this under 2,000 characters')
const message = (min: number) =>
  z.string().trim().min(min, `Please write at least ${min} characters`).max(2000, 'Please keep your message under 2,000 characters')
const consent = z.boolean().refine((v) => v, 'Please accept so we can reply to you')

export const generalEnquirySchema = z.object({
  name,
  company: z.string().trim().max(120),
  email,
  phone: optionalPhone,
  topic: z.string().min(1, 'Choose a topic'),
  message: message(10),
  consent,
})
export type GeneralEnquiryValues = z.infer<typeof generalEnquirySchema>

export const partnershipSchema = z.object({
  name,
  company: z.string().trim().min(2, 'Enter your company name').max(120),
  email,
  phone,
  partnershipType: z.string().min(1, 'Choose a partnership type'),
  message: message(20),
  consent,
})
export type PartnershipValues = z.infer<typeof partnershipSchema>

export const trainingEnquirySchema = z.object({
  name,
  company: z.string().trim().max(120),
  email,
  phone,
  event: z.string().min(1, 'Choose a course'),
  attendees: z
    .string()
    .trim()
    .min(1, 'Enter the number of attendees')
    .refine((v) => /^\d+$/.test(v) && Number(v) >= 1, 'Enter a whole number, 1 or more')
    .refine((v) => Number(v) <= 50, 'For more than 50 attendees, describe your needs in the message'),
  message: optionalText,
  consent,
})
export type TrainingEnquiryValues = z.infer<typeof trainingEnquirySchema>

export const CV_MAX_BYTES = 5 * 1024 * 1024
export const CV_EXTENSIONS = ['.pdf', '.doc', '.docx']
export const CV_ACCEPT =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export function validateCvFile(file: File): string | null {
  if (!CV_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))) return 'Upload a PDF, DOC or DOCX file'
  if (file.size > CV_MAX_BYTES) return 'The file is larger than 5 MB. Please upload a smaller file'
  return null
}

export const careersSchema = z.object({
  name,
  email,
  phone,
  position: z.string().min(1, 'Choose a position'),
  linkedin: z
    .string()
    .trim()
    .refine((v) => v === '' || /^https?:\/\/\S+\.\S+/.test(v), 'Enter a full URL starting with https://'),
  cv: z
    .custom<File | null>((v) => v === null || v instanceof File)
    .superRefine((file, ctx) => {
      if (!(file instanceof File)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Attach your CV' })
        return
      }
      const error = validateCvFile(file)
      if (error) ctx.addIssue({ code: z.ZodIssueCode.custom, message: error })
    }),
  message: optionalText,
  consent,
})
export type CareersValues = z.infer<typeof careersSchema>
