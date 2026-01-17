import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          tertiary: '#1A1A24',
          elevated: '#22222E',
        },
        accent: {
          primary: '#00D4AA',
          secondary: '#00B894',
          tertiary: '#00A383',
          glow: 'rgba(0, 212, 170, 0.15)',
        },
        coral: {
          primary: '#FF6B6B',
          secondary: '#FF8E8E',
        },
        amber: {
          primary: '#FFB347',
          secondary: '#FFCC80',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          tertiary: '#6B6B7B',
          muted: '#45455A',
        },
        border: {
          primary: '#2A2A3A',
          secondary: '#3A3A4A',
          accent: 'rgba(0, 212, 170, 0.3)',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 212, 170, 0.15)',
        'glow-strong': '0 0 60px rgba(0, 212, 170, 0.25)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, rgba(0, 212, 170, 0.08) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(255, 107, 107, 0.06) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(255, 179, 71, 0.05) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(0, 212, 170, 0.04) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(255, 107, 107, 0.05) 0px, transparent 50%)
        `,
        'grid-pattern': `
          linear-gradient(rgba(42, 42, 58, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(42, 42, 58, 0.3) 1px, transparent 1px)
        `,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
