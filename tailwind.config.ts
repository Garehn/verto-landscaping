import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the Verto Landscapes logo artwork.
        ink: '#3A3F42',        // logo charcoal
        'ink-2': '#474D50',    // raised charcoal surface
        verde: '#648574',      // logo sage green, the brand accent
        'verde-dark': '#516D5F',
        'verde-light': '#8FA79A',
        paper: '#F4F4F1',      // off-white ground
        cream: '#E7E8E3',
        stone: '#868A88',      // muted label grey
        sage: '#9EB0A5',       // muted label on dark
        line: '#DCDDD8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1440px',
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.02em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
