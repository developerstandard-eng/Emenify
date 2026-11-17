import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { submitForm } from '@/lib/forms'
import { honeypot, mockClock } from '@/test/utils'
import { GeneralEnquiryForm } from './GeneralEnquiryForm'

vi.mock('@/lib/forms', () => ({ submitForm: vi.fn().mockResolvedValue({ ok: true }) }))

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full name/), 'Jane Doe')
  await user.type(screen.getByLabelText(/^Work email/), 'jane@example.com')
  await user.selectOptions(screen.getByLabelText(/^What is it about/), 'Technology Consulting')
  await user.type(screen.getByLabelText(/^Message/), 'We need a cloud readiness assessment.')
  await user.click(screen.getByLabelText(/I agree/))
}

describe('GeneralEnquiryForm', () => {
  let clock: ReturnType<typeof mockClock>
  beforeEach(() => {
    vi.mocked(submitForm).mockClear()
    clock = mockClock()
  })
  afterEach(() => clock.restore())

  it('shows inline errors for missing required fields', async () => {
    const user = userEvent.setup()
    render(<GeneralEnquiryForm />)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(await screen.findByText('Enter your full name')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    expect(screen.getByText('Choose a topic')).toBeInTheDocument()
    expect(screen.getByText('Please accept so we can reply to you')).toBeInTheDocument()
    expect(screen.getByLabelText(/^Full name/)).toHaveAttribute('aria-invalid', 'true')
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('submits valid data and shows the thank-you panel', async () => {
    const user = userEvent.setup()
    render(<GeneralEnquiryForm defaultTopic="Product: Emenify Desk" />)
    expect(screen.getByLabelText(/^What is it about/)).toHaveValue('Product: Emenify Desk')

    await fillValid(user)
    clock.pass()
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(await screen.findByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    expect(submitForm).toHaveBeenCalledWith(
      'general-enquiry',
      expect.objectContaining({ name: 'Jane Doe', email: 'jane@example.com', topic: 'Technology Consulting' }),
    )

    await user.click(screen.getByRole('button', { name: /send another/i }))
    expect(screen.getByLabelText(/^Full name/)).toHaveValue('')
  })

  it('does not send when the honeypot is filled', async () => {
    const user = userEvent.setup()
    const { container } = render(<GeneralEnquiryForm />)
    await fillValid(user)
    honeypot(container).value = 'http://spam.example'
    clock.pass()
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(await screen.findByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('asks the user to retry when submitted faster than the minimum time', async () => {
    const user = userEvent.setup()
    render(<GeneralEnquiryForm />)
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(await screen.findByText(/that was quick/i)).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })
})
