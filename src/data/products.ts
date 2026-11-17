import type { IconName } from '@/lib/icons'

export interface Product {
  id: string
  icon: IconName
  name: string
  category: string
  description: string
  features: [string, string, string]
}

// TODO(client): replace with the real product catalogue (names, copy, screenshots)
export const productsIntro = {
  eyebrow: 'Products',
  title: 'Software that supports how your IT team works',
  body: 'Each product is deployed, configured and supported by our engineers. Ask for a demo or a quote using the enquiry button on any product.',
}

export const products: Product[] = [
  {
    id: 'service-desk',
    icon: 'lifebuoy',
    name: 'Emenify Desk',
    category: 'IT service management',
    description: 'Ticketing, asset tracking and SLA reporting for internal IT teams.',
    features: ['ITIL-aligned incident and request workflows', 'Asset register linked to tickets', 'SLA dashboards by team and client'],
  },
  {
    id: 'monitor',
    icon: 'monitor',
    name: 'Emenify Watch',
    category: 'Infrastructure monitoring',
    description: 'One view of servers, network devices and cloud services, with alerts that reach the right engineer.',
    features: ['Agent and agentless monitoring', 'Alert routing by on-call rota', 'Capacity trends and forecasts'],
  },
  {
    id: 'learn',
    icon: 'book',
    name: 'Emenify Learn',
    category: 'Learning management',
    description: 'Course catalogue, enrolment and skills tracking for corporate training programs.',
    features: ['Online and classroom course scheduling', 'Skills matrix per employee', 'Completion and assessment reports'],
  },
  {
    id: 'backup',
    icon: 'cloud',
    name: 'Emenify Vault',
    category: 'Backup and recovery',
    description: 'Managed backup for servers, Microsoft 365 and cloud workloads, with tested restores.',
    features: ['Encrypted off-site copies', 'Quarterly restore testing', 'Retention policies by data type'],
  },
]
