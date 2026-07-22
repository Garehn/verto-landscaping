import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F3ED',
        cream: '#ECE8DD',
        ink: '#2F3436',
        'ink-2': '#3A4043',
        moss: '#37452F',
        'moss-dark': '#28331F',
        stone: '#8A897E',
        sage: '#97A18C',
        brass: '#A98F63',
        ember: '#C4622D',
        'ember-dark': '#A94E20',
        line: '#E2DED2',
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
