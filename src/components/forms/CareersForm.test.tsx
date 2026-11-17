import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { jobs } from '@/data/jobs'
import { submitForm } from '@/lib/forms'
import { honeypot, mockClock } from '@/test/utils'
import { CareersForm } from './CareersForm'

vi.mock('@/lib/forms', () => ({ submitForm: vi.fn().mockResolvedValue({ ok: true }) }))

const job = jobs[0]
const pdf = () => new File(['%PDF-1.4 cv'], 'jane-doe-cv.pdf', { type: 'application/pdf' })

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full name/), 'Jane Doe')
  await user.type(screen.getByLabelText(/^Email/), 'jane@example.com')
  await user.type(screen.getByLabelText(/^Phone/), '+971 50 000 1111')
  await user.upload(screen.getByLabelText(/^CV/), pdf())
  await user.click(screen.getByLabelText(/I agree/))
}

describe('CareersForm', () => {
  let clock: ReturnType<typeof mockClock>
  beforeEach(() => {
    vi.mocked(submitForm).mockClear()
    clock = mockClock()
  })
  afterEach(() => clock.restore())

  it('shows inline errors, including a missing CV', async () => {
    const user = userEvent.setup()
    render(<CareersForm />)
    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(await screen.findByText('Attach your CV')).toBeInTheDocument()
    expect(screen.getByText('Choose a position')).toBeInTheDocument()
    expect(screen.getByText('Enter your full name')).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('rejects files of the wrong type or over 5 MB, and allows removing them', async () => {
    const user = userEvent.setup({ applyAccept: false })
    render(<CareersForm position={job.title} />)

    await user.upload(screen.getByLabelText(/^CV/), new File(['x'], 'cv.txt', { type: 'text/plain' }))
    await user.click(screen.getByRole('button', { name: /submit application/i }))
    expect(await screen.findByText('Upload a PDF, DOC or DOCX file')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove cv.txt/i }))
    const big = pdf()
    Object.defineProperty(big, 'size', { value: 6 * 1024 * 1024 })
    await user.upload(screen.getByLabelText(/^CV/), big)
    expect(await screen.findByText(/larger than 5 MB/)).toBeInTheDocument()
    expect(screen.getByText('jane-doe-cv.pdf')).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('prefills the position and submits with the CV attached', async () => {
    const user = userEvent.setup()
    render(<CareersForm position={job.title} />)
    expect(screen.getByLabelText(/^Position/)).toHaveValue(job.title)

    await fillValid(user)
    expect(screen.getByText('jane-doe-cv.pdf')).toBeInTheDocument()
    clock.pass()
    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(await screen.findByRole('heading', { name: /application received/i })).toBeInTheDocument()
    expect(submitForm).toHaveBeenCalledWith(
      'careers-application',
      expect.objectContaining({ position: job.title, name: 'Jane Doe', cv: expect.any(File) }),
    )
  })

  it('does not send when the honeypot is filled', async () => {
    const user = userEvent.setup()
    const { container } = render(<CareersForm position={job.title} />)
    await fillValid(user)
    honeypot(container).value = 'bot'
    clock.pass()
    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(await screen.findByRole('heading', { name: /application received/i })).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })
})
