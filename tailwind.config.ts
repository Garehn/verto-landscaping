import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F4',
        ink: '#1A1A17',
        moss: '#2F4031',
        'moss-dark': '#1F2C21',
        stone: '#86847A',
        cream: '#EFEBE2',
        line: '#E4DFD3',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.03em',
      },
    },
  },
  plugins: [],
};

export default config;
