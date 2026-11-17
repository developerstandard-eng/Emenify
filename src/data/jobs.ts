export interface Job {
  id: string
  title: string
  team: string
  location: string
  type: 'Full-time' | 'Contract' | 'Part-time'
  experience: string
  description: string
}

// TODO(client): replace with current openings. An empty array shows a "no openings" message.
export const jobs: Job[] = [
  {
    id: 'service-desk-engineer',
    title: 'Service Desk Engineer (L2)',
    team: 'Technical Support',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '3–5 years',
    description: 'Resolve escalated incidents across Windows, Microsoft 365 and network estates. Shift-based, including a planned on-call rota.',
  },
  {
    id: 'cloud-consultant',
    title: 'Cloud Solutions Consultant',
    team: 'Technology Consulting',
    location: 'Dubai, UAE / Hybrid',
    type: 'Full-time',
    experience: '6+ years',
    description: 'Lead cloud readiness assessments and migration plans for enterprise clients on Azure and AWS.',
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    team: 'Technical Support',
    location: 'Riyadh, KSA',
    type: 'Full-time',
    experience: '4–6 years',
    description: 'Design, configure and support routing, switching and firewall platforms for multi-site clients.',
  },
  {
    id: 'technical-trainer',
    title: 'Technical Trainer, Security',
    team: 'Training Solutions',
    location: 'Remote (GCC time zones)',
    type: 'Contract',
    experience: '5+ years',
    description: 'Deliver certification courses in security fundamentals and cloud security, online and in the classroom.',
  },
]

export const OPEN_APPLICATION = 'Open application'
