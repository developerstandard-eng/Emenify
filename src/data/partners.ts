export interface Partner {
  id: string
  name: string
  description: string
  url: string
  /**
   * Path to the partner logo (SVG preferred) in /public/partners.
   * When absent, a neutral placeholder mark is drawn from `mark` and `hue`.
   */
  logo?: string
  mark: 'ring' | 'square' | 'bars' | 'diamond' | 'arc' | 'grid'
  hue: string
}

// TODO(client): replace with real partners, logos (SVG) and URLs.
// Placeholder names are deliberately generic so they are not mistaken for real brands.
export const partners: Partner[] = [
  { id: 'p1', name: 'Northwind Cloud', description: 'Cloud infrastructure and hosting', url: 'https://example.com', mark: 'ring', hue: '#1E5BB8' },
  { id: 'p2', name: 'Halcyon Networks', description: 'Enterprise networking and Wi-Fi', url: 'https://example.com', mark: 'bars', hue: '#0E7490' },
  { id: 'p3', name: 'Corvid Security', description: 'Endpoint and identity security', url: 'https://example.com', mark: 'diamond', hue: '#B45309' },
  { id: 'p4', name: 'Meridian Systems', description: 'Servers and storage hardware', url: 'https://example.com', mark: 'square', hue: '#0A1F4D' },
  { id: 'p5', name: 'Atlas Learning', description: 'Certification and e-learning content', url: 'https://example.com', mark: 'arc', hue: '#15803D' },
  { id: 'p6', name: 'Kestrel Data', description: 'Backup, recovery and data protection', url: 'https://example.com', mark: 'grid', hue: '#7C2D12' },
  { id: 'p7', name: 'Lumen Workspace', description: 'Collaboration and productivity suites', url: 'https://example.com', mark: 'ring', hue: '#1D4ED8' },
  { id: 'p8', name: 'Orbis Telecom', description: 'Connectivity and unified communications', url: 'https://example.com', mark: 'arc', hue: '#0F766E' },
]
