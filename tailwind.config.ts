import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'var(--color-primary-blue)',
        'royal-purple': 'var(--color-royal-purple)',
        'accent-gold': 'var(--color-accent-gold)',
        'neutral-white': 'var(--color-neutral-white)',
        'dark-gray': 'var(--color-dark-gray)',
        'gray-50': 'var(--color-gray-50)',
        'gray-100': 'var(--color-gray-100)',
        'gray-200': 'var(--color-gray-200)',
        'gray-300': 'var(--color-gray-300)',
        'gray-400': 'var(--color-gray-400)',
        'gray-500': 'var(--color-gray-500)',
        'gray-600': 'var(--color-gray-600)',
        'gray-700': 'var(--color-gray-700)',
        'gray-800': 'var(--color-gray-800)',
        'gray-900': 'var(--color-gray-900)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'], // Ensure Geist is primary
        mono: ['var(--font-geist-mono)', 'monospace'], // Ensure Geist Mono is primary
      },
    },
  },
  plugins: [],
};

export default config;
