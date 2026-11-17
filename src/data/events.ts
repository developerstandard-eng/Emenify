/**
 * HOW TO ADD EVENTS
 * -----------------
 * 1. Copy one object in the `events` array below and give it a unique `id`.
 * 2. Set `start` and `end` as ISO date-times with the UTC offset of the venue,
 *    e.g. '2027-01-12T09:00:00+04:00'. Multi-day courses use the first day's start
 *    and the last day's end.
 * 3. `mode` is 'Online' or 'Offline'. For Online events, `location` is the platform
 *    (e.g. 'Microsoft Teams'). For Offline events, it is the venue and city.
 * 4. Events are sorted by date automatically. Past events are hidden in List view.
 *
 * WordPress mapping: in production this data comes from The Events Calendar plugin
 * (post type `tribe_events`). Fields map as follows:
 *   title     → post title
 *   start/end → _EventStartDate / _EventEndDate (+ _EventTimezone)
 *   mode      → an event category ("Online" / "Offline") or custom field
 *   location  → linked Venue (`tribe_venue`) name + city, or the online URL label
 *   summary   → post excerpt
 *   seats     → custom field (optional)
 * The REST endpoint `/wp-json/tribe/events/v1/events` returns the same shape and
 * can replace this file without changing the calendar components.
 */

export type EventMode = 'Online' | 'Offline'

export interface TrainingEvent {
  id: string
  title: string
  start: string
  end: string
  mode: EventMode
  location: string
  summary: string
  category: string
  seats?: number
}

// TODO(client): replace with the real training schedule
export const events: TrainingEvent[] = [
  {
    id: 'itil4-foundation-dec',
    title: 'ITIL 4 Foundation',
    start: '2026-12-01T09:00:00+04:00',
    end: '2026-12-03T17:00:00+04:00',
    mode: 'Offline',
    location: 'Emenify Training Centre, Dubai',
    summary: 'Three days on service value, practices and the ITIL 4 exam. Exam voucher included.',
    category: 'Service management',
    seats: 16,
  },
  {
    id: 'azure-fundamentals-dec',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    start: '2026-12-08T10:00:00+04:00',
    end: '2026-12-09T14:00:00+04:00',
    mode: 'Online',
    location: 'Microsoft Teams',
    summary: 'Cloud concepts, core Azure services, pricing and support. Two half-day live sessions.',
    category: 'Cloud',
  },
  {
    id: 'leading-it-teams-dec',
    title: 'Leading Technical Teams',
    start: '2026-12-15T09:00:00+04:00',
    end: '2026-12-15T16:00:00+04:00',
    mode: 'Offline',
    location: 'Client site or Emenify Training Centre, Dubai',
    summary: 'A one-day workshop for new team leads: delegation, feedback and running incident reviews.',
    category: 'Leadership',
    seats: 12,
  },
  {
    id: 'security-plus-jan',
    title: 'Security Fundamentals Bootcamp',
    start: '2027-01-12T09:00:00+04:00',
    end: '2027-01-16T17:00:00+04:00',
    mode: 'Offline',
    location: 'Emenify Training Centre, Riyadh',
    summary: 'Five days on threats, controls, identity and incident response, with hands-on labs.',
    category: 'Security',
    seats: 14,
  },
  {
    id: 'm365-admin-jan',
    title: 'Microsoft 365 Administration Essentials',
    start: '2027-01-20T10:00:00+04:00',
    end: '2027-01-22T14:00:00+04:00',
    mode: 'Online',
    location: 'Microsoft Teams',
    summary: 'User, licence and security administration for Microsoft 365 tenants.',
    category: 'Cloud',
  },
  {
    id: 'project-mgmt-feb',
    title: 'Practical Project Management for IT',
    start: '2027-02-02T09:00:00+04:00',
    end: '2027-02-03T17:00:00+04:00',
    mode: 'Offline',
    location: 'Emenify Training Centre, Dubai',
    summary: 'Scoping, planning and reporting for infrastructure and software projects.',
    category: 'Leadership',
    seats: 18,
  },
  {
    id: 'aws-cloud-practitioner-feb',
    title: 'AWS Cloud Practitioner',
    start: '2027-02-16T10:00:00+04:00',
    end: '2027-02-17T14:00:00+04:00',
    mode: 'Online',
    location: 'Zoom',
    summary: 'Core AWS services, security and billing, with a practice exam.',
    category: 'Cloud',
  },
  {
    id: 'network-fundamentals-mar',
    title: 'Network Fundamentals (CCNA track, part 1)',
    start: '2027-03-08T09:00:00+04:00',
    end: '2027-03-12T17:00:00+04:00',
    mode: 'Offline',
    location: 'Emenify Training Centre, Dubai',
    summary: 'IP addressing, switching and routing basics, with lab work on real equipment.',
    category: 'Networking',
    seats: 12,
  },
]
