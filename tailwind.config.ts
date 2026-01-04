import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom CTI color palette
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          cyan: '#06b6d4',
          orange: '#f97316',
          red: '#ef4444',
          yellow: '#eab308',
          purple: '#a855f7',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#111111',
          border: '#1f1f1f',
          hover: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#22c55e',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              backgroundColor: '#1f1f1f',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#0a0a0a',
              border: '1px solid #1f1f1f',
            },
            blockquote: {
              borderLeftColor: '#22c55e',
              backgroundColor: '#111111',
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            strong: { color: 'inherit' },
            th: { color: 'inherit' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
