import type { IconName } from '@/lib/icons'
import type { Stat } from './site'

export interface Service {
  /** Used as the hash anchor on /services, e.g. /services#technical-support */
  id: string
  icon: IconName
  eyebrow: string
  name: string
  /** Short form for cards and menus */
  summary: string
  heading: string
  body: string
  capabilities: string[]
  stats: Stat[]
}

// TODO(client): replace all service copy with approved text
export const servicesIntro = {
  eyebrow: 'Services',
  title: 'Support, consulting and training for the systems you run',
  body: 'Each service line has its own team and service levels. Together they cover the full life of a system: planning it, running it and teaching people to use it.',
}

export const services: Service[] = [
  {
    id: 'technical-support',
    icon: 'headset',
    eyebrow: 'Technical Support Services',
    name: 'Technical Support Services',
    summary: 'Around-the-clock help desk and infrastructure support that keeps downtime short and rare.',
    heading: 'Global support, 24 hours a day, 7 days a week',
    body: 'Our service desk and field engineers handle incidents, requests and planned maintenance under agreed service levels. Problems are fixed at the root, so the same fault does not return.',
    capabilities: [
      'Service desk by phone, email and portal, in English and Arabic',
      'Proactive monitoring of servers, network and cloud workloads',
      'Incident and problem management to ITIL 4 practice',
      'On-site engineers for hardware and network faults',
      'Backup, disaster recovery and business continuity testing',
      'Monthly service reports with trend analysis',
    ],
    stats: [
      { icon: 'timer', label: 'Minimised Downtime' },
      { icon: 'award', label: 'Operational Excellence' },
      { icon: 'shield', label: 'Business Continuity' },
    ],
  },
  {
    id: 'technology-consulting',
    icon: 'compass',
    eyebrow: 'Technology Consulting',
    name: 'Technology Consulting',
    summary: 'Architecture and modernisation plans for digital enterprises that need to scale securely.',
    heading: 'Technology decisions tied to business results',
    body: 'We help leadership teams decide what to build, buy, move or retire. Recommendations come with costs, risks and a delivery plan, and our engineers can carry them out.',
    capabilities: [
      'IT strategy and multi-year technology roadmaps',
      'Cloud readiness assessments and migration planning',
      'Enterprise and solution architecture',
      'Security posture reviews and remediation plans',
      'Vendor selection and contract review',
      'Programme and project management',
    ],
    stats: [
      { icon: 'rocket', label: 'Faster Delivery' },
      { icon: 'wallet', label: 'Reduced Costs' },
      { icon: 'trendingUp', label: 'Better Scalability' },
    ],
  },
  {
    id: 'training-solutions',
    icon: 'graduation',
    eyebrow: 'Training Solutions',
    name: 'Training Solutions',
    summary: 'Custom learning programs that build technical and leadership skills across your workforce.',
    heading: 'Learning programs built for your team',
    body: 'We design training around your systems and goals, not a generic syllabus. Programs run online, in our classrooms or at your offices, and every one ends with a measurable outcome.',
    capabilities: [
      'Vendor certification tracks for cloud, network and security',
      'Custom courses based on your own systems and processes',
      'Leadership and management development',
      'Skills assessments before and after each program',
      'Blended delivery: live online, classroom and on-site',
    ],
    stats: [
      { icon: 'target', label: 'Customised Programs' },
      { icon: 'lineChart', label: 'Measurable Skills' },
      { icon: 'users', label: 'Future-ready Teams' },
    ],
  },
]
