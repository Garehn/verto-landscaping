import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F2EFE7',
        cream: '#E9E4D6',
        ink: '#0E120E',
        'ink-2': '#161B16',
        moss: '#2E3D2E',
        'moss-dark': '#1F2C21',
        stone: '#8B8A7E',
        sage: '#9AA692',
        brass: '#AC9469',
        line: '#DDD8C9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1440px',
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.03em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
