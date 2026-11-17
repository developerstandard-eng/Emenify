import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { events } from '@/data/events'
import { submitForm } from '@/lib/forms'
import { honeypot, mockClock } from '@/test/utils'
import { TrainingEnquiryForm } from './TrainingEnquiryForm'

vi.mock('@/lib/forms', () => ({ submitForm: vi.fn().mockResolvedValue({ ok: true }) }))

const event = events[0]

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full name/), 'Priya Nair')
  await user.type(screen.getByLabelText(/^Work email/), 'priya@example.com')
  await user.type(screen.getByLabelText(/^Phone/), '+971 4 555 0101')
  await user.click(screen.getByLabelText(/I agree/))
}

describe('TrainingEnquiryForm', () => {
  let clock: ReturnType<typeof mockClock>
  beforeEach(() => {
    vi.mocked(submitForm).mockClear()
    clock = mockClock()
  })
  afterEach(() => clock.restore())

  it('shows inline errors for missing fields and an invalid attendee count', async () => {
    const user = userEvent.setup()
    render(<TrainingEnquiryForm />)
    const attendees = screen.getByLabelText(/^Number of attendees/)
    await user.clear(attendees)
    await user.type(attendees, '80')
    await user.click(screen.getByRole('button', { name: /send registration/i }))

    expect(await screen.findByText('Choose a course')).toBeInTheDocument()
    expect(screen.getByText('Enter your phone number')).toBeInTheDocument()
    expect(screen.getByText(/more than 50 attendees/)).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('prefills the event and submits valid data', async () => {
    const user = userEvent.setup()
    render(<TrainingEnquiryForm defaultEvent={event.id} />)
    expect(screen.getByLabelText(/^Course/)).toHaveValue(event.id)

    await fillValid(user)
    clock.pass()
    await user.click(screen.getByRole('button', { name: /send registration/i }))

    expect(await screen.findByRole('heading', { name: /registration request is in/i })).toBeInTheDocument()
    expect(submitForm).toHaveBeenCalledWith(
      'training-enquiry',
      expect.objectContaining({ event: event.id, eventTitle: event.title, attendees: '1', name: 'Priya Nair' }),
    )
  })

  it('does not send when the honeypot is filled', async () => {
    const user = userEvent.setup()
    const { container } = render(<TrainingEnquiryForm defaultEvent={event.id} />)
    await fillValid(user)
    honeypot(container).value = 'bot'
    clock.pass()
    await user.click(screen.getByRole('button', { name: /send registration/i }))

    expect(await screen.findByRole('heading', { name: /registration request is in/i })).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })
})
