import type { Config } from 'tailwindcss'

/** Design tokens. See DESIGN.md §2 before adding anything here. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: { DEFAULT: '#0A1F4D', deep: '#071536', 700: '#13306B' },
        accent: { DEFAULT: '#F28C1B', hover: '#D97706', soft: '#FDF1E3' },
        cobalt: { DEFAULT: '#1E5BB8', light: '#4F82CF' },
        tint: '#EAF2FC',
        mist: '#F5F9FE',
        body: '#475569',
        muted: '#94A3B8',
        line: '#E2E8F0',
      },
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        meta: ['0.8125rem', { lineHeight: '1.4' }],
        h3: ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
      },
      letterSpacing: { heading: '-0.02em' },
      lineHeight: { body: '1.65' },
      maxWidth: { container: '1200px', prose: '65ch' },
      borderRadius: { card: '12px', input: '8px' },
      boxShadow: {
        soft: '0 1px 2px rgba(10,31,77,.06), 0 12px 32px -12px rgba(10,31,77,.14)',
        lift: '0 1px 2px rgba(10,31,77,.06), 0 18px 40px -14px rgba(10,31,77,.22)',
        focus: '0 0 0 3px rgba(242,140,27,.25)',
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'dash-flow': { to: { strokeDashoffset: '-400' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'spin-slow': 'spin-slow 120s linear infinite',
        'spin-slower': 'spin-slow 180s linear infinite reverse',
        'dash-flow': 'dash-flow 40s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
