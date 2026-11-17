import type { IconName } from '@/lib/icons'

/**
 * Site-wide copy. Every string the client may want to change lives in src/data.
 * Items marked TODO(client) are placeholders written for the design review.
 */

export interface Stat {
  icon: IconName
  label: string
}

export interface Counter {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export const company = {
  name: 'Emenify',
  // TODO(client): confirm tagline
  tagline: 'Technical support, consulting and training for organisations that run on technology.',
  // TODO(client): confirm all contact details
  email: 'info@emenify.com',
  phone: '+971 4 000 0000',
  phoneHref: '+97140000000',
  address: ['Office 000, Business Bay', 'Dubai, United Arab Emirates'],
  hours: 'Support desk: 24 hours, 7 days',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' }, // TODO(client): real profile URL
    { label: 'X', href: 'https://x.com/' }, // TODO(client)
    { label: 'Facebook', href: 'https://www.facebook.com/' }, // TODO(client)
    { label: 'YouTube', href: 'https://www.youtube.com/' }, // TODO(client)
  ],
}

export interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string; description: string }[]
}

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: [
      {
        label: 'Technical Support Services',
        to: '/services#technical-support',
        description: '24×7 monitoring, help desk and incident response',
      },
      {
        label: 'Technology Consulting',
        to: '/services#technology-consulting',
        description: 'Architecture, cloud and modernisation roadmaps',
      },
      {
        label: 'Training Solutions',
        to: '/services#training-solutions',
        description: 'Technical, leadership and certification programs',
      },
    ],
  },
  { label: 'Products', to: '/products' },
  { label: 'Training Calendar', to: '/training-calendar' },
  { label: 'Partners', to: '/partners' },
  { label: 'Business Partnership', to: '/business-partnership' },
  { label: 'Careers', to: '/careers' },
]

export const home = {
  hero: {
    eyebrow: 'Technology services',
    // The highlighted phrase is rendered with HighlightTag (once per page).
    titleBefore: 'Technology that works',
    titleHighlight: '24×7',
    titleAfter: 'for your business',
    // TODO(client): confirm hero subcopy
    subcopy:
      'We support, plan and train for the systems your business depends on. One partner for help desk, infrastructure and the skills of your team.',
    primaryCta: { label: 'Talk to our team', to: '/contact' },
    secondaryCta: { label: 'Explore services', to: '/services' },
    stats: [
      { icon: 'rocket', label: 'Faster Delivery' },
      { icon: 'wallet', label: 'Reduced Costs' },
      { icon: 'trendingUp', label: 'Better Scalability' },
    ] satisfies Stat[],
  },
  about: {
    eyebrow: 'Who we are',
    title: 'A technology partner that stays after go-live',
    // TODO(client): replace with approved company overview
    body: [
      'Emenify keeps business systems running, helps leaders decide what to build next, and trains the people who use them.',
      'Our engineers, consultants and trainers work as one team, so advice is grounded in what we see in daily operations.',
    ],
    facts: [
      // TODO(client): confirm all three facts
      { value: '2012', label: 'Founded', detail: 'Over a decade of enterprise IT delivery' },
      { value: '3', label: 'Service lines', detail: 'Support, consulting and training under one contract' },
      { value: '4', label: 'Regions served', detail: 'Middle East, Africa, South Asia and Europe' },
    ],
  },
  services: {
    eyebrow: 'What we do',
    title: 'Three service lines, one accountable team',
    intro:
      'Most clients start with one service and add the others as their needs grow. Each line can also run on its own.',
  },
  products: {
    eyebrow: 'Products',
    title: 'Software we build and support',
    intro: 'Tools we use in our own service delivery, available for your team.',
  },
  partners: {
    label: 'Technology partners we certify and deliver with',
  },
  why: {
    eyebrow: 'Why Emenify',
    title: 'Measured on uptime, not hours billed',
    reasons: [
      'Service levels written into every contract, with monthly reporting.',
      'Certified engineers on vendor platforms you already use.',
      'One point of contact across support, projects and training.',
    ],
    // TODO(client): replace every counter with verified figures
    counters: [
      { value: 250, suffix: '+', label: 'Clients supported' },
      { value: 99.9, suffix: '%', label: 'Average uptime delivered' },
      { value: 15, prefix: '<', suffix: ' min', label: 'Critical response time' },
      { value: 12000, suffix: '+', label: 'Professionals trained' },
    ] satisfies Counter[],
  },
}

export const ctaBand = {
  // TODO(client): confirm CTA copy
  title: 'Planning a support contract, project or training program?',
  body: 'Tell us what you need. A specialist will reply within one business day.',
  cta: { label: 'Contact us', to: '/contact' },
}

export const about = {
  hero: {
    eyebrow: 'About Emenify',
    title: 'Built around the systems our clients cannot afford to lose',
    // TODO(client): replace with approved overview
    body: 'We are a technology services company working with enterprises, public bodies and growing businesses. We run support desks, design and modernise infrastructure, and deliver training programs.',
  },
  overview: {
    eyebrow: 'Company overview',
    title: 'Operations, advice and skills from one team',
    body: [
      'Emenify started as a technical support provider. Clients then asked us to help plan the systems we were supporting, and to train the teams using them. That is still how the company works today.',
      'Our support engineers inform our consulting. Our consultants design the training. Every engagement has one accountable lead.',
    ],
    // TODO(client): confirm
    highlights: ['ISO 27001-aligned processes', 'Vendor-certified engineers', 'Bilingual service desk (English / Arabic)'],
  },
  mission: {
    label: 'Mission',
    // TODO(client): approved mission statement
    text: 'To keep our clients’ technology reliable and their people capable, so they can focus on running their business.',
  },
  vision: {
    label: 'Vision',
    // TODO(client): approved vision statement
    text: 'To be the technology partner organisations in our region trust first, for support, for advice and for skills.',
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'How every engagement runs',
    steps: [
      { title: 'Assess', body: 'We review your systems, contracts and team skills, and agree what success looks like.' },
      { title: 'Plan', body: 'A written scope with milestones, service levels and a named lead on our side.' },
      { title: 'Deliver', body: 'Our engineers, consultants or trainers do the work and report against the plan.' },
      { title: 'Improve', body: 'Monthly reviews turn incident data and feedback into the next set of changes.' },
    ],
  },
  leadership: {
    eyebrow: 'Leadership',
    title: 'The people accountable for your service',
    // TODO(client): real names, roles and photos. Set to [] to hide the section.
    people: [
      { name: 'Name Surname', role: 'Chief Executive Officer' },
      { name: 'Name Surname', role: 'Director, Technical Support' },
      { name: 'Name Surname', role: 'Director, Consulting' },
      { name: 'Name Surname', role: 'Head of Training' },
    ] as { name: string; role: string; photo?: string }[],
  },
}

export const partnership = {
  hero: {
    eyebrow: 'Business partnership',
    title: 'Grow with a partner who delivers the service',
    body: 'Resell our services, combine them with your technology, or refer clients. We bring delivery capacity and a support desk that runs around the clock.',
  },
  models: [
    {
      icon: 'briefcase',
      name: 'Reseller',
      summary: 'Sell Emenify support and training under your contract.',
      benefits: ['Tiered margins on every renewal', 'Co-branded proposals and collateral', 'Named partner manager'],
    },
    {
      icon: 'cpu',
      name: 'Technology',
      summary: 'Pair your platform with our implementation and support.',
      benefits: ['Joint solution design', 'Certified engineers on your product', 'Shared go-to-market plans'],
    },
    {
      icon: 'handshake',
      name: 'Referral',
      summary: 'Introduce clients and earn a fee on signed work.',
      benefits: ['Simple one-page agreement', 'Fee paid on contract signature', 'Status updates on every lead'],
    },
  ] satisfies { icon: IconName; name: string; summary: string; benefits: string[] }[],
  steps: [
    { title: 'Apply', body: 'Send the application form on this page. We reply within two business days.' },
    { title: 'Align', body: 'A short call to agree the model, territory and target clients.' },
    { title: 'Onboard', body: 'Agreement, partner portal access and product briefings.' },
    { title: 'Grow', body: 'Joint pipeline reviews every quarter.' },
  ],
}

export const careers = {
  hero: {
    eyebrow: 'Careers',
    title: 'Work on systems that matter to people',
    body: 'Join engineers, consultants and trainers who keep businesses running and help people get better at their work.',
  },
  values: [
    { icon: 'graduation', title: 'Certification budget', body: 'Paid vendor exams and study time every year.' },
    { icon: 'users', title: 'Small, senior teams', body: 'You work next to people who have done the job for years.' },
    { icon: 'scale', title: 'Fair rotas', body: 'On-call is planned, shared and compensated.' },
    { icon: 'compass', title: 'Room to move', body: 'Support, consulting and training are all paths you can take.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
}

export const pageMeta = {
  home: 'Technical Support, Consulting and Training',
  about: 'About',
  services: 'Services',
  products: 'Products',
  partnership: 'Business Partnership',
  training: 'Training Calendar',
  partners: 'Partners',
  careers: 'Careers',
  contact: 'Contact',
  notFound: 'Page not found',
}
