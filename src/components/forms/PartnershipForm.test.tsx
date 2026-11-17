import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { submitForm } from '@/lib/forms'
import { honeypot, mockClock } from '@/test/utils'
import { PartnershipForm } from './PartnershipForm'

vi.mock('@/lib/forms', () => ({ submitForm: vi.fn().mockResolvedValue({ ok: true }) }))

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full name/), 'Omar Haddad')
  await user.type(screen.getByLabelText(/^Company/), 'Haddad IT Solutions')
  await user.type(screen.getByLabelText(/^Work email/), 'omar@haddad.example')
  await user.type(screen.getByLabelText(/^Phone/), '+971 50 123 4567')
  await user.selectOptions(screen.getByLabelText(/^Partnership type/), 'Reseller')
  await user.type(screen.getByLabelText(/^About your business/), 'We resell infrastructure to mid-size firms in the GCC.')
  await user.click(screen.getByLabelText(/I agree/))
}

describe('PartnershipForm', () => {
  let clock: ReturnType<typeof mockClock>
  beforeEach(() => {
    vi.mocked(submitForm).mockClear()
    clock = mockClock()
  })
  afterEach(() => clock.restore())

  it('shows inline errors for missing and invalid fields', async () => {
    const user = userEvent.setup()
    render(<PartnershipForm />)
    await user.type(screen.getByLabelText(/^Work email/), 'not-an-email')
    await user.type(screen.getByLabelText(/^Phone/), 'abc')
    await user.click(screen.getByRole('button', { name: /apply to partner/i }))

    expect(await screen.findByText('Enter your company name')).toBeInTheDocument()
    expect(screen.getByText(/Enter a valid email address/)).toBeInTheDocument()
    expect(screen.getByText(/Enter a valid phone number/)).toBeInTheDocument()
    expect(screen.getByText('Choose a partnership type')).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })

  it('submits valid data and shows the thank-you panel', async () => {
    const user = userEvent.setup()
    render(<PartnershipForm />)
    await fillValid(user)
    clock.pass()
    await user.click(screen.getByRole('button', { name: /apply to partner/i }))

    expect(await screen.findByRole('heading', { name: /thank you for your interest/i })).toBeInTheDocument()
    expect(submitForm).toHaveBeenCalledWith(
      'business-partnership',
      expect.objectContaining({ company: 'Haddad IT Solutions', partnershipType: 'Reseller' }),
    )
  })

  it('does not send when the honeypot is filled', async () => {
    const user = userEvent.setup()
    const { container } = render(<PartnershipForm />)
    await fillValid(user)
    honeypot(container).value = 'bot'
    clock.pass()
    await user.click(screen.getByRole('button', { name: /apply to partner/i }))

    expect(await screen.findByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    expect(submitForm).not.toHaveBeenCalled()
  })
})
